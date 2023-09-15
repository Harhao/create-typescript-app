import { command } from "cleye";

export const dev = command({
    name: 'dev',
    alias: ['devlopment', 'dv', 'devlp'],
    parameters: [],
    help: {
        description: 'tsx-scriptts dev command is build a page for production',
        examples: [
            "\"dev\": \"tsx-scriptts dev\"",
            "\"dev\": \"tsx-scriptts development\"",
            "\"dev\": \"tsx-scriptts devlp\"",
        ]
    }
});