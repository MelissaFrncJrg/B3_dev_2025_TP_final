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
exports.instrumentRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const checkToken_1 = require("../middleware/checkToken");
const prisma = new client_1.PrismaClient();
exports.instrumentRouter = (0, express_1.Router)();
// Create an instrument
exports.instrumentRouter.post("/", checkToken_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { poids, nom, couleur, prix, reparations } = req.body;
    const newInstrument = yield prisma.instrument.create({
        data: {
            poids: poids,
            nom: nom,
            couleur: couleur,
            prix: prix,
            reparations: reparations,
        },
    });
    res.json(newInstrument);
}));
// // Get the yellow bananas (because why not)
// instrumentRouter.get("/", async (req, res) => {
//   const { couleur, prix } = req.body;
//   const instrument = await prisma.instrument.findFirst({
//     where: {
//       nom: "bananes",
//     },
//   });
//   if (!instrument || instrument.couleur !== "jaune") {
//     res.status(202).json({ color: undefined, prix: 0.1 });
//   }
//   res.status(202).json(instrument);
// });
// Get all instruments
exports.instrumentRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instruments = yield prisma.instrument.findMany();
    res.json(instruments);
}));
// Get instrument by it's id
exports.instrumentRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instrumentId = parseInt(req.params.id, 10);
    const instrument = yield prisma.instrument.findUnique({
        where: {
            id: instrumentId,
        },
    });
    if (!instrument) {
        res.status(404).json({ message: "Instrument not found" });
        return;
    }
    else {
        res.json(instrument);
    }
}));
// Delete an instrument
exports.instrumentRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instrumentId = parseInt(req.params.id, 10);
    const instrument = yield prisma.instrument.delete({
        where: {
            id: instrumentId,
        },
    });
    if (!instrument) {
        res.status(404).json({ message: "Instrument not found" });
        return;
    }
    else {
        res.json(instrument);
    }
}));
// Update an instrument and add a fix
exports.instrumentRouter.put("/:id/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instrumentId = parseInt(req.params.id, 10);
    const { instrument } = req.body;
    if (isNaN(instrumentId)) {
        return res.status(400).json({ message: "Invalid reparation ID" });
    }
    const updatedInstrument = yield prisma.instrument.update({
        where: { id: instrumentId },
        data: {
            nom: req.body.nom,
            prix: req.body.prix,
            reparations: {
                connect: instrument.map((instrumentId) => ({
                    id: instrumentId,
                })),
            },
        },
        include: {
            reparations: true,
        },
    });
    res.json(updatedInstrument);
}));
