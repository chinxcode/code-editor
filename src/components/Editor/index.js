import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import ShareButton from "../ShareButton";
import styles from "./Editor.module.css";

export default function CodeEditor({ initialData, readOnly, editCode, viewCode }) {
    const [activeTab, setActiveTab] = useState("html");
    const [html, setHtml] = useState(initialData?.html || "");
    const [css, setCss] = useState(initialData?.css || "");
    const [js, setJs] = useState(initialData?.javascript || "");
    const [saveStatus, setSaveStatus] = useState("");

    const tabs = [
        { id: "html", label: "HTML", icon: "📄", language: "html" },
        { id: "css", label: "CSS", icon: "🎨", language: "css" },
        { id: "js", label: "JavaScript", icon: "⚡", language: "javascript" },
    ];

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        lineNumbers: "on",
        roundedSelection: true,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        readOnly: readOnly,
        theme: "vs-dark",
        padding: { top: 10 },
    };

    const saveProject = async () => {
        if (readOnly) return;

        try {
            await axios.post("/api/projects/update", {
                code: editCode,
                html,
                css,
                javascript: js,
            });
            setSaveStatus("Saved!");
            setTimeout(() => setSaveStatus(""), 2000);
        } catch (error) {
            setSaveStatus("Save failed");
            setTimeout(() => setSaveStatus(""), 2000);
        }
    };

    const openPreview = () => {
        const output = generateOutput();
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(output);
        previewWindow.document.close();
    };

    const generateOutput = () => {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Code Preview</title>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>${js}</script>
                </body>
            </html>
        `;
    };

    return (
        <div className={styles.container}>
            <div className={styles.editorPane}>
                <div className={styles.tabContainer}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                    <div className={styles.actionButtons}>
                        {!readOnly && (
                            <button className={styles.actionButton} onClick={saveProject}>
                                💾 Save
                            </button>
                        )}
                        <button className={styles.actionButton} onClick={openPreview}>
                            🔍 Preview
                        </button>
                    </div>
                    {saveStatus && <span className={styles.saveStatus}>{saveStatus}</span>}
                </div>
                <div className={styles.editorContainer}>
                    <Editor
                        height="100%"
                        language={tabs.find((t) => t.id === activeTab).language}
                        value={activeTab === "html" ? html : activeTab === "css" ? css : js}
                        onChange={(value) => {
                            if (!readOnly) {
                                if (activeTab === "html") setHtml(value);
                                if (activeTab === "css") setCss(value);
                                if (activeTab === "js") setJs(value);
                            }
                        }}
                        options={editorOptions}
                    />
                </div>
            </div>

            <div className={styles.previewPane}>
                <iframe srcDoc={generateOutput()} title="preview" sandbox="allow-scripts" className={styles.previewFrame} />
            </div>

            <ShareButton editCode={editCode} viewCode={viewCode} />
        </div>
    );
}
