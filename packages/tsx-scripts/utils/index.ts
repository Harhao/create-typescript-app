import fs from 'fs';
import net from "net";
import path from 'path';

export const execDirectoryPath = () => {
    return process.cwd();
}

export const getOverrideConfig = async (
    config: Record<string, any>,
    env: string,
    fileName: string,
): Promise<Record<string, any>> => {

    const overridePath = path.resolve(execDirectoryPath(), fileName);

    return new Promise((resolve) => {

        if (fs.existsSync(overridePath)) {

            const overrideFn = eval('require')(overridePath);

            if (typeof overrideFn === 'function') {
                const overrideConfig = overrideFn(config, env) || {};

                resolve({
                    ...config,
                    ...overrideConfig
                });
                return;
            }
            resolve(config);
        } else {
            console.warn(`\n${fileName} not found\n`);
            resolve({});
        }
    });
}

export function isPortUsed(port: number) {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);
        server.on('listening', function () {
            server.close();
            resolve(port);
        });
        server.on('error', function (err: { code: string }) {
            if (err.code == 'EADDRINUSE') {
                resolve(err);
                return;
            }
            reject(err);
        });
    });
}

export const getServerPort = async (port: number) => {

    let res = await isPortUsed(port);

    if (res instanceof Error) {
        console.log(`端口：${port}被占用\n`);
        port++;
        return await getServerPort(port);
    } else {
        return port;
    }
}