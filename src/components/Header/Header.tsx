import styles from "./Header.module.css";
import { getUserName } from "@/lib/userUtils";

export const Header = () => {
  const userName = getUserName();
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>Infinite LLM Dialogue</div>
        <div className={styles.user}>{userName}</div>
      </div>
    </header>
  );
};
