const sqlHandler = require("./lib/sqlHandler");
const repeatTasks = require("./lib/repeatTasks");

// const withPWA = require("next-pwa")({
//     dest: "public", // Destination directory for the PWA files
//     disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
//     register: true, // Register the PWA service worker
//     skipWaiting: true, // Skip waiting for service worker activation
//   });

module.exports = async (phase, { defaultConfig }) => {
    // Connect to SQL database
    sqlHandler.connect();
    // Repeat tasks
    repeatTasks.updateAnime();
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