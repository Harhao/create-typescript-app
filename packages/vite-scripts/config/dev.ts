import chalk from "chalk";

import { resolve } from "path";
import { internalIpV4Sync } from 'internal-ip';
import { execDirectoryPath } from "../utils";

const workDirectory = execDirectoryPath();

export const devServerConfig = {
    configFile: false,
    clearScreen: true,
    server: {
        open: true,
        port: 6254,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                rewrite: (pathname: string) => {
                    return pathname.replace(/\/api/, '');
                },
                secure: false,
            },
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

