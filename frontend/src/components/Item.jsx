import { useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import styles from "../../style.module.css";

import FolderZipIcon from "@mui/icons-material/FolderZip";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import filesHandler from "../api/filesHandler";

function getIcon(fileType) {
  switch (fileType) {
    case "zip":
      return <FolderZipIcon />;
    case "txt":
      return <DescriptionIcon />;
    default:
      return <FolderSpecialIcon />;
  }
}

const getType = (fullName) => {
  return fullName.split(".")[1];
};

const getName = (fullName) => {
  return fullName.split(".")[0];
};

export default function Item({ fullName, getFiles, user }) {
  const [isHovered, setIsHovered] = useState(false);

  const fileType = getType(fullName);
  const fileIcon = getIcon(fileType);
  const fileName = getName(fullName);

  function deleteFile() {
    filesHandler.deleteFile(fullName, user);
    getFiles();
  }

  function downloadFile() {
    filesHandler.downloadFile(fullName, user);
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.item}
    >
      <div className={styles.itemName}>
        {isHovered ? "📂" : "📁"}
        <a href="#" onClick={downloadFile}>
          {fileName}
        </a>
      </div>
      .{fileType}
      <div className={styles.itemType}>{fileIcon}</div>
      <RemoveCircleIcon className={styles.itemDel} onClick={deleteFile} />
    </div>
  );
}
//
