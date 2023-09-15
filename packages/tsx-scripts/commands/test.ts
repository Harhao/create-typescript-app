import { command } from "cleye";

export const test = command({
    name: 'test',
    alias: ['ts', 'tes'],
    parameters: [],
    help: {
        description: 'tsx-scriptts mock command is for test env',
        examples: [
            "\"test\": \"tsx-scriptts test\"",
            "\"test\": \"tsx-scriptts ts\"",
            "\"test\": \"tsx-scriptts tes\"",
        ]
    }
});