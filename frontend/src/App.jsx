import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  const [logged, setLogged] = useState("");
  const [user, setUser] = useState("");

  return (
    <div className="App">
      {logged ? (
        <MainPage user={user} />
      ) : (
        <LoginPage setLogged={setLogged} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
