import { ChatLog } from "@/components/Chat/ChatLog";
import { Premium } from "@/components/Premium/Premium";
import { NewsFeed } from "@/components/NewsFeed/NewsFeed";
import styles from "./Index.module.css";
import { useEffect } from "react";
import { getChat } from "@/lib/api";

const Index = () => {
  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        const response = await getChat({ message: "Hello" });
        console.log("Chat response:", response);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchInitialChat();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className={styles.container}>
      <article className={styles.chatSection}>
        <div className={styles.chatContent}>
          <ChatLog />
        </div>
      </article>

      <aside className={styles.sidebar}>
        <Premium className={styles.premium} />
        <div className={styles.newsFeedContainer}>
          <NewsFeed />
        </div>
      </aside>
    </div>
  );
};

export default Index;
