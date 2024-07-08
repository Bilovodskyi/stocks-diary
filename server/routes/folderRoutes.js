import express from "express";
import {
    changeFolderName,
    createFolder,
    deleteFolder,
    getFolder,
} from "../controllers/folderControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(protect, getFolder)
    .put(protect, changeFolderName)
    .delete(protect, deleteFolder);
router.route("/create").post(protect, createFolder);

export default router;
