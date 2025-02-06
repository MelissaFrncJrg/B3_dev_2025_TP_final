import { Request, Response, NextFunction } from "express";

import "dotenv/config";
import jwt from "jsonwebtoken";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fullToken = req.headers.authorization;
  if (!fullToken) {
    res.status(401).json({ message: "No token provided" });
  } else {
    const [typeToken, token] = fullToken.split(" ");
    if (typeToken !== "Bearer") {
      res.status(401).send("Invalid token type");
    } else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (decoded) {
          req.token = token;
          next();
        } else {
          res.status(401).send("Invalid token");
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid token on verify", err });
      }
    }
  }
}
