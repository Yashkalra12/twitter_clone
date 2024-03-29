"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { firstname, lastname, username, email, password } = req.body;
    let user = yield prisma.user.create({
        data: {
            firstname, lastname, username, email, password
        }
    });
    console.log(user);
    res.send("User added");
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield prisma.user.findMany();
    res.send({ users });
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let user = yield prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    res.send({ user });
}));
router.get("/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    let users = yield prisma.user.findMany({
        where: {
            OR: [
                {
                    firstname: {
                        contains: username
                    },
                    lastname: {
                        contains: username
                    }
                }
            ]
        }
    });
    console.log({ users });
}));
router.delete("/:id", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id != req.user.id)
        return res.send("not a valid request");
    let result = yield prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    res.send("user deleted");
}));
router.put("/:id", auth_1.verifyToken, (req, res) => {
});
exports.default = router;
