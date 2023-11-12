import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import dotenv from 'dotenv';

import webpack, { Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getWebpackDevConfig from './webpack.dev';
import getWebpackProdConfig from './webpack.prod';

import { spawn } from 'child_process';
import { rimrafSync } from 'rimraf';
import { execDirectoryPath, getOverrideConfig } from '../utils';
import { devServerConfig, printUrl } from '../config';

export interface IEnvConfig {
    NODE_ENV: string | undefined;
    CUSTOM_ENV: string | undefined;
}

export interface IEnvDataConfig extends IEnvConfig { }

export const startDev = async (envData: Record<string, any>) => {

    const spinner = ora('✨ 构建产物中').start();
    try {
        const config = await getWebpackDevConfig(envData) as Configuration;

        const proxyConfig = await getOverrideConfig(
            config,
            envData.NODE_ENV,
            './override/proxy.cjs',
        );


        const mergeConfig = {
            ...devServerConfig,
            proxy: {
                ...devServerConfig.proxy,
                ...proxyConfig,
            }
        };

        const proxyPath = path.resolve(process.cwd(), './mock/index.ts');

        if (fs.existsSync(proxyPath) && ['mock'].includes(envData.CUSTOM_ENV)) {
            const childProcess = spawn('ts-node', [proxyPath], {
                stdio: 'inherit',
                detached: true,
                shell: true,
            });

            // 在父进程退出时发送信号给子进程，并等待子进程退出
            process.on('SIGINT', () => {
                childProcess.kill();
                childProcess.on('exit', () => {
                    process.exit(); // 父进程退出
                });
            });
        }

        WebpackDevServer.addDevServerEntrypoints(config, mergeConfig);

        const compiler = webpack(config);
        const server = new WebpackDevServer(compiler, mergeConfig);

        server.listen(mergeConfig.port, mergeConfig.host, () => {
            spinner.succeed(chalk.greenBright('✨ 构建成功啦～'));
            printUrl(server);
        });

    } catch (e) {
        spinner.fail('构建失败啦');
        console.error(e);
    }
}

export const startBuild = async (envData: Record<string, any>) => {
    try {

        const deleteDir = path.resolve(execDirectoryPath(), './dist');

        const config = await getWebpackProdConfig(envData) as Configuration;

        fs.existsSync(deleteDir) && rimrafSync(deleteDir);

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
                const { errorDetails } = stats;
                console.log("构建时候出现错误", errorDetails);
                process.exit(1);
            }
        })
    } catch (e) {
        console.log('失败原因', e);
    }
}

export const loadEnvFile = (envConfig): Promise<IEnvDataConfig> => {

    return new Promise(resolve => {

        const { NODE_ENV, CUSTOM_ENV } = envConfig;

        const spinner = ora('加载环境配置').start();

        const defaultEnv = { parsed: {} };
        const envFilePath = path.resolve(execDirectoryPath(), `./.env.${CUSTOM_ENV}`);

        const config = fs.existsSync(envFilePath) ? dotenv.config({
            path: envFilePath,
            encoding: 'utf8',
            override: true,
        }) : defaultEnv;


        spinner.succeed('加载配置成功～');

        resolve({
            NODE_ENV,
            CUSTOM_ENV,
            ...config.parsed,
        });
    });
}
