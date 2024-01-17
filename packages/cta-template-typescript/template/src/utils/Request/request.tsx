import store from "@/stores";
import Toast from "@/components/Toast";

import { eventEmitter } from "../Tools";
import { i18n } from "@/components/I18n";
import axios, { AxiosInstance } from "axios";
import { EResponseCode, IRequestParams, IResponseData, Language, responseText } from "@/const";

export class CommonRequest {

    private request: AxiosInstance;
    private static singleInstance: CommonRequest | null = null;
    private defaultHeaders: Record<string, string> = {'Content-Type': 'application/json'};

    constructor() {
        this.request = this.initAxiosInstance();
    }
    public static getInstance() {
        if (!this.singleInstance) {
            this.singleInstance = new CommonRequest();
        }
        return this.singleInstance;
    }

    private initAxiosInstance(): AxiosInstance {

        const instance = axios.create({});
        instance.interceptors.request.use((config) => {
            // 在请求头中添加 Token 等信息
            const { user } = store.getState();
            if (user.token) {
                config.headers['token'] = user.token;
            }
            return config;
        });

        instance.interceptors.response.use(
            (response) => {
                const code = response.data.code
                if (![EResponseCode.SUCCESS].includes(code)) {
                    eventEmitter.emit('closeToast');
                    const language = store.getState().user.language as Language;
                    Toast.show({
                        content: i18n({
                            language: language, 
                            text: responseText?.[code] || '服务异常',
                            patterns: []
                        })
                    });
                }
                // 处理请求成功的响应
                return response.data;
            },
            (error) => {
                const language = store.getState().user.language as Language;
                Toast.show({
                    content: error?.desc || i18n({
                        language: language, 
                        text: '未知错误',
                        patterns: []
                    }),
                });
                return Promise.reject(error);
            }
        );
        return instance;
    }

    public async fetch(params: IRequestParams): Promise<IResponseData> {
        const prefix = process.env.API_PREFIX;
        const sepSymbol = params.url.includes('?') ? '&' : '?';

        const data = params.method.toLowerCase() === 'get' ? [{
            Headers: params?.headers || this.defaultHeaders,
            params: params.data,
        }] : [
            params.data,
            {
                Headers: params?.headers || this.defaultHeaders,
            }
        ];
        return await this.request[params.method]?.(`${prefix}${params.url}${sepSymbol}tm=${Date.now()}`, ...data);
    }
}

export const request = CommonRequest.getInstance();