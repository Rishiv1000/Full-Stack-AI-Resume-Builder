import {
  start,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { Router } from "express";
// import { isUserAvailable } from "../middleware/auth.js";

const router = Router();

router.get("/", start);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
