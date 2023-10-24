import axios, { AxiosInstance } from "axios";

import { EResponseCode, IRequestParams, IResponseData, responseTextMap } from "@/const";

class CommonRequest {

    private request: AxiosInstance;
    private static singleInstance: CommonRequest | null = null;

    constructor() {
        this.request = this.initAxiosInstance();
    }
    public static getInstance() {
        if (!this.singleInstance) {
            this.singleInstance = new CommonRequest();
        }
        return this.singleInstance;
    }

    public changeBaseURL(url: string) {
        this.request.defaults.baseURL = url;
    }

    private initAxiosInstance(): AxiosInstance {

        const instance = axios.create({});
        instance.interceptors.request.use((config) => {
            //可以添加自定义头
            return config;
        });

        instance.interceptors.response.use(
            (response) => {
                const codeList = [...Object.keys(responseTextMap)].map(item => parseInt(item));
                // 处理请求成功的响应
                if (response.data?.code !== EResponseCode.SUCCESS) {
                    if (codeList.includes(response.data?.code)) {
                        //TODO
                    } else {
                        if (![
                            EResponseCode.NEED_VERIFY,
                            EResponseCode.HAS_LIKED,
                            EResponseCode.NEED_EDIT_TEMPLATE,
                            EResponseCode.ACTIITY_HAS_NOSTART,
                            EResponseCode.ACTIITY_HAS_END,
                            EResponseCode.GENERATE_PENDING,
                        ].includes(response.data?.code)) {
                            // TODO
                        }
                    }
                }
                return response.data;
            },
            async (e) => {
                // TODO
                return Promise.reject(e);
            }
        );
        return instance;
    }

    public async fetch(params: IRequestParams): Promise<IResponseData> {
        const sepSymbol = params.url.includes('?') ? '&' : '?';
        const completeUrl = params.url.startsWith('/') ? `${params.url}` : `/${params.url}`;

        const data = params.method.toLowerCase() === 'get' ? [{
            Headers: params?.headers || {
                'Content-Type': 'application/json',
            },
            params: params.data,
        }] : [
            params.data,
            {
                Headers: params?.headers || {
                    'Content-Type': 'application/json',
                },
            }
        ];
        return await this.request[params.method]?.(`${completeUrl}${sepSymbol}t=${Date.now()}`, ...data);
    }
}

export const request = CommonRequest.getInstance();