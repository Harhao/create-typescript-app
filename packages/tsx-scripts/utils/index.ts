import fs from 'fs';
import semver from 'semver';

import pkg from '../package.json' assert { type: 'json' };

import { resolve } from 'path';
import { execSync } from 'child_process';


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

export const getOverrideConfig = async (fileName: string): Promise<Record<string, any>> => {

    const overridePath = resolve(execDirectoryPath(), fileName);

    return new Promise((resolve, reject) => {
        if (fs.existsSync(overridePath)) {
            import(overridePath).then((config) => {
                resolve(config.default);
            }).catch(e => {
                console.error(e);
                reject(e);
            });
            return;
        }
        console.warn(`\n${fileName} not found\n`);
        resolve({});
    });
}