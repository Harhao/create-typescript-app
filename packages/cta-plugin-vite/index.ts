import dotenv from 'dotenv';
import path from 'path';
import ora from 'ora';
import getWebpackBaseConfig from './webpack.base';
import webpack, { Configuration } from 'webpack';

import { Eenvironment } from './enum';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { getDevConfig } from './vite.config';

// import { uploadSourceMap } from './upload';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const startDev = async () => {
    const config = getDevConfig();
    const server = await createServer(config);
    await server.listen();
    server.printUrls();
}

const startBuild = async () => {
    const spinner = ora('✨ 构建产物中').start();
    try {
        const config = getWebpackBaseConfig(process.env) as Configuration;
        webpack(config, (err, stats: any) => {
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
                // console.error("构建时候出现错误", stats);
                process.exit(1);
            }
            spinner.succeed('✨ 构建成功啦～');
        })
    } catch (e) {
        console.log('失败原因', e);
        spinner.fail('构建失败啦');
    } finally {
        // uploadSourceMap();
    }
}

const loadEnvFile = (): Promise<void> => {
    return new Promise(resolve => {
        const spinner = ora('加载环境配置').start();
        dotenv.config({
            path: path.resolve(__dirname, `../.env`),
            encoding: 'utf8',
        });
        dotenv.config({
            path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
            encoding: 'utf8',
            override: true,
        });
        spinner.succeed('加载配置成功～');
        resolve();
    });
}


const start = async () => {
    await loadEnvFile();
    switch (process.env.NODE_ENV) {
        case Eenvironment.development: startDev(); break;
        case Eenvironment.production: startBuild(); break;
        case Eenvironment.test: startBuild(); break;
        default: console.log('No environment specified');
    }
}

start();