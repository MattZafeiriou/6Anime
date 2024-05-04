const sqlHandler = require("./lib/sqlHandler");

module.exports = async (phase, { defaultConfig }) => {
    // Connect to SQL database
    sqlHandler.connect();

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