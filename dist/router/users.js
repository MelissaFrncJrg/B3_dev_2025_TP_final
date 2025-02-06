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
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.userRouter = (0, express_1.Router)();
// Create new user
exports.userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pseudo, motdepasse } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(motdepasse, parseInt(process.env.SALT_ROUNDS));
    const newUser = yield prisma.user.create({
        data: {
            pseudo: pseudo,
            motdepasse: hashedPassword,
        },
    });
    res.json(newUser);
}));
// Authenticate user
exports.userRouter.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const { pseudo, motdepasse } = req.body;
    const user = yield prisma.user.findFirst({ where: { pseudo } });
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
    }
    else {
        console.log(motdepasse, user.motdepasse);
        const verifyPassword = yield bcrypt_1.default.compare(motdepasse, user.motdepasse);
        if (verifyPassword) {
            if ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JWT_SECRET) {
                const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
                res.json({ token });
            }
        }
        else {
            res.status(401).json("Invalid credentials");
        }
    }
}));
// Get all users
exports.userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
