import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms";
import styles from "./UserAvatar.module.css";
import type { IUser } from "@/lib/types";
import { useRef } from "react";

export const UserAvatar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useAtom(userAtom) as [
    IUser | null,
    (value: IUser | null) => void
  ];
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
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
    <div
      className={styles.userContainer}
      role="button"
      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
      ref={userMenuRef}
      title={user.name}
    >
      <span className={styles.username}>{user.name}</span>
      <img src={user.picture} alt="User avatar" className={styles.avatar} />
      {isUserMenuOpen && (
        <div className={styles.userMenu}>
          <button className={styles.menuItem} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
