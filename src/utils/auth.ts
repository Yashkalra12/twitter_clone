import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const secretKey = "yash@1578";

export const createJwtToken = (user: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}) => {
    return jwt.sign(user, secretKey, { expiresIn: "24h" });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).send("No token provided");
    }

    try {
        let decode = jwt.verify(token, secretKey);
        console.log(decode);
        if (decode) {
            req.user = decode;
            return next();
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).send("Token invalid or expired");
    }
    res.send("token invalid");
}
