"use client";
import {
  ChangeEventHandler,
  DragEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.scss";
import { formateFileInfo } from "./utils";
import { FileType } from "./types";

export default function UploadExcel() {
  const [value, setValue] = useState<FileType>();
  const [displayName, setDisplayName] =
    useState<string>("添加/拖入 Excel 原件");

  useEffect(() => {
    document.addEventListener("drop", (event) => event.preventDefault());
    document.addEventListener("dragover", (event) => event.preventDefault());
  }, []);

  const fileExe = (file: FileType) => {
    const { name, extension } = file;
    if (extension === "xlsm") {
      name && setDisplayName(name);
      setValue(file);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = formateFileInfo(event.target.files?.[0]);
    fileExe(file);
  };

  const onDrop: DragEventHandler<HTMLLabelElement> = (event) => {
    const file = formateFileInfo(event.dataTransfer.files?.[0]);
    fileExe(file);
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
        onChange={onChange}
      />
    </div>
  );
}
