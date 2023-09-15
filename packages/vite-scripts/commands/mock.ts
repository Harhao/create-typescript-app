import { command } from "cleye";

export const mock = command({
    name: 'mock',
    alias: ['mo', 'mk', 'mck'],
    parameters: [],
    help: {
        description: 'tsx-scriptts mock command is mock data for development',
        examples: [
            "\"mock\": \"tsx-scriptts mock\"",
            "\"mock\": \"tsx-scriptts mo\"",
            "\"mock\": \"tsx-scriptts mk\"",
            "\"mock\": \"tsx-scriptts mck\"",
        ]
    }
});