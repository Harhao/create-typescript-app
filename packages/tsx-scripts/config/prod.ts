export const cacheGroups = {
    classnames: {
        name: "classnames",
        test: /[\\/]node_modules[\\/](classnames)[\\/]/,
        chunks: 'all',
        enforce: true,
    },
    polyfill: {
        name: "polyfill",
        test: /[\\/]node_modules[\\/](regenerator-runtime|react-app-polyfill|object-assign)[\\/]/,
        chunks: 'all',
        priority: 15,
    },
    core: {
        name: "core",
        test: /[\\/]node_modules[\\/](core-js)[\\/]/,
        chunks: 'all',
        priority: 15,
    },
    verndor: {
        test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-is)[\\/]/,
        name: 'vendor',
        chunks: 'all',
    },
    navigate: {
        test: /[\\/]node_modules[\\/](react-router-dom)[\\/]/,
        name: 'navigate',
        chunks: 'all',
    },
    request: {
        test: /[\\/]node_modules[\\/](axios)[\\/]/,
        name: 'request',
        chunks: 'all',
    },
    animate: {
        test: /animate\.css$/,
        name: 'animate',
        chunks: 'all',
        enforce: true,
    }
}