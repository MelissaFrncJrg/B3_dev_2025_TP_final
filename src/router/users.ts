import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const userRouter = Router();

// Create new user
userRouter.post("/", async (req, res) => {
  const { pseudo, motdepasse } = req.body;

  const hashedPassword = await bcrypt.hash(
    motdepasse,
    parseInt(process.env.SALT_ROUNDS!)
  );

  const newUser = await prisma.user.create({
    data: {
      pseudo: pseudo,
      motdepasse: hashedPassword,
    },
  });
  res.json(newUser);
});

// Authenticate user
userRouter.post("/auth", async (req, res) => {
  console.log(req.body);

  const { pseudo, motdepasse } = req.body;

  const user = await prisma.user.findFirst({ where: { pseudo } });

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
  } else {
    console.log(motdepasse, user.motdepasse);
    const verifyPassword = await bcrypt.compare(motdepasse, user.motdepasse);
    if (verifyPassword) {
      if (process?.env?.JWT_SECRET) {
        const token = jwt.sign(user, process.env.JWT_SECRET);
        res.json({ token });
      }
    } else {
      res.status(401).json("Invalid credentials");
    }
  }
});

// Get all users
userRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
