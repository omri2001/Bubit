import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../style.module.css";

export default function Item({ name, setFiles, files }) {
  const [isHovered, setIsHovered] = useState(false);
  const emoji = isHovered ? "📂" : "📁";
  const binaryType = "binary";

  let fileType = name.split(".")[1];
  fileType = fileType ? `.${fileType}` : binaryType;
  const fileName = name.split(".")[0];

  function deleteFile() {
    setFiles(files.filter((fileName) => fileName !== name));
  }

  function downloadFile() {
    const blob = new Blob([name], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }
  const fileNameFormated = (
    <>
      {`${emoji} `}
      <a href="#" onClick={downloadFile}>
        {fileName}
      </a>
    </>
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.item}
    >
      <div className={styles.itemName}>{fileNameFormated}</div>
      <div className={styles.itemType}>{fileType}</div>
      <button className={styles.itemDel} onClick={deleteFile}>
        🗑️
      </button>
    </div>
  );
}
//
