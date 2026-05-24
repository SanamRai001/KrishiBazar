import express from "express"
import { getUserProfile, updateUserProfile } from "../controllers/userProfileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router  = express.Router();

router.get("/user/profile", authMiddleware, getUserProfile);
router.put("/user/profile", authMiddleware, updateUserProfile);

export  default router;