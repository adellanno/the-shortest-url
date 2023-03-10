import express, { Express } from "express";
import dotenv from "dotenv";
import decodeRoute from "./src/routes/decode/decode";
import encodeRoute from "./src/routes/encode/encode";
import helmet from "helmet";

dotenv.config();

export const app: Express = express();

app.use(helmet());
app.use(express.json());

app.use("/decode", decodeRoute);
app.use("/encode", encodeRoute);
