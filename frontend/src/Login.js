import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!name || !pass) {
      alert("Please fill all fields");
      return;
    }

    try {
      const url = "http://localhost:4000/user/login";
      const payload = { name, pass };

      const result = await axios.post(url, payload);

      if (result.data.message === "User login successful") {
        // Store user object in localStorage without image
        localStorage.setItem("user", JSON.stringify({
          name: result.data.data.name,
          email: result.data.data.email,
          mobile: result.data.data.mobile
        }));
        navigate("/upload"); // redirect after login
      } else {
        alert(result.data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Network or server error");
    }
  };

  return (
    <div style={{ padding: "30px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <center>
        <h1>Login</h1>
        <form
          onSubmit={submitForm}
          style={{
            display: "inline-block",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          }}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "10px", width: "250px" }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "10px", width: "250px" }}
          />
          <button
            type="submit"
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </center>
    </div>
  );
}

export default Login;
