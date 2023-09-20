import { IRequestParams } from "@/const";
import { request } from "../utils";

// 查看生成结果
export async function getGenerateResult(params: { phone: string, t?: string, sign?: string }) {
    const fetchParams: IRequestParams = {
        url: `${process.env.SETTING_API_PREFIX}/photo/getGenerateList`,
        method: 'get',
        data: params,
    };
    return await request.fetch(fetchParams);
}