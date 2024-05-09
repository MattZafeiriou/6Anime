const sqlHandler = require("./lib/sqlHandler");
const repeatTasks = require("./lib/repeatTasks");

module.exports = async (phase, { defaultConfig }) => {
    // Connect to SQL database
    sqlHandler.connect();
    // Repeat tasks
    repeatTasks.repeatDaily();
    repeatTasks.repeatWeekly();
    repeatTasks.repeatMonthly();
    repeatTasks.repeatYearly();

    // Define custom headers
    const customHeaders = [
        {
            // Set Referrer-Policy header to "origin"
            source: '/(.*)',
            headers: [
                {
                    key: 'Referrer-Policy',
                    value: 'origin'
                }
            ]
        }
        // Add more custom headers if needed
    ];

    return {
        // Merge default config with custom headers
        ...defaultConfig,
        // Apply custom headers
        async headers() {
            return customHeaders;
        }
    };
};