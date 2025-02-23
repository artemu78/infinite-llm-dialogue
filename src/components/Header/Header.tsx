import { useState } from "react";
import styles from "./Header.module.css";
import { getUserName } from "@/lib/userUtils";
import { AboutModal } from "../Modal/AboutModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const userName = getUserName();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.menuContainer}>
          <button
            className={styles.burgerButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {isMenuOpen && (
            <div className={styles.menu}>
              <button
                className={styles.menuItem}
                onClick={() => {
                  setIsAboutModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                About
              </button>
            </div>
          )}
        </div>
        <div className={styles.logo}>Infinite LLM Dialogue</div>
        <div className={styles.user}>
          {userName}
          <div className={styles.avatar}></div>
        </div>
      </div>
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </header>
  );
};
