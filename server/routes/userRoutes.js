import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/userControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.route("/logout").post(protect, logoutUser);
router.post("/login", loginUser);

export default router;
