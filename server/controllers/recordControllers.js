import asyncHandler from "express-async-handler";
import Record from "../models/recordModel.js";

// @desc Create Record
// @route POST /api/record/create
// @access Public
const createRecord = asyncHandler(async (req, res) => {
    const {
        parent,
        positionType,
        positionNumber,
        deposit,
        openDate,
        closeDate,
        result,
        comment,
    } = req.body;
    try {
        const folder = await Record.create({
            parent,
            positionType,
            positionNumber,
            deposit,
            openDate,
            closeDate,
            result,
            comment,
        });

        res.status(200).json({
            folder,
        });
    } catch (err) {
        console.log(err);
    }
});

// @desc Get All Records
// @route POST /api/record
// @access Private
const getAllRecords = asyncHandler(async (req, res) => {
    const parent = req.body.parent;
    try {
        const records = await Record.find({ parent });
        res.status(200).json({
            // _id: records._id,
            // closeDate: records.closeDate,
            // comment: records.comment,
            // deposit: records.number,
            // openDate: records.openDate,
            // positionNumber: records.positionNumber,
            // positionType: records.positionType,
            // result: records.result,
            data: records,
        });
    } catch (err) {
        console.log(err);
    }
});

export { createRecord, getAllRecords };
