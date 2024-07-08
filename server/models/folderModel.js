import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // user: { type: String },
    parent: {
        type: mongoose.Schema.Types.String,
        ref: "Folder",
        default: null,
    },
    // parent: {
    //     type: mongoose.Schema.Types.Mixed,
    //     validate: {
    //         validator: function (v) {
    //             return (
    //                 typeof v === "string" || mongoose.Types.ObjectId.isValid(v)
    //             );
    //         },
    //     },
    // },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
    docs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
});

folderSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
        await deleteChildren(doc._id, "Folder");
        await deleteChildren(doc._id, "Document");
    }
    next();
});

folderSchema.pre("remove", async function (next) {
    const doc = this;
    await deleteChildren(doc._id, "Folder");
    await deleteChildren(doc._id, "Document");
    next();
});

export const deleteChildren = async (parentId, model) => {
    const children = await mongoose.model(model).find({ parent: parentId });
    for (const child of children) {
        await mongoose.model(model).findOneAndDelete({ _id: child._id });
    }
};
const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
