import Item from "./Item";
import styles from "../../style.module.css";

export default function DisplayBox({ files, setFiles, getFiles }) {
  const refreshFiles = () => {
    getFiles();
  };

  return (
    <div className={styles.displayBox}>
      {files.map((name) => (
        <Item
          key={name}
          name={name}
          setFiles={setFiles}
          files={files}
          getFiles={getFiles}
        ></Item>
      ))}
      <button className={styles.getFilesBtn} onClick={refreshFiles}>
        Get Files
      </button>
    </div>
  );
}
