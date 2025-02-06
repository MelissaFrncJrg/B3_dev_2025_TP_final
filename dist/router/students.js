"use strict";
// import { PrismaClient } from "@prisma/client";
// import { Router } from "express";
// import { checkToken } from "../middleware/checkToken";
// const prisma = new PrismaClient();
// export const studentRouter = Router();
// // studentRouter.use(checkToken);
// // Get all students
// studentRouter.get("/", async (req, res) => {
//   const students = await prisma.student.findMany({
//     include: {
//       studentClass: true,
//     },
//   });
//   res.json(students);
// });
// // Create new student
// studentRouter.post("/", checkToken, async (req, res) => {
//   const { name, idClass } = req.body;
//   const newStudent = await prisma.student.create({
//     data: {
//       name,
//       email: name.toLowerCase() + "@gmail.com",
//       classId: parseInt(idClass),
//     },
//   });
//   res.json(newStudent);
// });
// // Get student by it's id
// studentRouter.get("/:id", async (req, res) => {
//   const studentId = parseInt(req.params.id, 10);
//   const student = await prisma.student.findUnique({
//     where: {
//       id: studentId,
//     },
//   });
//   if (!student) {
//     res.status(404).json({ message: "Student not found" });
//     return;
//   } else {
//     res.json(student);
//   }
// });
// studentRouter.delete("/:id", async (req, res) => {
//   const studentId = parseInt(req.params.id, 10);
//   const student = await prisma.student.delete({
//     where: {
//       id: studentId,
//     },
//   });
//   if (!student) {
//     res.status(404).json({ message: "Student not found" });
//     return;
//   } else {
//     res.json(student);
//   }
// });
// // // Update a student
// // studentRouter.put("/:id", async (req, res) => {
// //   const studentId = parseInt(req.params.id, 10);
// //   if (isNaN(studentId)) {
// //     return res.status(400).json({ message: "Invalid student ID" });
// //   }
// //   const updatedStudent = await prisma.student.update({
// //     where: { id: studentId },
// //     data: {
// //       name: req.body.name,
// //       email: req.body.email,
// //     },
// //   });
// //   res.json(updatedStudent);
// // });
