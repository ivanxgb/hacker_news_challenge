import { ChangeEvent, useEffect, useState } from "react";

import { NewsListComponent } from "@/components/news/news-list/NewsList";
import { useNewsStore } from "@/stores/news-store";
import styles from "./TabAll.module.css";

const newsSelector = ["React", "Vue", "Angular"];

export function TabAll() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { news, getNews } = useNewsStore();

  const handleDropdownChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(target.value);
  };

  useEffect(() => {
    selectedValue !== "" && getNews(selectedValue);
  }, [selectedValue]);

  return (
    <div className={styles.tabAllContainer}>
      <select
        className={styles.selector}
        value={selectedValue}
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
    </div>
  );
}
