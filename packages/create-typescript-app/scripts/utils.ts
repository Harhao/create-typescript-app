import semver from 'semver';
import https from 'https';
import pkg from '../package.json' assert { type: 'json' };

import { execSync } from 'child_process';

export const onGetNpmPkgVersion = () => {
    return new Promise((resolve, reject) => {
        https
            .get(
                `https://registry.npmjs.org/-/package/${pkg.name}/dist-tags`,
                res => {
                    if (res.statusCode === 200) {
                        let body = '';
                        res.on('data', data => (body += data));
                        res.on('end', () => {
                            resolve(JSON.parse(body).latest);
                        });
                    } else {
                        reject();
                    }
                }
            )
            .on('error', () => {
                const version = execSync(`npm view ${pkg.name} version`).toString().trim()
                resolve(version);
            });
    });
}

export const isVersionEquote = async () => {
    const version = await onGetNpmPkgVersion();
    return semver.eq(version, pkg.version);
}

export function isUsingYarn() {
    const agent = process.env.npm_config_user_agent || '';
    return agent.indexOf('yarn') === 0;
}

export function sort(object) {
    const keys = Object.keys(object);
    keys.sort();
    const dependencies = {};
    for (const key of keys) {
        dependencies[key] = object[key]
    }
    return dependencies;
}