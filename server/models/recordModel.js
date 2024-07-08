import mongoose from "mongoose";

const recordSchema = mongoose.Schema({
    positionType: { type: String },
    positionNumber: { type: Number },
    deposit: { type: Number },
    openDate: { type: Date },
    closeDate: { type: Date },
    result: { type: Number },
    comment: { type: String },
    parent: { type: String },
});

const Record = mongoose.model("Record", recordSchema);

export default Record;
