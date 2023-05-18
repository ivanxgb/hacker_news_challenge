import Link from "next/link";

import { EmptyHeartIcon } from "@/assets/icon/EmptyHeart";
import { TimeIcon } from "@/assets/icon/TimeIcon";
import { HitsModel } from "@/service/models/HitsModel";
import { getElapsedTime } from "@/utils/utils";
import styles from "./News.module.css";

export function NewsComponent(news: HitsModel) {
  const elapsedTime = getElapsedTime(news.created_at!);
  return (
    <article className={styles.newsContainer}>
      <div className={styles.newsBody}>
        <div className={styles.newsHeader}>
          <TimeIcon />
          <p>
            {elapsedTime} by {news.author}
          </p>
        </div>
        <Link
          className={styles.newsTitle}
          href={news.story_url!}
          target="_blank"
        >
          <p>{news.story_title}</p>
        </Link>
      </div>
      <div className={styles.buttonSide}>
        <button>
          <EmptyHeartIcon />
        </button>
      </div>
    </article>
  );
}
