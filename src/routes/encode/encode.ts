import express, { Router } from "express";
import { encodeController } from "../../controllers/encode/encode";
import { rateLimiter } from "../../middleware/rateLimiter";

const router: Router = express.Router();

router.post("/", rateLimiter, encodeController);

export default router;
