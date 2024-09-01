export function getLanguage(context) {
    // get lang cookie
    // if not exist, get from headers
    // if not exist, return 'en'

    const cookies = context.req.headers.cookie;
    if (cookies !== undefined) {
        const cookie = cookies.split(';').find(c => c.trim().startsWith('lang='));
        if (cookie !== undefined) {
            return cookie.split('=')[1];
        }
    }

    let lang = context.req.headers['accept-language'];
    if (lang === undefined) {
        lang = 'en';
    } else {
        lang = lang.split(",")[0];
    }
    lang = lang.split("-")[0];
    if (lang === 'ja') {
        lang = 'ja';
    } else {
        lang = 'en';
    }
    return lang;
}