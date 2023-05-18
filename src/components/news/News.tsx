import Link from "next/link";

import { EmptyHeartIcon } from "@/assets/icon/EmptyHeart";
import { TimeIcon } from "@/assets/icon/TimeIcon";
import { getElapsedTime } from "@/utils/utils";
import styles from "./News.module.css";

type NewsProps = {
  author: string;
  title: string;
  url: string;
  createdAt: string;
};

export function NewsComponent(props: NewsProps) {
  const elapsedTime = getElapsedTime(props.createdAt);
  return (
    <article className={styles.newsContainer}>
      <div className={styles.newsBody}>
        <div className={styles.newsHeader}>
          <TimeIcon />
          <p>
            {elapsedTime} by {props.author}
          </p>
        </div>
        <Link className={styles.newsTitle} href={props.url} target="_blank">
          <p>{props.title}</p>
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
