import ejs from 'ejs';
import fs from 'fs';
import HtmlWebpackPlugin from "html-webpack-plugin";

import { resolve } from "path";
import { execDirectoryPath } from '../utils';

const workDirectory = execDirectoryPath();

export const getEntrys = () => {
    const entryPaths = {};
    const entryDirs = resolve(workDirectory, './src/entry');
    const dirs = fs.readdirSync(entryDirs);
    //遍历文件夹dirs   
    dirs.forEach(dir => {
        entryPaths[dir] = resolve(entryDirs, dir, 'main.tsx');
    });
    return entryPaths;
}

export const getTemplateJson = (filePath: string) => {
    const fileJson = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileJson);
}

export const getHtmlPlugins = () => {
    const defaultData = { title: '默认标题', links: [], scripts: [] };

    const inputPaths = resolve(workDirectory, './src/entry');
    const dirs = fs.readdirSync(inputPaths);

    return dirs.map(dirname => {
        const folerPath = resolve(inputPaths, dirname);
        const templateConfigPath = resolve(folerPath, './template.json');
        const ejsTemplate = fs.readFileSync(resolve(workDirectory, './public/index.ejs'), 'utf-8');

        if (fs.existsSync(templateConfigPath)) {

            const data = getTemplateJson(templateConfigPath);
            return new HtmlWebpackPlugin({
                inject: true,
                templateContent: ejs.render(ejsTemplate, data),
                hash: true,
                filename: `${dirname}.html`,
                chunks: [`${dirname}`],
            });   
        }
        return  new HtmlWebpackPlugin({
            inject: true,
            templateContent: ejs.render(ejsTemplate, defaultData),
            hash: true,
            filename: `${dirname}.html`,
            chunks: [`${dirname}`],
        }); 
    });
}
