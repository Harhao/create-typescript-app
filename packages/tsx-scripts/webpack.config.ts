import process from 'process';
import webpack, { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const webpackConfig: Configuration = {
    mode: 'production',
    entry: resolve(__dirname, './bin/index.ts'),
    target: 'node',
    externals: [
        nodeExternals(),
    ],
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'index.cjs',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    //开启多线程编译
                    happyPackMode: true,
                    compilerOptions: {
                        sourceMap: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    }
};

const buildScript = () => {
    try {
        webpack(webpackConfig, (err, stats: any) => {
            if (err) {
                console.log(err);
                return
            }
            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    chunks: false,
                    chunkModules: false
                }) + "\n\n"
            );
            if (stats.hasErrors()) {
                console.error("构建时候出现错误", stats);
                process.exit(1);
            }
        })
    } catch (e) {
        console.log(e);
    }
}

buildScript();