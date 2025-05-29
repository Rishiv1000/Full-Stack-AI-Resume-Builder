import { Router } from "express";
import {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controller/resume.controller.js";
// import { isUserAvailable } from "../middleware/auth.js";

const router = Router();

router.get("/", start);
router.post("/createResume", createResume);
router.get("/getAllResume",  getALLResume);
router.get("/getResume", getResume);
router.put("/updateResume", updateResume);
router.delete("/removeResume", removeResume);

export default router;
