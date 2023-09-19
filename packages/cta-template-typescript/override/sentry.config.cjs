const path = require('path');
const shell = require('shelljs');

module.exports = function getSentryConfig() {
    return {
        org: "fee",
        project: "client",
        release: shell.echo('git rev-parse HEAD'),
        include: path.resolve(__dirname, "./dist"),
        ignore: ["node_modules"],
        urlPrefix: process.env.PUBLIC_PATH,
        environment: process.env.NODE_ENV,
        url: "",
        authToken: ""
    };
};