import { useState, useEffect, useRef } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import styles from "./Header.module.css";
import { AboutModal } from "../Modal/AboutModal";

const GOOGLE_CLIENT_ID = "20534293634-9u6slp5sf1bv4cn3o54sadvhqsk53epb.apps.googleusercontent.com";

// Utility function to check for "debug" URL parameter
const isDebugMode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("debug");
};

interface User {
  name: string;
  picture: string;
}

interface LoginButtonProps {
  onSuccess: (userData: User) => void;
}

// LoginButton component
const LoginButton: React.FC<LoginButtonProps> = ({ onSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const userData: User = await userInfo.json();
      if (isDebugMode()) {
        console.log("Login successful:", userData);
      }
      onSuccess(userData);
    },
    onError: (error) => {
      if (isDebugMode()) {
        console.log("Login Failed:", error);
      }
    },
  });

  return (
    <button className={styles.loginButton} onClick={() => login()}>
      Login with Google
    </button>
  );
};

// Main Header component
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  const handleLoginSuccess = (userData: User) => {
    setUser({
      name: userData.name,
      picture: userData.picture,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
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
              <div
                className={styles.userContainer}
                role="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                ref={userMenuRef}
              >
                <span className={styles.userName}>{user.name}</span>
                <img
                  src={user.picture}
                  alt="User avatar"
                  className={styles.avatar}
                />
                {isUserMenuOpen && (
                  <div className={styles.userMenu}>
                    <button
                      className={styles.menuItem}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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