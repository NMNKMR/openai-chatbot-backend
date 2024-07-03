import {Router} from "express";
import { getUserMessages, addMessageGetResponse } from "../controllers/message.controller.js";

const router = Router();

//Public Call
router.get('/:threadId', getUserMessages);
router.post('/message', addMessageGetResponse);

export default router;