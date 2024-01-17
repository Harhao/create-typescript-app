import { Language } from '@/const';
import { i18nEnUs } from '@/i18n';



type props = {
    language: Language,
    text: string,
    patterns?: string[];
}

const resource = {
    [Language.EN]: i18nEnUs,
};

export const i18n = (props: props) => {
    const { language, text, patterns = [] } = props;

    let output = text;
    if (language === Language.EN) {
        output = resource[language][text as keyof typeof i18nEnUs] || output;
    }

    output = output.replace(/@\d+$/, '');

    let patternIndex = 0;
    output = output.replace(/\{\{([^}]+)\}\}/g, function (substr) {
        return patterns[patternIndex++] || substr;
    });

    return output;
};
