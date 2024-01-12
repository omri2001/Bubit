import styles from "../../style.module.css";

export default function LoginModal({ setLogged, setUser }) {
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: uname.value, password: pass.value }),
    })
      .then((response) => {
        if (response.status === 401) {
          window.alert("invalid login entered");
          throw new Error("Invalid username");
        } else if (!response.ok) {
          console.log(response);
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setLogged(true);
          setUser(uname.value);
        }
      });
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div>
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
