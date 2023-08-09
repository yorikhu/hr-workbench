import { ChangeEventHandler, useState } from "react";
import styles from "./index.module.scss";

export default function UploadExcel() {
  const [value, setValue] = useState();
  const onChange: ChangeEventHandler<HTMLInputElement> = (value) => {
    console.log(value);
  };

  return (
    <div className={styles["upload-excel"]}>
      <input type="file" value={value} onChange={onChange} />
    </div>
  );
}
