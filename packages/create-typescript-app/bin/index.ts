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


const checkCliVersion = async () => {
    try {
        return await isVersionEquote();
    } catch (e) {
        console.error(`checkCliVersion ${e}`);
    }
}

const startCommand = async () => {
    try {
        cli({
            name: pkg.name,
            version: pkg.version,
            alias: ['cta', 'c-ts-a', 'c-ts-app'],
            commands: [],
        });

        //检查脚手架版本
        // const isLatest = await checkCliVersion();


        // if (isLatest) {
        //询问prompts
        const answers = await getPrompts();

        fs.ensureDirSync(answers.projectName);

        process.chdir(answers.projectName);

        const packageDependencies = ['tsx-scripts', answers.template];


        await onInitPackageJson(answers);


        await onInstallPackage(packageDependencies);

        onInitTemplateFile(answers);

        onInstallDependencies();
        // }

    } catch (e) {
        console.log('startCommand error', e);
    }
}


const onInitPackageJson = (answers: Record<string, any>): Promise<void> => {

    const pkgPath = resolve(process.cwd(), 'package.json');

    return new Promise((resolve,) => {


        const prefixJson = JSON.parse(ejs.render(JSON.stringify(templateJson), answers));


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

        const args = ['add', ...dependencies, '--save'];

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

const onInstallDependencies = () => {

    return new Promise((resolve) => {

        console.log(chalk.green('install project dependencies...'));


        const child = spawn('yarn', ['install'], {
            cwd: process.cwd(),
            stdio: 'inherit',
        });

        child.on('close', code => {
            if (code !== 0) {
                resolve(false);
                return;
            }
            console.log(chalk.green('install success~'));
            resolve(true);
        });
    })
}
startCommand();