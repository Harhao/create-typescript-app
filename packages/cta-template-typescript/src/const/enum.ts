// 200	Number	200	成功
// 202	Number	202	请求参数异常
// 207	Number	207	服务内部错误
// 208	Number	208	服务依赖异常
// 1001	Number	1001	文件不合规
// 1002	Number	1002	文件大小超过限制
// 1004	Number	1004	需要验证手机号
// 1005	Number	1005	已点过赞

// 接口返回状态
export enum EResponseCode {
    SUCCESS = 200,
    PARAM_ERROR = 202,
    EMAI_NOT_BIND = 203,
    EMAIL_BIND_LIMIT = 204,
    EMAIL_ALLOW_LIMIT = 205,
    EXPIRES = 401,
    FILE_INLEGAL = 1001,
    FILE_SIZE_LIMIT = 1002,
    NEED_VERIFY = 1004,
    HAS_LIKED = 1005,
    ACTIITY_HAS_NOSTART= 1006,
    ACTIITY_HAS_END = 1007,
    OPERATE_BUSY = 1008,
    GENERATE_PENDING = 1010,
    NEED_EDIT_TEMPLATE = 1011,
    CONTENT_INVALID = 10012,
}

// 裁剪cropper组件的8个点操作
export enum ECropperDots {
    TOPLEFT = 'cropper-top-left',
    TOPRIGHT = 'cropper-top-right',
    TOPCENTER = 'cropper-top-center',
    CENTERLEFT = 'cropper-center-left',
    CENTERRIGHT = 'cropper-center-right',
    BOTTOMLEFT = 'cropper-bottom-left',
    BOTTOMRIGHT = 'cropper-bottom-right',
    BOTTOMCENTER = 'cropper-bottom-center',
}