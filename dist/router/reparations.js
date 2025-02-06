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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reparationRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
exports.reparationRouter = (0, express_1.Router)();
// Create new fix
exports.reparationRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prix, instrument } = req.body;
    if (!instrument) {
        res.status(404).json({ message: "Instrument not found" });
    }
    const newReparation = yield prisma.reparation.create({
        data: {
            nom: nom,
            prix: prix,
            instrumentId: instrument,
        },
    });
    res.json(newReparation);
}));
// Delete a fix by its id
exports.reparationRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reparationId = parseInt(req.params.id, 10);
    const deleteReparation = yield prisma.reparation.delete({
        where: {
            id: reparationId,
        },
    });
    if (!deleteReparation) {
        res.status(404).json({ message: "Reparation not found" });
        return;
    }
    else {
        res.json(deleteReparation);
    }
}));
