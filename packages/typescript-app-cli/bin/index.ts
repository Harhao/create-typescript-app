import { cli } from 'cleye';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { getPrompts, isVersionEquote, sort } from '../scripts';

import ejs from 'ejs';
import os from 'os';
import chalk from 'chalk';
import lodash from 'lodash';
import fs from 'fs-extra';
import pkg from '../package.json' assert { type: 'json'};
import templateJson from '../template.json' assert { type: 'json'};


// 捕获异常问题
process.on('unhandledRejection', err => {
    throw err;
});

process.on('SIGINT', () => {
    // 执行清理操作或记录日志
    console.log('用户退出程序');
    process.exit(0); // 退出程序
});

const checkCliVersion = async () => {
    try {
        const isLatest: boolean = await isVersionEquote();
        if (!isLatest) {
            console.log(chalk.red(`您的${pkg.name} ${pkg.version}脚手架版本过低`));
            console.log(chalk.red(`====================================`));
            console.log(chalk.red(`yarn global add ${pkg.name}`));
            console.log(chalk.red(`npm install -g ${pkg.name}`));
            console.log(chalk.red(`====================================`));
            process.exit(1);
        }
    } catch (e) {
        console.error(`checkCliVersion ${e}`);
    }
}

const startCommand = async () => {
    try {
        cli({
            name: pkg.name,
            version: pkg.version,
            alias: ['tac', 'tacli', 'ts-app'],
            commands: [],
        });

        //检查脚手架版本
        await checkCliVersion();


        //询问prompts
        const answers = await getPrompts();

        fs.ensureDirSync(answers.projectName);

        process.chdir(answers.projectName);

        const packageDependencies = ['tsx-scripts', answers.template];

        // 初始化项目package.json 文件
        await onInitPackageJson(answers);

        // 安装项目模版和集成运行命令tsx-scripts
        await onInstallPackage(packageDependencies);

        // 安装处理项目模版生成逻辑
        await onInitTemplateFile(answers);

        // 安装项目开发依赖包
        const isInstallSucc =  await onInstallDependencies();

        if (isInstallSucc) {
            afterInstallLog(answers);
        }

    } catch (e) {
        console.log(chalk.red('startCommand error', e));
    }
}


const onInitPackageJson = (answers: Record<string, any>): Promise<void> => {

    const pkgPath = resolve(process.cwd(), 'package.json');

    return new Promise((resolve,) => {

        const prefixJson = JSON.parse(
            ejs.render(
                JSON.stringify(templateJson),
                answers,
            )
        );

        fs.writeFileSync(
            pkgPath,
            JSON.stringify(prefixJson, null, 2) + os.EOL,
            'utf8'
        );
        resolve();
    });
}

const onInstallPackage = (dependencies: string[]): Promise<boolean> => {

    return new Promise((resolve) => {

        console.log(chalk.green('install dependencies...'), dependencies);

        const args = ['add', ...dependencies, '--save', '--silent'];

        const child = spawn('yarn', args, {
            cwd: process.cwd(),
            stdio: 'inherit',
        });

        child.on('close', code => {
            if (code !== 0) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    })
}

const onInitTemplateFile = (answers): Promise<void> => {

    const appPath = resolve(process.cwd(), `./node_modules/${answers.template}`);

    const currentPkgPath = resolve(process.cwd(), `./package.json`);

    const currentPkg = eval('require')(currentPkgPath);

    const templatePkg = eval('require')(resolve(`${appPath}/package.json`));


    return new Promise((resolve) => {
        const { dependencies } = currentPkg;

        delete dependencies[answers.template];

        const packageJSon = lodash.merge(currentPkg, templatePkg.package);

        packageJSon.dependencies = sort(packageJSon.dependencies);


        fs.writeFileSync(
            currentPkgPath,
            JSON.stringify(packageJSon, null, 2) + os.EOL,
            {
                flag: 'w+',
                encoding: 'utf8'
            }
        );

        fs.copySync(`${appPath}/template`, process.cwd());

        fs.removeSync(appPath);

        resolve();
    });
}


// 安装项目其他dependencies
const onInstallDependencies = () => {

    return new Promise((resolve) => {

        console.log(chalk.green('install project dependencies...'));


        const child = spawn('yarn', ['install', '--silent'], {
            cwd: process.cwd(),
            stdio: 'inherit',
        });

        child.on('close', code => {
            if (code !== 0) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    })
}

const afterInstallLog = (answers) => {
    console.log('\n');
    console.log(chalk.green('project init success~'));
    console.log('then you can run the command');
    console.log(chalk.green(`cd ${answers.projectName}\n`));
    console.log('in develop environment');
    console.log(chalk.blue('yarn dev\n'));
    console.log('in production environment');
    console.log(chalk.blue('yarn build\n'));
}

startCommand();