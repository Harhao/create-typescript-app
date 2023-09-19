import { cli } from 'cleye';
import pkg from '../package.json' assert { type: 'json'};

// 捕获异常问题
process.on('unhandledRejection', err => {
    throw err;
});

const startCommand = () => {
    try {
        const argv = cli({
            name: pkg.name,
            version: pkg.version,
            alias: ['cta', 'c-ts-a', 'c-ts-app'],
            commands: [],
        });
        console.log(argv);
    } catch(e) {
        console.log('startCommand error', e);
    }
}

startCommand();

//TODO 设置--template
//TODO 更新create-typescript-app
//TODO 更新模版prompt