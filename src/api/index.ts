import { Router } from "express";
import quotes from "./controllers/quotes";

const router = Router();

router.use("/quotes", quotes);

export default router;
