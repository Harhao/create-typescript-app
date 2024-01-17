import { IRequestParams } from "@/const";
import { request } from "../utils";

// 查询用户信息
export async function getUserInfo() {
    const fetchParams: IRequestParams = {
        url: `/user/info`,
        method: 'get',
        data: {},
    };
    return await request.fetch(fetchParams);
}