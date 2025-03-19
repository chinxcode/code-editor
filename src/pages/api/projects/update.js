import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();

    try {
        const { code, ...updateData } = req.body;
        const project = await Project.findOneAndUpdate({ editCode: code }, { ...updateData, lastUpdated: new Date() }, { new: true });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error updating project" });
    }
}
