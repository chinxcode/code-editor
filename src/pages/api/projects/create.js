import dbConnect from "../../../utils/dbConnect";
import Project from "../../../models/Project";
import { generateProjectCodes } from "../../../utils/codeGenerator";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();

    try {
        const { editCode, viewCode } = generateProjectCodes();
        const project = await Project.create({ editCode, viewCode });
        res.status(201).json({
            editCode: project.editCode,
            viewCode: project.viewCode,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
}
