export function getAllQueryParams(): Record<string, string | null> {
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    const result: Record<string, any> = {};
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        const key = pair[0];
        const value = pair.length > 1 ? pair[1] : null;
        if (result[key] !== undefined) {
            if (!Array.isArray(result[key])) {
                result[key] = [result[key]];
            }
            result[key].push(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}

export function extractImageType(base64String) {
    const regex = /^data:image\/(\w+);base64,.*/;
    const match = base64String.match(regex);

    if (match && match.length === 2) {
        return match[1];
    }
    return null;
}