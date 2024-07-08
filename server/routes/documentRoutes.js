import express from "express";
import {
    changeDocumentName,
    changeDocumentStartCapital,
    createDocument,
    deleteDocument,
    getAllDocuments,
    getSingleDocument,
} from "../controllers/documentControllers.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router
    .route("/")
    .post(protect, getAllDocuments)
    .put(protect, changeDocumentName)
    .delete(protect, deleteDocument);
router.route("/create").post(protect, createDocument);
router.route("/get-single-doc").post(protect, getSingleDocument);
router.route("/start-capital").put(protect, changeDocumentStartCapital);

export default router;
