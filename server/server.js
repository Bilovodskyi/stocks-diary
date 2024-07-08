import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const port = process.env.PORT || 8000;

import folderRoutes from "./routes/folderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/folder", folderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/record", recordRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
