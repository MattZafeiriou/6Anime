const sqlHandler = require("./lib/sqlHandler");

module.exports = async (phase, { defaultConfig }) => {
    sqlHandler.connect();
    return {}
}