import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    editCode: {
        type: String,
        required: true,
        unique: true,
    },
    viewCode: {
        type: String,
        required: true,
        unique: true,
    },
    html: {
        type: String,
        default: "",
    },
    css: {
        type: String,
        default: "",
    },
    javascript: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
