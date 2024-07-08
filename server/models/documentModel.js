import mongoose from "mongoose";
import { deleteChildren } from "./folderModel.js";

const documentSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    parent: {
        type: mongoose.Schema.Types.String,
        ref: "Folder",
        default: null,
    },
    startCapital: { type: Number },
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
});

documentSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
        await deleteChildren(doc._id, "Record");
    }
    next();
});

documentSchema.pre("remove", async function (next) {
    const doc = this;
    await deleteChildren(doc._id, "Record");
    next();
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
