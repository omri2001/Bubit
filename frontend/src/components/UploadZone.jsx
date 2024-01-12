import { useState } from "react";
import styles from "../../style.module.css";
import { DropzoneArea } from "material-ui-dropzone";
import filesHandler from "../api/filesHandler";

export default function UploadZone({ user, getFiles }) {
  const [uploadedFiles, setUploadFiles] = useState([]);

  const hasFilesToUpload = uploadedFiles.length != 0;

  function UploadFiles() {
    const formData = new FormData();
    uploadedFiles.map((file) => {
      formData.append("files", file);
    });
    filesHandler.uploadFiles(formData, user);
    getFiles();
  }

  return (
    <div className={styles.uploadZone}>
      <DropzoneArea onChange={(files) => setUploadFiles(files)} />
      <button disabled={!hasFilesToUpload} onClick={UploadFiles}>
        Submit
      </button>
    </div>
  );
}
