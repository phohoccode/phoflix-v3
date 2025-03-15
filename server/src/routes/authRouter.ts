import express from "express";
import {
  completeRegistration,
  forgotPassword,
  resetPassword,
  userLogin,
  userRegister,
  verifyToken,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/complete-registration", completeRegistration);
router.post("/forgot-password", forgotPassword);
router.get("/verify-token", verifyToken);
router.post("/reset-password", resetPassword);

export default router;
