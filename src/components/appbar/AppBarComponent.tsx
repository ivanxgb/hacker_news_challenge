import Image from "next/image";

import styles from "./AppBar.module.css";

export function AppBarComponent() {
  return (
    <>
      <header className={styles.header}>
        <Image
          src={"/assets/hacker-news.svg"}
          alt={"Hacker News Logo"}
          width={200}
          height={100}
        />
      </header>
    </>
  );
}
