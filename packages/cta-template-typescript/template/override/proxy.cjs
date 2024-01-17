module.exports = function proxy () {
    return {
        '/api': {
            // 需要转发到测试环境的域名地址
            target: 'https://www.target.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
        '/mock': {
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: { '^/mock': '' },
        }
    };
}