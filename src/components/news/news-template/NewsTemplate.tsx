import { useState } from "react";

import Link from "next/link";

import { EmptyHeartIcon } from "@/assets/icon/EmptyHeart";
import { FilledHeartIcon } from "@/assets/icon/FilledHeart";
import { TimeIcon } from "@/assets/icon/TimeIcon";
import { HitsModel } from "@/service/models/HitsModel";
import { useFavesStore } from "@/stores/faves-store";
import { getElapsedTime } from "@/utils/utils";
import styles from "./NewsTemplate.module.css";

type NewsProps = {
  news: HitsModel;
};

export function NewsTemplate({ news }: NewsProps) {
  const { isSaved, saveNews, removeNews } = useFavesStore();
  const [isFav, setIsFav] = useState<boolean>(isSaved(news));

  const handleFav = () => {
    isFav ? removeNews(news) : saveNews(news);
    setIsFav(!isFav);
  };

  const elapsedTime = getElapsedTime(news.created_at!);
  return (
    <article className={styles.newsContainer}>
      <Link className={styles.newsBody} href={news.story_url!} target="_blank">
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
      </Link>

      <div className={styles.buttonSide}>
        <button onClick={handleFav}>
          {isFav ? <FilledHeartIcon /> : <EmptyHeartIcon />}
        </button>
      </div>
    </article>
  );
}
