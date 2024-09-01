const sqlHandler = require("./lib/sqlHandler");
const repeatTasks = require("./lib/repeatTasks");
const { i18n } = require('./next-i18next.config');

module.exports = async (phase, { defaultConfig }) => {
    // Perform your asynchronous tasks (SQL connection, repeated tasks)
    await sqlHandler.connect();
    await repeatTasks.updateAnime();
    await repeatTasks.repeatDaily();
    await repeatTasks.repeatWeekly();
    await repeatTasks.repeatMonthly();
    await repeatTasks.repeatYearly();

    // Define custom headers
    const customHeaders = [
        {
            source: '/(.*)',
            headers: [
                {
                    key: 'Referrer-Policy',
                    value: 'origin'
                }
            ],
        }
    ];

    // Return the merged configuration
    return {
        ...defaultConfig,
        i18n, // Properly include the i18n configuration
        reactStrictMode: false,
        async headers() {
            return customHeaders;
        },
    };
};