import { read } from "xlsx";

export const formateFileInfo = (file: File | undefined) => {
  if (!file) return {};
  const { name, size, type, lastModified } = file;
  const rawName = name;
  const rawNameChip = rawName?.split(".");
  const extension = rawNameChip[rawNameChip.length - 1];
  const fileName = rawNameChip.slice(0, rawNameChip.length - 1).join(".");

  const fileReader = new FileReader();
  fileReader.readAsBinaryString(file);
  fileReader.onload = function (e) {
    try {
      let data = e.target?.result;
      let workbook = read(data, {
        type: "binary",
      });
      console.log(workbook);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    name: fileName,
    extension: extension,
    size,
    type,
    lastModified,
  };
};
