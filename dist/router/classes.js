"use strict";
// import { PrismaClient } from "@prisma/client";
// import { Router } from "express";
// const prisma = new PrismaClient();
// export const classRouter = Router();
// // Get all classes
// classRouter.get("/", async (req, res) => {
//   const classes = await prisma.class.findMany({
//     include: {
//       students: true,
//     },
//   });
//   res.json(classes);
// });
// // Create new class
// classRouter.post("/", async (req, res) => {
//   const { name } = req.body;
//   const newClass = await prisma.class.create({
//     data: {
//       name: name,
//     },
//   });
//   res.json(newClass);
// });
// // Get a class by it's id
// classRouter.get("/:id", async (req, res) => {
//   const classId = parseInt(req.params.id, 10);
//   const getClass = await prisma.class.findUnique({
//     where: {
//       id: classId,
//     },
//     include: { students: true },
//   });
//   if (!getClass) {
//     res.status(404).json({ message: "Class not found" });
//     return;
//   } else {
//     res.json(getClass);
//   }
// });
// // Delete a class by its id
// classRouter.delete("/:id", async (req, res) => {
//   const classId = parseInt(req.params.id, 10);
//   const deleteClass = await prisma.class.delete({
//     where: {
//       id: classId,
//     },
//   });
//   if (!deleteClass) {
//     res.status(404).json({ message: "Class not found" });
//     return;
//   } else {
//     res.json(deleteClass);
//   }
// });
// // Update a class and add students in it
// classRouter.put("/:id/students", async (req, res) => {
//   const classId = parseInt(req.params.id, 10);
//   const { students } = req.body;
//   if (isNaN(classId)) {
//     return res.status(400).json({ message: "Invalid class ID" });
//   }
//   const updatedClass = await prisma.class.update({
//     where: { id: classId },
//     data: {
//       name: req.body.name,
//       students: {
//         connect: students.map((studentId: number) => ({ id: studentId })),
//       },
//     },
//     include: {
//       students: true,
//     },
//   });
//   res.json(updatedClass);
// });
// // Remove students from a class
// classRouter.put("/:id/remove-students", async (req, res) => {
//   const classId = parseInt(req.params.id, 10);
//   const { students } = req.body;
//   if (!students || !Array.isArray(students)) {
//     return res.status(400).json({ message: "Invalid students loist" });
//   }
//   const updatedClass = await prisma.class.update({
//     where: { id: classId },
//     data: {
//       students: {
//         disconnect: students.map((studentId: number) => ({ id: studentId })),
//       },
//     },
//     include: {
//       students: true,
//     },
//   });
//   res.json(updatedClass);
// });
