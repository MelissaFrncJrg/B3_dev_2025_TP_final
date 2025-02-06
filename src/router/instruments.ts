import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { checkToken } from "../middleware/checkToken";

const prisma = new PrismaClient();

export const instrumentRouter = Router();

// Create an instrument
instrumentRouter.post("/", checkToken, async (req, res) => {
  const { poids, nom, couleur, prix, reparations } = req.body;

  const newInstrument = await prisma.instrument.create({
    data: {
      poids: poids,
      nom: nom,
      couleur: couleur,
      prix: prix,
      reparations: reparations,
    },
  });
  res.json(newInstrument);
});

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
instrumentRouter.get("/", async (req, res) => {
  const instruments = await prisma.instrument.findMany();
  res.json(instruments);
});

// Get instrument by it's id
instrumentRouter.get("/:id", async (req, res) => {
  const instrumentId = parseInt(req.params.id, 10);

  const instrument = await prisma.instrument.findUnique({
    where: {
      id: instrumentId,
    },
  });
  if (!instrument) {
    res.status(404).json({ message: "Instrument not found" });
    return;
  } else {
    res.json(instrument);
  }
});

// Delete an instrument
instrumentRouter.delete("/:id", async (req, res) => {
  const instrumentId = parseInt(req.params.id, 10);

  const instrument = await prisma.instrument.delete({
    where: {
      id: instrumentId,
    },
  });

  if (!instrument) {
    res.status(404).json({ message: "Instrument not found" });
    return;
  } else {
    res.json(instrument);
  }
});

// Update an instrument and add a fix
instrumentRouter.put("/:id/students", async (req, res) => {
  const instrumentId = parseInt(req.params.id, 10);
  const { instrument } = req.body;

  if (isNaN(instrumentId)) {
    return res.status(400).json({ message: "Invalid reparation ID" });
  }

  const updatedInstrument = await prisma.instrument.update({
    where: { id: instrumentId },
    data: {
      nom: req.body.nom,
      prix: req.body.prix,
      reparations: {
        connect: instrument.map((instrumentId: number) => ({
          id: instrumentId,
        })),
      },
    },
    include: {
      reparations: true,
    },
  });
  res.json(updatedInstrument);
});
