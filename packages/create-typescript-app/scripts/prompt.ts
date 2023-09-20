import { input, select } from '@inquirer/prompts';


export const getPrompts = async () => {

    const answers = {
        template: await select({
            message: '请选择你要下载的模版',
            choices: [
                {
                    name: 'cta-template-typescript',
                    value: 'cta-template-typescript',
                    description: 'cta-template-typescript is a react typescript scaffold.'
                }
            ]
        }),
        projectName: await input({
            message: "请输入项目名称?",
            default: 'cta-template-typescript'
        }),
        version: await input({
            message: "请输入版本号?",
            default: '1.0.0',
        }),
        description: await input({
            message: "请输入项目描述?",
            default: 'cta-template-typescript is a react typescript scaffold.'
        }),
        author: await input({
            message: "请输入作者?",
            default: 'author',
        })
    };
    return answers;
}