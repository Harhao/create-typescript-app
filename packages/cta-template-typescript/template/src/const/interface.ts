export interface IResponseData {
    code: number;
    result: Record<string, any>,
    msg: string;
}

export interface IRequestParams {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    data: Record<string, any>;
    url: string;
    headers?: Record<string, unknown>;
}

