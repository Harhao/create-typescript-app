import { command } from "cleye";

export const build = command({
    name: 'build',
    alias: ['bd', 'b'],
    parameters: [],
    help: {
        description: 'tsx-scriptts build command is build a page for production',
        examples: [
            "\"build\": \"tsx-scriptts build\"",
            "\"build\": \"tsx-scriptts bd\"",
            "\"build\": \"tsx-scriptts b\"",
        ]
    }
});