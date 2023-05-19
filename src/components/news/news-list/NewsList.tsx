import { NewsTemplate } from "@/components/news/news-template/NewsTemplate";
import { HitsModel } from "@/service/models/HitsModel";

import styles from "./NewsList.module.css";

type NewsListProps = {
  news: HitsModel[];
};

export function NewsListComponent({ news }: NewsListProps) {
  return (
    <div className={styles.content}>
      {news.length > 0 &&
        news.map((news) => <NewsTemplate key={news.created_at} news={news} />)}
    </div>
  );
}
