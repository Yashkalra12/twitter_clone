"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "yash@1578";
const createJwtToken = (user) => {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "24h" });
};
exports.createJwtToken = createJwtToken;
const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).send("No token provided");
    }
    try {
        let decode = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(decode);
        if (decode) {
            req.user = decode;
            return next();
        }
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).send("Token invalid or expired");
    }
    res.send("token invalid");
};
exports.verifyToken = verifyToken;
