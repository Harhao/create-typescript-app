import webpack, { Configuration } from "webpack";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const webpackConfig: Configuration = {
    mode: 'production',
    entry: resolve(__dirname, './bin/index.ts'),
    target: 'node',
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
                        module: "esnext",
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
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