import fs from 'fs';
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
                const overrideConfig = overrideFn(config, env);

                resolve(overrideConfig);
                return;
            }
            resolve({});
        }  else {
            console.warn(`\n${fileName} not found\n`);
            resolve({});
        }
    });
}