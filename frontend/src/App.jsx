import Header from "./components/Header";
import DisplayBox from "./components/DisplayBox";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

const getFiles = () => {
  return [
    "hello.txt",
    "hey.txt",
    "omri.zip",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.zip",
  ];
};

function App() {
  const [files, setFiles] = useState(getFiles());

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <DisplayBox files={files} setFiles={setFiles} getFiles={getFiles} />
      </div>
    </BrowserRouter>
  );
}

export default App;
