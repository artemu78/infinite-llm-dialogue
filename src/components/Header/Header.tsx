import { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import styles from "./Header.module.css";
import { AboutModal } from "../Modal/AboutModal";

const GOOGLE_CLIENT_ID = "20534293634-9u6slp5sf1bv4cn3o54sadvhqsk53epb.apps.googleusercontent.com";

// LoginButton component
const LoginButton = ({ onSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Fetch user info from Google
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const userData = await userInfo.json();
      onSuccess(userData);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <button className={styles.loginButton} onClick={() => login()}>
      Login with Google
    </button>
  );
};

// Main Header component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser({
      name: userData.name,
      picture: userData.picture,
    });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
            {user ? (
              <>
                <span className={styles.userName}>{user.name}</span>
                <img
                  src={user.picture}
                  alt="User avatar"
                  className={styles.avatar}
                />
              </>
            ) : (
              <LoginButton onSuccess={handleLoginSuccess} />
            )}
          </div>
        </div>
        <AboutModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
      </header>
    </GoogleOAuthProvider>
  );
};