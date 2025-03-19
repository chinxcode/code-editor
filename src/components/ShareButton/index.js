import { useState } from "react";
import styles from "./ShareButton.module.css";

export default function ShareButton({ editCode, viewCode }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [activeLink, setActiveLink] = useState("edit");

    const shareUrl = `${window.location.origin}/editor/${activeLink === "edit" ? editCode : viewCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        console.log("Link copied to clipboard");
        console.log(shareUrl);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <div className={styles.shareContainer}>
            <div className={styles.linkTypeSelector}>
                <button
                    className={`${styles.linkType} ${activeLink === "edit" ? styles.active : ""}`}
                    onClick={() => setActiveLink("edit")}
                >
                    Edit Link
                </button>
                <button
                    className={`${styles.linkType} ${activeLink === "view" ? styles.active : ""}`}
                    onClick={() => setActiveLink("view")}
                >
                    View Link
                </button>
            </div>
            <button className={styles.shareButton} onClick={copyToClipboard}>
                Copy {activeLink === "edit" ? "Edit" : "View"} Link
            </button>
            {showTooltip && <div className={styles.tooltip}>Link copied!</div>}
        </div>
    );
}
