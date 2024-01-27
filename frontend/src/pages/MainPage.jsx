import styles from "../../style.module.css";
import ItemList from "../components/ItemList";
import UploadZone from "../components/UploadZone";
import filesHandler from "../api/filesHandler";
import NavBar from "../components/navbar/NavBar";
import { useState, useEffect } from "react";

import { UserContext } from "../UserContext";

export default function MainPage({ user }) {
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    if (user) {
      const files = await filesHandler.fetchFiles(user);
      setFiles(files);
    }
  };

  useEffect(() => {
    getFiles();
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <NavBar user={user} />
      <div className={styles.All}>
        <h1 className={styles.Header}>File Buploader</h1>
        <UploadZone user={user} getFiles={getFiles} />
        <ItemList
          className={styles.Items}
          user={user}
          items={files}
          getFiles={getFiles}
        />
        <button className={styles.getFilesBtn} onClick={getFiles}>
          Refresh Files
        </button>
      </div>
    </UserContext.Provider>
  );
}
