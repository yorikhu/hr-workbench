import { FileType } from "../types";

export const formateFileInfo = (file: File | undefined) => {
  if (!file) return {};

  const rawName = file.name;
  const rawNameChip = rawName?.split(".");
  const extension = rawNameChip[rawNameChip.length - 1];
  const fileName = rawNameChip.slice(0, rawNameChip.length - 1).join(".");

  return {
    name: fileName,
    extension: extension,
  };
};
