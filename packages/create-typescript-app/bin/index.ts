import { cli } from 'cleye';

import pkg from '../package.json' assert { type: 'json'};

const argv = cli({
    name: pkg.name,
    version: pkg.version,
    alias: ['cta', 'c-ts-a', 'c-ts-app'],
    commands: [],
});

console.log(argv);