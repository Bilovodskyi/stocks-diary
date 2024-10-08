import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.route("/logout").post(logoutUser);
router.post("/login", loginUser);

export default router;
