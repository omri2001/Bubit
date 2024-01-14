import styles from "../../style.module.css";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import UploadZone from "../components/UploadZone";
import filesHandler from "../api/filesHandler";
import NavBar from "../components/NavBar";
import { useState } from "react";

import { UserContext } from "../UserContext";

export default function MainPage({ user }) {
  const [files, setFiles] = useState([]);

  const retriveFiles = async () => {
    const files = await filesHandler.fetchFiles(user);
    setFiles(files);
  };

  return (
    <UserContext.Provider value={user}>
      <NavBar user={user} />
      <div>
        <Header user={user} />
        <UploadZone user={user} getFiles={retriveFiles} />
        <ItemList items={files} getFiles={retriveFiles} />
        <button className={styles.getFilesBtn} onClick={retriveFiles}>
          Refresh Files
        </button>
      </div>
    </UserContext.Provider>
  );
}
