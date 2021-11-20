const jwt = require("jsonwebtoken");
const schema = require("../model/user");

const auth = async(req, res, next) => {
    try {
        const token = await req.header("x-auth-token");
        if(!token) {
            await res.status(403).json({ msg: "Access Denied"});
        }
        const decode = jwt.verify(token, process.env.JWTKEY);
        const user = await schema.findOne({ _id: decode._id});
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({msg: "Invalid Token"});
    }
}

module.exports = auth;