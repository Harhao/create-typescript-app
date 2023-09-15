import path from "path";
import os from "os";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import pxToViewport from 'postcss-px-to-viewport';

import { getEntrys, getHtmlPlugins } from "../config/common";
import { execDirectoryPath } from "../utils";

const workerCount = os.cpus().length - 1;

const plugins = getHtmlPlugins();
const workDirectory = execDirectoryPath();

const getWebpackBaseConfig = (envData: Record<string, any>) => ({
    entry: {
        ...getEntrys(),
    },
    output: {
        globalObject: 'window',
        filename: 'static/js/[name]_[chunkhash:8].bundle.js',
        chunkFilename: 'static/js/[chunkhash:8].chunk.js',
        path: path.resolve(workDirectory, "./dist"),
        publicPath: envData.PUBLIC_PATH,
    },
    resolve: {
        alias: {
            '@': path.resolve(workDirectory, './src'),
            '@root': path.resolve(workDirectory, './'),
        },
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: workerCount,
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            //开启多线程编译
                            happyPackMode: true,
                            compilerOptions: {
                                sourceMap: true,
                                module: "esnext"
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    pxToViewport({
                                        viewportWidth: 750,
                                        unitPrecision: 3,
                                        viewportUnit: 'vw',
                                        mediaQuery: false,
                                        exclude: [/node_modules/, /pages\/pc-*/],
                                    }),
                                ]
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(envData),
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name]_[chunkhash:8].css",
            chunkFilename: "static/css/[name]_[chunkhash:8].css",
        }),
        ...plugins,
    ],
});
export default getWebpackBaseConfig;
