function getAccountId(req, res)
{
    const cookies = req.headers.cookie;
    if (!cookies) return null;
    const token = cookies.split(";").find(c => c.trim().startsWith("token="));
    if (!token) return null;
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token.split("=")[1], process.env.JWT_SECRET);
    if (!decoded) return null;
    return decoded.id.toString();
}

function getIdByToken(token)
{
    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return null;
    return decoded.id.toString();
}

module.exports = {getAccountId, getIdByToken};