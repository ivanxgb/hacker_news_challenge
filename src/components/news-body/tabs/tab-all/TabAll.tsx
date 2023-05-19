import { ChangeEvent, useEffect, useRef } from "react";

import { NewsListComponent } from "@/components/news/news-list/NewsList";
import { useNewsStore } from "@/stores/news-store";
import { debounce } from "@/utils/utils";
import styles from "./TabAll.module.css";

const newsSelector = ["React", "Vue", "Angular"];

export function TabAll() {
  const { news, newsSearchTerm, getNews, incrementPage, setNewsSearchTerm } =
    useNewsStore();
  const observerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Intersection Observer callback function.
   * Invoked when the observed element becomes visible in the viewport.
   * Fetches more news based on the current search term.
   */
  const callbackIntersect = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      debounce(() => {
        incrementPage();
        getNews(newsSearchTerm);
      }, 800)();
    }
  };

  const options = {
    rootMargin: "100px",
    threshold: 1,
  };

  const handleDropdownChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setNewsSearchTerm(target.value);
  };

  useEffect(() => {
    if (newsSearchTerm === "" || news.length === 0) return;

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver(callbackIntersect, options);

    // Observe the observerRef element if it exists
    observerRef.current && observer.observe(observerRef.current);

    // Clean up the observer when the component unmounts or the dependencies change
    return () => {
      observer.disconnect();
    };
  }, [observerRef, options]);

  useEffect(() => {
    if (newsSearchTerm !== "" && news.length === 0) {
      getNews(newsSearchTerm);
    }
  }, [newsSearchTerm]);

  return (
    <div className={styles.tabAllContainer}>
      <select
        className={styles.selector}
        value={newsSearchTerm}
        onChange={handleDropdownChange}
      >
        <option className={styles.customSelect} value="">
          Select your news
        </option>
        {newsSelector.map((selector) => (
          <option
            className={styles.customSelect}
            key={selector}
            value={selector}
          >
            {selector}
          </option>
        ))}
      </select>
      <NewsListComponent news={news} />
      <div ref={observerRef} />
    </div>
  );
}
