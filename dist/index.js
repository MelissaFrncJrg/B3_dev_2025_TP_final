"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const instruments_1 = require("./router/instruments");
const reparations_1 = require("./router/reparations");
const users_1 = require("./router/users");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.use("/instruments", instruments_1.instrumentRouter);
apiRouter.use("/reparations", reparations_1.reparationRouter);
apiRouter.use("/users", users_1.userRouter);
app.use("/api", apiRouter);
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
