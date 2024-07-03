import { Router } from "express";
import { createNewThread } from "../controllers/thread.controller.js";

const router = Router()

//Public Call
router.post("/thread", createNewThread)

export default router