import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link
            to="/privacy"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
