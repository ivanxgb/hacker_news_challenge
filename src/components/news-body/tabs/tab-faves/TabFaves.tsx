import { NewsListComponent } from "@/components/news/news-list/NewsList";
import { useFavesStore } from "@/stores/faves-store";
import styles from "./TabFaves.module.css";

export function TabFaves() {
  const { news } = useFavesStore();

  return news.length > 0 ? (
    <NewsListComponent news={news} />
  ) : (
    <div className={styles.empty}>No Faves</div>
  );
}
