import { Router } from "express";
import quotes from "./controllers/quotes";
import contact from "./controllers/contact";
import resume from "./controllers/resume";

const router = Router();

router.use("/quotes", quotes);
router.use("/contact", contact);
router.use("/resume", resume);

export default router;
