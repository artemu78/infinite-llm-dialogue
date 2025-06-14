import React from "react";
import styles from "./Messages.module.css";

interface Profile {
  id: number;
  name: string;
  location: string;
  age: number;
  gender: "male" | "female";
  message: string;
  image: string;
  isOnline: boolean;
  
}

interface MessagesProps {
  profiles?: Profile[];
  onProfileClick?: (profile: Profile) => void;
  loading?: boolean;
}

const defaultProfiles: Profile[] = [
  {
    id: 1,
    name: "Jane Cooper",
    location: "Jakarta, Indonesia",
    age: 26,
    gender: "female",
    message:
      "Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmod...",
    image: "/images/profile1.jpg",
    isOnline: true,
  },
  {
    id: 2,
    name: "Guy Hawkins",
    location: "Jakarta, Indonesia",
    age: 26,
    gender: "male",
    message:
      "Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmod...",
    image: "/images/profile2.jpg",
    isOnline: true,
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    location: "Jakarta, Indonesia",
    age: 26,
    gender: "female",
    message:
      "Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmod...",
    image: "/images/profile3.jpg",
    isOnline: true,
  },
  {
    id: 4,
    name: "Jacob Jones",
    location: "Jakarta, Indonesia",
    age: 26,
    gender: "male",
    message:
      "Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmod...",
    image: "/images/profile4.jpg",
    isOnline: true,
  },
  {
    id: 5,
    name: "Ralph Edwards",
    location: "Jakarta, Indonesia",
    age: 26,
    gender: "male",
    message:
      "Lorem ipsum dolor sit amet, conse tetur adipiscing elit, sed do eiusmod...",
    image: "/images/profile5.jpg",
    isOnline: true,
  },
];

const Messages: React.FC<MessagesProps> = ({
  profiles = defaultProfiles,
  onProfileClick,
  loading = false,
}) => {
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(
    new Set()
  );

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageSrc));
  };

  return (
    <div
      className={styles.container}
      role="region"
      aria-label="Matched Profiles"
    >
      <div className={styles.statusBar} role="banner">
        <div className={styles.time}>9:41</div>
        <div className={styles.statusIcons}>
          <div className={styles.signalIcon} aria-label="Signal strength" />
          <div className={styles.wifiIcon} aria-label="WiFi connected" />
          <div className={styles.batteryIcon} aria-label="Battery level" />
        </div>
      </div>

      <h1 className={styles.title}>Matched Profiles</h1>

      <div className={styles.profileList} role="list">
        {loading ? (
          <div className={styles.loading} role="status">
            <span className={styles.loadingText}>Loading profiles...</span>
          </div>
        ) : (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className={styles.profileCard}
              role="listitem"
              onClick={() => onProfileClick?.(profile)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onProfileClick?.(profile);
                }
              }}
              tabIndex={0}
              aria-label={`Profile of ${profile.name}`}
            >
              <div className={styles.profileImageWrapper}>
                <img
                  src={profile.image}
                  alt={`${profile.name}'s profile`}
                  className={`${styles.profileImage} ${
                    loadedImages.has(profile.image) ? styles.loaded : ""
                  }`}
                  onLoad={() => handleImageLoad(profile.image)}
                  loading="lazy"
                />
                {profile.isOnline && (
                  <div
                    className={styles.onlineStatus}
                    role="status"
                    aria-label="Online"
                  />
                )}
              </div>

              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{profile.name}</h2>
                <p className={styles.profileMessage}>{profile.message}</p>

                <div className={styles.profileDetails}>
                  <div className={styles.locationWrapper} aria-label="Location">
                    <img
                      src="/images/location-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <span>{profile.location}</span>
                  </div>

                  <div
                    className={styles.genderAgeWrapper}
                    aria-label="Gender and age"
                  >
                    <img
                      src={`/images/${profile.gender}-icon.svg`}
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                    />
                    <span>{profile.age}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;
