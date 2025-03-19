import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
    const router = useRouter();

    const startNewEditor = () => {
        router.push("/editor");
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Code Editor</h1>
                <p className={styles.description}>Create, share, and collaborate on code in real-time</p>
                <button onClick={startNewEditor} className={styles.button}>
                    Start Coding
                </button>
            </main>
        </div>
    );
}
