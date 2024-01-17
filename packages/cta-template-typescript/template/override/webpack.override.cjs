const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
    //添加你需要增加的配置，不需要merge
    const optsConfig = {
        plugins: [
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 6291456,
                exclude: [/\.html$/],
                swDest: resolve(__dirname, '../dist/sw.js'),
                runtimeCaching: [
                    {
                        // 用于匹配需要缓存的图片 URL 的正则表达式
                        // 填写需要缓存的图片域名
                        urlPattern: new RegExp('^https:\/\/{{your domain}}\/.*\.(jpg|png|webp|jpeg|gif)$'),
                        handler: 'CacheFirst',

                        // 配置缓存的选项
                        options: {
                            // 配置缓存名称等信息
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 50,
                            },
                        },
                    },
                ],
            }),
        ]
    };

    return optsConfig
}