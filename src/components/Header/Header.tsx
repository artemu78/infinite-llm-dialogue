import { useState, useEffect, useRef } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { atom, useAtom } from 'jotai';
import styles from "./Header.module.css";
import { AboutModal } from "../Modal/AboutModal";
import type { User } from "@/lib/types";
import { userAtom } from "@/lib/atoms";
import { getUserName } from "@/lib/userUtils";
import { isDebugMode } from "@/lib/utils";

const userName = getUserName();

const GOOGLE_CLIENT_ID = "20534293634-9u6slp5sf1bv4cn3o54sadvhqsk53epb.apps.googleusercontent.com";

interface LoginButtonProps {
  setAtomValue: (userData: User) => void;
}

// LoginButton component
const LoginButton: React.FC<LoginButtonProps> = ({ setAtomValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      isDebugMode() && console.log("Login successful:", tokenResponse);
      setIsLoading(true);
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userData: User = await userInfo.json();
        isDebugMode() && console.log("Login successful:", userData);
        setAtomValue({...userData, access_token: tokenResponse.access_token});
      } catch (error) {
        isDebugMode() && console.log("Login Failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      if (isDebugMode()) {
        console.log("Login Failed:", error);
      }
      alert("Login failed. Please try again.");
    },
  });

  return (
    <button className={styles.loginButton} onClick={() => login()} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login with Google'}
    </button>
  );
};

// Main Header component
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [user, setUser] = useAtom(userAtom) as [User | null, (value: User | null) => void];
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
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
            <span className={styles.userChatName}>Welcome <i>{userName}</i></span>
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
              <LoginButton setAtomValue={setUser} />
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