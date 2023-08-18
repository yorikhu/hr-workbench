import UploadExcel from "./components/UploadExcel";
import styles from "./index.module.scss";

export default function Salary() {
  return (
    <div className={styles["salary"]}>
      <h2>请导入人员工资列表：</h2>
      <UploadExcel />
    </div>
  );
}
