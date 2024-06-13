import asyncHandler from "express-async-handler";
import Document from "../models/documentModel.js";

// @desc Create Document
// @route POST /api/document/create
// @access Public
const createDocument = asyncHandler(async (req, res) => {
    const { name, user, parent, _id } = req.body;
    try {
        const folder = await Document.create({
            _id,
            name,
            user,
            parent,
        });

        res.status(200).json({
            _id: folder._id,
            name: folder.name,
            user: folder.user,
            parent: folder.parent,
        });
    } catch (err) {
        console.log(err);
    }
});

// @desc Get All Documents
// @route POST /api/document
// @access Public
const getAllDocuments = asyncHandler(async (req, res) => {
    const user = req.body.user;

    const documents = await Document.find({ user });

    res.status(200).json({
        data: documents,
    });
});

// @desc Change Document Name
// @route PUT /api/document
// @access Private
const changeDocumentName = asyncHandler(async (req, res) => {
    try {
        const document = await Document.findById(req.body.id);
        if (document) {
            document.name = req.body.newName;
            const updatedDocument = await document.save();
            res.status(200).json({
                name: updatedDocument.name,
            });
        } else {
            res.status(404);
            throw new Error("Document not found!");
        }
    } catch (err) {
        console.log(err);
    }
});

// @desc Delete Document
// @route DELETE /api/document
// @access Private
const deleteDocument = asyncHandler(async (req, res) => {
    const documentId = req.body.id;

    try {
        await Document.findByIdAndDelete(documentId);
        res.status(200).json({ message: "Folder is deleted successfully!" });
    } catch (err) {
        console.log(err);
    }
});

export { createDocument, getAllDocuments, changeDocumentName, deleteDocument };
