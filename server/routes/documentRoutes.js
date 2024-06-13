import express from "express";
import {
    changeDocumentName,
    createDocument,
    deleteDocument,
    getAllDocuments,
} from "../controllers/documentControllers.js";

const router = express.Router();

router
    .route("/")
    .post(getAllDocuments)
    .put(changeDocumentName)
    .delete(deleteDocument);
router.post("/create", createDocument);

export default router;
