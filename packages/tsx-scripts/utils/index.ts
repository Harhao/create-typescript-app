import fs from 'fs';
import path from 'path';
import semver from 'semver';

import pkg from '../package.json' assert { type: 'json' };

import { resolve } from 'path';
import { execSync } from 'child_process';
import { Configuration } from 'webpack';


export const onGetNpmPkgVersion = () => {
    return execSync(`npm view ${pkg.name} version`).toString().trim();
}

export const isVersionEquote = () => {
    const version = onGetNpmPkgVersion();
    return semver.eq(version, pkg.version);
}

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