import path from "path";
import shell from 'shelljs';
import { execDirectoryPath } from "../utils";

const workDirectory = execDirectoryPath();

export const sentryConfig = {
    org: "fee",
    project: "client",
    release: shell.echo('git rev-parse HEAD'),
    include: path.resolve(workDirectory, "./dist"),
    ignore: ["node_modules"],
    urlPrefix: process.env.PUBLIC_PATH,
    environment: process.env.NODE_ENV,
    url: "",
    authToken: ""
};