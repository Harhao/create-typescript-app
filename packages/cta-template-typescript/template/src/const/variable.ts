import { EResponseCode } from "./enum";

export const ruleList = [];

export const responseTextMap = {
    [EResponseCode.PARAM_ERROR]: '请求参数异常',
    [EResponseCode.FILE_INLEGAL]: '文件不合规',
    [EResponseCode.FILE_SIZE_LIMIT]: '文件大小超过限制',
    [EResponseCode.HAS_LIKED]: '文件类型超过限制',
    [EResponseCode.OPERATE_BUSY]: '操作频繁',
    [EResponseCode.CONTENT_INVALID]: '输入内容不合规，请修改后重新尝试!'
}