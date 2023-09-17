import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../style.module.css";

export default function Item({ name, setFiles, files, getFiles }) {
  const [isHovered, setIsHovered] = useState(false);
  const emoji = isHovered ? "📂" : "📁";
  const binaryType = "file";

  let fileType = name.split(".")[1];
  fileType = fileType ? `.${fileType}` : binaryType;
  const fileName = name.split(".")[0];

  function deleteFile() {
    fetch(`http://localhost:8000/delete/${name}`, { method: "POST" });
    getFiles();
  }

  function downloadFile() {
    fetch(`http://localhost:8000/get/${name}`, { method: "POST" })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.click();
        URL.revokeObjectURL(url);
      });
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
