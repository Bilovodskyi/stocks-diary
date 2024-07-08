import express from "express";
import {
    createRecord,
    getAllRecords,
} from "../controllers/recordControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, getAllRecords);
// .delete(deleteRecord);
router.route("/create").post(protect, createRecord);

export default router;
