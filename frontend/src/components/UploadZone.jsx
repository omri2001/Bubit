import { useState } from "react";
import styles from "../../style.module.css";
import { DropzoneArea } from "material-ui-dropzone";

export default function UploadZone({ getFiles }) {
  const [uploadFiles, setUploadFiles] = useState([]);

  function UploadFiles() {
    if (uploadFiles.length == 0) {
      console.log("no files selected");
      return;
    }
    const formData = new FormData();
    uploadFiles.map((file) => {
      formData.append("file", file);
    });

    fetch("http://localhost:8000/upload/", { method: "POST", body: formData });
    getFiles();
  }

  return (
    <div className={styles.uploadZone}>
      <DropzoneArea onChange={(files) => setUploadFiles(files)} />
      <button onClick={UploadFiles}>Submit</button>
    </div>
  );
}
