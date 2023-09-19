module.exports = function proxy () {
    return {
        '/api': {
            target: 'https://www.target.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
        '/wx': {
            target: 'https://www.target.com/wx',
            changeOrigin: true,
            pathRewrite: { '^/wx': '' },
        },
        '/mock': {
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: { '^/mock': '' },
        }
    };
}