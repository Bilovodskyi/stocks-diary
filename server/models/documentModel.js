import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    parent: {
        type: mongoose.Schema.Types.String,
        ref: "Folder",
        default: null,
    },
    type: { type: String },
    amount: { type: Number },
    deposit: { type: Number },
    dateOpen: { type: Number },
    dateClose: { type: Number },
    timeOpen: { type: Number },
    timeClose: { type: Number },
    result: { type: Number },
    comision: { type: Number },
    comments: { type: String },
});

const Document = mongoose.model("Document", folderSchema);

export default Document;
