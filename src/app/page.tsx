import Header from "@/components/Header";
import UploadExcel from "@/components/UploadExcel";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <UploadExcel />
    </main>
  );
}
