import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();

export const reparationRouter = Router();

// Create new fix
reparationRouter.post("/", async (req, res) => {
  const { nom, prix, instrument } = req.body;

  if (!instrument) {
    return res.status(400).json({ message: "Invalid instrument list" });
  }

  const newReparation = await prisma.reparation.create({
    data: {
      nom: nom,
      prix: prix,
      instrumentId: instrument,
    },
  });
  res.json(newReparation);
});

// Delete a fix by its id
reparationRouter.delete("/:id", async (req, res) => {
  const reparationId = parseInt(req.params.id, 10);

  const deleteReparation = await prisma.reparation.delete({
    where: {
      id: reparationId,
    },
  });

  if (!deleteReparation) {
    res.status(404).json({ message: "Reparation not found" });
    return;
  } else {
    res.json(deleteReparation);
  }
});
