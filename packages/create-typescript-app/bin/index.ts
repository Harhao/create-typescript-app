import { cli } from 'cleye';
import { getPrompts, isVersionEquote } from '../scripts';

import os from 'os';
import pkg from '../package.json' assert { type: 'json'};

// 捕获异常问题
process.on('unhandledRejection', err => {
    throw err;
});


const checkCliVersion = async () => {
    try {
        const isEquote = await isVersionEquote();
        if (!isEquote) {
            return false;
        }
        return true;
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

        console.log(os.homedir());

        //检查脚手架版本
        const isLatest = await checkCliVersion();

        if (isLatest) {
            //询问prompts
            const answers = await getPrompts();

            //TODO 
        }

    } catch (e) {
        console.log('startCommand error', e);
    }
}

startCommand();