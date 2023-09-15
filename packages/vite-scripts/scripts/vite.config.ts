import { resolve } from 'path';
import { mergeConfig } from 'vite';
import { execDirectoryPath, getOverrideConfig } from '../utils';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

const getCommonConfig = () => {

    return {
        base: process.env.PUBLIC_PATH,
        mode: process.env.NODE_ENV,
        resolve: {
            alias: {
                '@': resolve(execDirectoryPath(), '../src'),
            },
            extensions: ['.tsx', '.ts', '.js', '.mjs', '.mts', '.jsx', '.json', '.less', '.css']
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
        ],
        define: {
            'process.env': process.env,
        },
    }
};

export const getDevConfig = async () => {

    const commonConfig = getCommonConfig();
    
    const proxyConfig = await getOverrideConfig('proxy.ts') || {};
    
    return mergeConfig({
        configFile: false,
        clearScreen: true,
        server: {
            open: true,
            port: 6254,
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                    changeOrigin: true,
                    rewrite: (pathname: string) => {
                        return pathname.replace(/\/api/, '');
                    },
                    secure: false,
                },
            }
        },
    }, commonConfig);
};

export const getProdConfig = () => {
    const commonConfig = getCommonConfig();
    return mergeConfig({
        
    }, commonConfig);
};
