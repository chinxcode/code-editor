import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const EditorComponent = dynamic(() => import("../../components/Editor"), {
    ssr: false,
});

export default function EditorPage() {
    const router = useRouter();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const createInitialProject = async () => {
            try {
                const response = await axios.post("/api/projects/create");
                const { editCode, viewCode } = response.data;
                setProjectData({ editCode, viewCode });
                router.push(`/editor/${editCode}`, undefined, { shallow: true });
            } catch (error) {
                console.error("Error creating initial project:", error);
            }
        };

        if (!router.query.code) {
            createInitialProject();
        }
    }, []);

    if (!projectData) return null;

    return <EditorComponent editCode={projectData.editCode} viewCode={projectData.viewCode} readOnly={false} />;
}
