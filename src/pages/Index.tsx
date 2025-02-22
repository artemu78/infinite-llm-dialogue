import { ChatLog } from "@/components/Chat/ChatLog";
import { Premium } from "@/components/Premium/Premium";
import { NewsFeed } from "@/components/NewsFeed/NewsFeed";
import styles from "./Index.module.css";

const Index = () => {
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
