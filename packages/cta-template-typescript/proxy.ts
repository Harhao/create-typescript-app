export default {
    '/mock': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/mock': '' },
    }
}