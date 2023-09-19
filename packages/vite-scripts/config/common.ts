import fs from 'fs';

import { resolve } from "path";
import { execDirectoryPath } from '../utils';

const workDirectory = execDirectoryPath();

export const getEntrys = () => {
    const entryPaths = {
        index: resolve(workDirectory, )
    };
    const entryDirs = resolve(workDirectory, './public');
    const dirs = fs.readdirSync(entryDirs);
    //遍历文件夹dirs   
    dirs.forEach(dir => {
        entryPaths[dir] = resolve(entryDirs, dir, 'main.tsx');
    });
    return entryPaths;
}
