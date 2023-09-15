import chalk from "chalk";
import { resolve } from "path";
import { internalIpV4Sync } from 'internal-ip';
import { execDirectoryPath } from "../utils";

const workDirectory = execDirectoryPath();

export const devServerConfig = {
    disableHostCheck: true,
    historyApiFallback: true,
    open: true,
    port: 6254,
    host: '127.0.0.1',
    overlay: false,
    contentBase: resolve(workDirectory, './dist'),
    quiet: true,
    proxy: {
        '/api': {
            target: 'https://www.target.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        },
        '/wx': {
            target: 'https://www.target.com/wx',
            changeOrigin: true,
            pathRewrite: { '^/wx': '' },
        },
        '/mock': {
            target: 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: { '^/mock': '' },
        }
    },
};
export const printUrl = (server) => {
    const protocol = server.https ? 'https' : 'http';
    const hostname = server.host || devServerConfig.host;

    console.log(chalk.green(`\n项目运行在:`));
    console.log(chalk.green(`- ${protocol}://${hostname}:${devServerConfig.port}`));
    console.log(chalk.green(`- ${protocol}://${internalIpV4Sync()}:${devServerConfig.port}`));
}

