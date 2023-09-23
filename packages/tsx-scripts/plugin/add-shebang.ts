import fs from 'fs';

export class AddShebangPlugin {


    apply(compiler) {
        compiler.hooks.afterEmit.tap('AddShebangPlugin', compilation => {
            const { outputOptions, assets } = compilation;

            // 在这里指定生成的结果文件的输出路径，默认为 outputOptions.path
            const outputPath = outputOptions.path;

            // 在这里指定生成的结果文件的文件名，默认为 outputOptions.filename
            const outputFilename = outputOptions.filename;

            const shebang = '#!/usr/bin/env node\n';

            if (outputPath && outputFilename && assets[outputFilename]) {
                const outputFilePath = `${outputPath}/${outputFilename}`;

                const originalContent = fs.readFileSync(outputFilePath, 'utf8');
                const modifiedContent = shebang + originalContent;

                fs.writeFileSync(outputFilePath, modifiedContent, 'utf8');
            }
        });
    }
}