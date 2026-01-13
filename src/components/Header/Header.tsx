import { useState, useEffect, useRef } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import styles from "./Header.module.css";
import { AboutModal } from "../Modal/AboutModal";
import type { IUser } from "@/lib/types";
import { userAtom, appStateAtom } from "@/lib/atoms";
import { getUserName } from "@/lib/userUtils";
import { isDebugMode } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { IS_LOCAL } from "@/config";

const userName = getUserName();

const GOOGLE_CLIENT_ID =
  "20534293634-9u6slp5sf1bv4cn3o54sadvhqsk53epb.apps.googleusercontent.com";

const LoginButton: React.FC = () => {
  const [_, setUser] = useAtom(userAtom) as [
    IUser | null,
    (value: IUser | null) => void
  ];
  const [isLoading, setIsLoading] = useState(false);

  const fakeLogin = () => {
    setUser({
      email: "fake@gmail.com",
      email_verified: true,
      family_name: "Pupkin",
      given_name: "Vasily",
      name: "Vasya",
      picture: "",
      sub: "hzcheeto",
      access_token: "LOCALLY",
    });
  };

  const realLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (isDebugMode()) console.log("Login successful:", tokenResponse);
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
        const userData: IUser = await userInfo.json();
        if (isDebugMode()) console.log("Login successful:", userData);
        setUser({ ...userData, access_token: tokenResponse.access_token });
      } catch (error) {
        if (isDebugMode()) console.log("Login Failed:", error);
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

  const login = IS_LOCAL ? fakeLogin : realLogin;

  return (
    <button
      className={styles.loginButton}
      onClick={() => login()}
      disabled={isLoading}
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  );
};

// Main Header component
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [user] = useAtom(userAtom) as [
    IUser | null,
    (value: IUser | null) => void
  ];
  const [appState, setAppState] = useAtom(appStateAtom);

  const backgroundColorClass = appState?.isOnline
    ? styles.onlineBackgroundColor
    : styles.offlineBackgroundColor;
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.MenuAndLogo}>
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
            <div className={styles.logo}>
              Infinite LLM Dialogue for test{" "}
              <div className={styles.signDot + " " + backgroundColorClass} />
            </div>
          </div>
          <div className={styles.user}>
            <span className={styles.userChatName}>
              Welcome <i>{userName}</i>
            </span>
            {user ? <UserAvatar /> : <LoginButton />}
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
