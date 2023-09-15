import fs from 'fs';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
import dotenv from 'dotenv';

import { createServer, build, preview } from 'vite';
import { execDirectoryPath } from '../utils';
import { getDevConfig, getProdConfig } from './vite.config';

export interface IEnvConfig {
    NODE_ENV: string | undefined;
    CUSTOM_ENV: string | undefined;
}

export interface IEnvDataConfig extends IEnvConfig { }

export const startDev = async (envData: Record<string, any>) => {

    const spinner = ora('✨ 构建产物中').start();
    try {
        const config = getDevConfig();
        const server = await createServer(config);
        await server.listen();
        server.printUrls();
        spinner.succeed(chalk.green('🚀 服务启动成功'));
    } catch (e) {
        spinner.fail('构建失败啦');
        console.error(e);
    }
}

export const startBuild = async (envData: Record<string, any>) => {

    const spinner = ora('✨ 构建产物中').start();
    try {
        const config = getProdConfig();
        const buildRes = await build(config);
        spinner.succeed(chalk.green('🚀 服务构建成功'));

    } catch (e) {
        spinner.fail('构建失败啦');
        console.log('失败原因', e);
    }
}

export const startPreview = async (envData: Record<string, any>) => {

    const spinner = ora('✨ 构建产物中').start();
    try {
        const config = getProdConfig();
        const previewRes = await preview(config);
        spinner.succeed(chalk.green('🚀 服务构建成功'));

    } catch (e) {
        spinner.fail('构建失败啦');
        console.log('失败原因', e);
    }
}

export const loadEnvFile = (envConfig): IEnvDataConfig => {

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

    return {
        NODE_ENV,
        CUSTOM_ENV,
        ...config.parsed,
    };
}
