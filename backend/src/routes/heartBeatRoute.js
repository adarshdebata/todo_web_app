import express from "express";
import { heartbeat } from "../controllers/heartbeatController.js";

const router = express.Router();

router.get("/HbtChk", heartbeat);

export default router;
