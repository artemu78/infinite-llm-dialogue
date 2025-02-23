import React from "react";
import styles from "./Modal.module.css";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>About Infinite LLM Dialogue</h2>
        <p>
          Welcome to Infinite LLM Dialogue, an innovative platform for engaging
          in meaningful conversations with AI language models.
        </p>
        <p>
          Our platform provides a seamless experience for users to explore the
          capabilities of large language models through natural dialogue.
        </p>
      </div>
    </div>
  );
};
