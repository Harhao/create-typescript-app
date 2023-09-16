import { resolve } from 'path';
import { mergeConfig, splitVendorChunkPlugin } from 'vite';
import { devServerConfig, getEntrys } from '../config';
import { execDirectoryPath, getOverrideConfig } from '../utils';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// 获取公共配置
const getCommonConfig = (envData: Record<string, any>) => {

    return {
        base: envData.PUBLIC_PATH,
        mode: envData.NODE_ENV,
        resolve: {
            alias: {
                '@': resolve(execDirectoryPath(), '../src'),
            },
            extensions: [
                '.tsx', 
                '.ts', 
                '.js', 
                '.mjs', 
                '.mts', 
                '.jsx', 
                '.json', 
                '.less', 
                '.css',
            ]
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer(),
                ],
            },
            devSourcemap: false,
        },
        plugins: [
            react({
                include: /\.(tsx|ts|mdx|js|jsx)$/
            }),
            splitVendorChunkPlugin(),
        ],
        define: {
            'process.env': envData,
        },
    }
};

// 获取开发环境配置
export const getDevConfig = async (envData: Record<string, any>) => {

    const commonConfig = getCommonConfig(envData);

    const { server, ...restConfig } = devServerConfig;
    const { proxy, ...otherConfig } = server;

    const proxyConfig = await getOverrideConfig('proxy.ts') || {};

    return mergeConfig({
        ...restConfig,
        server: {
            ...otherConfig,
            proxy: {
                ...proxy,
                ...proxyConfig,
            }
        }
    }, commonConfig);
};

// 获取生产环境配置
export const getProdConfig = (envData: Record<string, any>) => {

    const commonConfig = getCommonConfig(envData);
    const entrys = getEntrys();

    return mergeConfig({
        build: {
            rollupOptions: {
                input: {
                    ...entrys,
                }
            }
        }
    }, commonConfig);
};
