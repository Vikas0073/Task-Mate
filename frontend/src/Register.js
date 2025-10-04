import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null); // for profile image
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!name || !pass || !email || !mobile) {
      alert("Please fill all fields");
      return;
    }

    try {
      const url = "http://localhost:4000/user/register";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("pass", pass);
      formData.append("email", email);
      formData.append("mobile", mobile);
      if (image) formData.append("image", image);

      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Registration Successful!");

      // Store full user object in localStorage
      localStorage.setItem("user", JSON.stringify(result.data.data));

      // Clear form
      setName("");
      setPass("");
      setEmail("");
      setMobile("");

      navigate("/login"); // redirect after registration
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: "30px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <center>
        <h1>Register User</h1>
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
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", margin: "10px 0", padding: "10px", width: "250px" }}
          />
          <input
            type="text"
            placeholder="Enter Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
            Register
          </button>
        </form>
      </center>
    </div>
  );
}

export default Register;
