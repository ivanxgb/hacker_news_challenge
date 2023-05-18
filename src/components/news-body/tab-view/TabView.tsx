import React, { ReactNode, useEffect, useState } from "react";

import styles from "./TabView.module.css";

export interface Tab {
  label: string;
  content: ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
}

export function TabView({ tabs }: TabViewProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const handleTabClick = (tabLabel: string) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={tab.label === activeTab ? styles.active : ""}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={tab.label === activeTab ? "" : styles.hidden}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
