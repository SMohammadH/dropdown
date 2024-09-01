import CategoryDropdown from "./components/CategoryDropdown/CategoryDropdown";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <CategoryDropdown />
    </main>
  );
}
