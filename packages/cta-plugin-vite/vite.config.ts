import { resolve } from 'path';
import { mergeConfig } from 'vite';
import { fileURLToPath } from "url";

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const getCommonConfig = () => {
    return {
        base: process.env.PUBLIC_PATH,
        mode: process.env.NODE_ENV,
        resolve: {
            alias: {
                '@': resolve(__dirname, '../src'),
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

export const getDevConfig = () => {
    const commonConfig = getCommonConfig();
    return mergeConfig({
        configFile: false,
        clearScreen: true,
        server: {
            open: true,
            port: 6254,
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
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
