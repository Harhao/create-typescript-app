import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';


export const getPrompts = async () => {

    const answers = {
        template: await select({
            message: '请选择开发依赖的模版',
            choices: [
                {
                    name: 'react + typescript 模版',
                    value: 'cta-template-typescript',
                    description: chalk.green('\ncta-template-typescript是react typescript模版。')
                },
                {
                    name: 'vite + react + typescript模版',
                    value: 'cta-template-vite-typescript',
                    description: chalk.green('\ncta-template-vite-typescriptt是react typescript模版。')
                }
            ]
        }),
        projectName: await input({
            message: "请输入项目名称?",
            default: 'my-app'
        }),
        version: await input({
            message: "请输入版本号?",
            default: '0.0.1',
        }),
        description: await input({
            message: "请输入项目描述?",
            default: 'cta-template-typescript is a react typescript scaffold.'
        }),
        author: await input({
            message: "请输入作者?",
            default: 'author',
        }),
        license: await await select({
            message: '请选择开发依赖的许可',
            choices: [
                {
                    name: 'MIT',
                    value: 'MIT',
                },
                {
                    name: 'ISC',
                    value: 'ISC',
                }
            ]
        }),
    };
    return answers;
}