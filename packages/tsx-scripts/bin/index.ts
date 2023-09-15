import { cli } from 'cleye';
import { Eenvironment } from '../scripts/enum';
import { build, dev, mock, test } from '../commands';
import { loadEnvFile, startBuild, startDev } from '../scripts';

import pkg from '../package.json' assert { type: 'json'};

export enum ECommandMap {
    BUILD = 'build',
    DEV = 'dev',
    TEST = 'test',
    MOCK = 'mock',
}

const getEnvData = (runCommand: ECommandMap): Record<string, any> => {

    let envConfig: { NODE_ENV: Eenvironment; CUSTOM_ENV: Eenvironment } | null = null;

    switch (runCommand) {
        case ECommandMap.BUILD: envConfig = {
            NODE_ENV: Eenvironment.production,
            CUSTOM_ENV: Eenvironment.production,
        }; break;
        case ECommandMap.DEV: envConfig = {
            NODE_ENV: Eenvironment.development,
            CUSTOM_ENV: Eenvironment.development,
        }; break;
        case ECommandMap.TEST: envConfig = {
            NODE_ENV: Eenvironment.production,
            CUSTOM_ENV: Eenvironment.development,
        }; break;
        case ECommandMap.MOCK: envConfig = {
            NODE_ENV: Eenvironment.development,
            CUSTOM_ENV: Eenvironment.mock,
        }; break;
        default: envConfig = {
            NODE_ENV: Eenvironment.production,
            CUSTOM_ENV: Eenvironment.production,
        };
    }

    return loadEnvFile(envConfig);
}

const start = async (runCommand: ECommandMap) => {

    const envData = getEnvData(runCommand);

    switch (runCommand) {
        case ECommandMap.BUILD: startBuild(envData); break;
        case ECommandMap.DEV: startDev(envData); break;
        case ECommandMap.TEST: startBuild(envData); break;
        case ECommandMap.MOCK: startDev(envData); break;
        default: console.log('No environment specified');
    }
}

// 捕获异常问题
process.on('unhandledRejection', err => {
    throw err;
});

try {
    const argv = cli({
        name: pkg.name,
        version: pkg.version,
        alias: ['tsx', 'tsx-cli', 'tsx-service'],
        commands: [
            build,
            dev,
            mock,
            test,
        ],
    }) as { command: string };

    const command = argv.command as ECommandMap;
    if (
        [
            ECommandMap.BUILD, 
            ECommandMap.DEV, 
            ECommandMap.MOCK, 
            ECommandMap.TEST,
        ].includes(command)
    ) {
        start(command);
    }
} catch (e) {
    console.log(e);
}


