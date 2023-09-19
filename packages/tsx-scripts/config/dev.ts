import chalk from "chalk";
import ip from 'ip';
import { resolve } from "path";
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
    proxy: {},
};
export const printUrl = (server) => {
    const protocol = server.https ? 'https' : 'http';
    const hostname = server.host || devServerConfig.host;

    console.log(chalk.green(`\n项目运行在:`));
    console.log(chalk.green(`- ${protocol}://${hostname}:${devServerConfig.port}`));
    console.log(chalk.green(`- ${protocol}://${ip.address()}:${devServerConfig.port}`));
}

