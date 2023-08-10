"use client";
import {
  ChangeEventHandler,
  DragEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.scss";

export default function UploadExcel() {
  const [value, setValue] = useState();
  const [displayName, setDisplayName] = useState<string>("上传 Excel 原件");

  useEffect(() => {
    document.addEventListener("drop", (event) => event.preventDefault());
    document.addEventListener("dragover", (event) => event.preventDefault());
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileName = event.target.files?.[0].name;
    fileName && setDisplayName(fileName);
  };

  const onDrop: DragEventHandler<HTMLLabelElement> = (event) => {
    const fileName = event.dataTransfer.files?.[0].name;
    fileName && setDisplayName(fileName);
  };

  return (
    <div className={styles["upload-excel"]}>
      <label
        htmlFor="excelFile"
        className={styles["excel-file-label"]}
        onDrop={onDrop}
      >
        <div className={styles["upload-area"]}>{displayName}</div>
      </label>
      <input
        id="excelFile"
        className={styles["excel-file"]}
        type="file"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
