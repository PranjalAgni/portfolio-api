import { Router } from "express";
import quotes from "./controllers/quotes";
import contact from "./controllers/contact";

const router = Router();

router.use("/quotes", quotes);
router.use("/contact", contact);

export default router;
