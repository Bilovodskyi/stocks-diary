import express from "express";
import {
    changeFolderName,
    createFolder,
    deleteFolder,
    getFolder,
} from "../controllers/folderControllers.js";

const router = express.Router();

router.route("/").post(getFolder).put(changeFolderName).delete(deleteFolder);
router.post("/create", createFolder);

export default router;
