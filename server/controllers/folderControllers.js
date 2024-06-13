import asyncHandler from "express-async-handler";
import Folder from "../models/folderModel.js";

// @desc Create Folder
// @route POST /api/folder/create
// @access Public
const createFolder = asyncHandler(async (req, res) => {
    const { _id, name, user, parent } = req.body;

    const folder = await Folder.create({
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
});

// @desc Get All Folders
// @route POST /api/folder
// @access Public
const getFolder = asyncHandler(async (req, res) => {
    const user = req.body.user;

    const folders = await Folder.find({ user });

    res.status(200).json({
        folders,
    });
});

// @desc Change Folder Name
// @route PUT /api/folder
// @access Private
const changeFolderName = asyncHandler(async (req, res) => {
    const folder = await Folder.findById(req.body._id);
    if (folder) {
        folder.name = req.body.name;
        const updatedFolder = await folder.save();
        res.status(200).json({
            name: updatedFolder.name,
        });
    } else {
        res.status(404);
        throw new Error("Folder not found!");
    }
});

// @desc Delete Folder
// @route DELETE /api/folder
// @access Private
const deleteFolder = asyncHandler(async (req, res) => {
    const folderId = req.body.id;

    try {
        await Folder.findByIdAndDelete(folderId);
        res.status(200).json({ message: "Folder is deleted successfully!" });
    } catch (err) {
        console.log(err);
    }
});

export { createFolder, getFolder, changeFolderName, deleteFolder };
