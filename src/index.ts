import cors from "cors";
import express from "express";
import "dotenv/config";

import { instrumentRouter } from "./router/instruments";
import { reparationRouter } from "./router/reparations";
import { userRouter } from "./router/users";
import { checkToken } from "./middleware/checkToken";

const app = express();

app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/instruments", instrumentRouter);
apiRouter.use("/reparations", checkToken, reparationRouter);
apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
