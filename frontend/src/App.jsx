import Header from "./components/Header";
import ItemList from "./components/ItemList";
import UploadZone from "./components/UploadZone";
import styles from "../style.module.css";

import { useState } from "react";

function App() {
  const [files, setFiles] = useState([""]);

  const getFiles = () => {
    fetch("http://localhost:8000/files")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Problem with server-side");
        }
        return response.json();
      })
      .then((data) => {
        setFiles(data.files);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or parsing
        console.error(error);
      });
  };

  return (
    <div className="App">
      <Header />
      <UploadZone />
      <ItemList items={files} getFiles={getFiles} />
      <button className={styles.getFilesBtn} onClick={getFiles}>
        Refresh Files
      </button>
    </div>
  );
}

export default App;
