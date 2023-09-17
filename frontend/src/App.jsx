import Header from "./components/Header";
import DisplayBox from "./components/DisplayBox";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [files, setFiles] = useState([""]);

  const getFiles = () => {
    fetch("http://localhost:8000/files")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFiles(data.files);
      });
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <DisplayBox files={files} setFiles={setFiles} getFiles={getFiles} />
      </BrowserRouter>
    </div>
  );
}

export default App;
