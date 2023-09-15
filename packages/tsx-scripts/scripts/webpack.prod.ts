import getWebpackBaseConfig from './webpack.base';
import WebpackBar from "webpackbar";
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { glob } from 'glob';
import { resolve } from 'path';
import { merge } from 'webpack-merge';
import { Eenvironment } from './enum';
import { cacheGroups } from '../config';
import { execDirectoryPath, getOverrideConfig } from '../utils';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import { Configuration } from 'webpack';


const getWebpackProdConfig = async (envData: Record<string, any>) => {

    const isDropConsole = [Eenvironment.production].includes(envData.CUSTOM_ENV);
    const srcDir = resolve(execDirectoryPath(), './src');
    const config: Configuration = await getOverrideConfig('webpack.override.ts') || {};
    
    return merge(getWebpackBaseConfig(envData), {
        //@ts-ignore
        mode: Eenvironment.production,
        plugins: [
            //@ts-ignore
            new WebpackBar(),
            // 去除未用到的css样式
            //@ts-ignore
            new PurgeCSSPlugin({
                paths: glob.sync(`${srcDir}/**/*`, { nodir: true })
            }),
        ],
        optimization: {
            usedExports: true,
            splitChunks: {
                cacheGroups,
            },
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    // 禁止提取文件头部注释
                    extractComments: false, 
                    terserOptions: {
                        compress: {
                            drop_console: isDropConsole, // 生成环境移除console
                            drop_debugger: isDropConsole, // 生成环境移除debugger
                        },
                    },
                }),
            ],
        }
    }, config);
}
export default getWebpackProdConfig;
