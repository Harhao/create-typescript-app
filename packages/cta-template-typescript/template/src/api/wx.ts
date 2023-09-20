import { IRequestParams } from "@/const";
import { request } from "../utils";

export async function getWxConfig(params: Record<string, any>) {
    const fetchParams: IRequestParams = {
        url: `${process.env.WX_AUTH_PREFIX}/backend/getWxConfig`,
        method: 'get',
        data: params,
    };
    return await request.fetch(fetchParams);
}