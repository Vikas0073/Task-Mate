   import axios from "axios";
   import { useState, useEffect } from "react";

   function Upload() {
   const [name, setName] = useState("");
   const [skills, setSkills] = useState("");
   const [mobile, setMobile] = useState("");
   const [email, setEmail] = useState("");
   const [availability, setAvailability] = useState("");
   const [experience, setExperience] = useState("");
   const [address, setAddress] = useState("");
   const [image, setImage] = useState(null);

   const [workers, setWorkers] = useState([]);
   const [editingId, setEditingId] = useState(null); // track which worker is being edited

   useEffect(() => {
      fetchWorkers();
   }, []);

   const fetchWorkers = async () => {
      try {
         const res = await axios.get("http://localhost:4000/worker");
         setWorkers(res.data);
      } catch (err) {
         console.error("Failed to fetch workers:", err);
      }
   };

   const submitForm = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("skills", skills);
      formData.append("mobile", mobile);
      formData.append("email", email);
      formData.append("availability", availability);
      formData.append("experience", experience);
      formData.append("address", address);
      if (image) formData.append("image", image);

      try {
         if (editingId) {
         // Edit existing worker
         await axios.put(`http://localhost:4000/worker/${editingId}`, formData);
         alert("Worker updated successfully");
         setEditingId(null);
         } else {
         // Add new worker
         await axios.post("http://localhost:4000/worker", formData);
         alert("Worker uploaded successfully");
         }

         // Reset form
         setName(""); setSkills(""); setMobile(""); setEmail(""); setAvailability("");
         setExperience(""); setAddress(""); setImage(null);

         fetchWorkers();
      } catch (err) {
         console.error("Upload failed:", err);
         alert("Failed to submit. Try again.");
      }
   };

   const deleteWorker = async (id) => {
      if (!window.confirm("Are you sure you want to delete this worker?")) return;
      try {
         await axios.delete(`http://localhost:4000/worker/${id}`);
         alert("Worker deleted successfully");
         fetchWorkers();
      } catch (err) {
         console.error("Delete failed:", err);
         alert("Failed to delete worker");
      }
   };

   const editWorker = (worker) => {
      setName(worker.name);
      setSkills(worker.skills);
      setMobile(worker.mobile);
      setEmail(worker.email);
      setAvailability(worker.availability);
      setExperience(worker.experience);
      setAddress(worker.address);
      setEditingId(worker._id);
   };

   return (
      <div style={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
         <center>
         <h1>{editingId ? "Edit Worker" : "Upload Worker / Product"}</h1>
         <form
            onSubmit={submitForm}
            style={{
               display: "inline-block",
               padding: "20px",
               backgroundColor: "#fff",
               borderRadius: "12px",
               boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
               marginBottom: "20px",
            }}
         >
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Skills / Category" value={skills} onChange={(e) => setSkills(e.target.value)} required style={inputStyle} />
            <input type="number" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required style={inputStyle} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} required style={inputStyle} />
            <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={{...inputStyle, height: "80px"}} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ margin: "10px 0" }} />
            <button type="submit" style={buttonStyle}>{editingId ? "Update Worker" : "Upload Worker"}</button>
         </form>

         {/* Worker list */}
         <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {workers.map(worker => (
               <div key={worker._id} style={cardStyle}>
               <img src={worker.image || "https://via.placeholder.com/300x200"} alt={worker.name} style={imgStyle} />
               <div style={{ padding: "10px" }}>
                  <h3 style={{ margin: "0 0 5px 0", color: "#007bff" }}>{worker.name}</h3>
                  <p style={{ margin: "2px 0" }}>Skills: {worker.skills}</p>
                  <p style={{ margin: "2px 0" }}>Mobile: {worker.mobile}</p>
                  <p style={{ margin: "2px 0" }}>Email: {worker.email}</p>
                  <p style={{ margin: "2px 0" }}>Availability: {worker.availability}</p>
                  <p style={{ margin: "2px 0" }}>Experience: {worker.experience}</p>
                  <p style={{ margin: "2px 0" }}>Address: {worker.address}</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                     <button onClick={() => editWorker(worker)} style={{ ...buttonStyle, backgroundColor: "#ffc107" }}>Edit</button>
                     <button onClick={() => deleteWorker(worker._id)} style={{ ...buttonStyle, backgroundColor: "#dc3545" }}>Delete</button>
                  </div>
               </div>
               </div>
            ))}
         </div>
         </center>
      </div>
   );
   }

   const inputStyle = {
   margin: "10px 0",
   padding: "12px",
   borderRadius: "8px",
   border: "1px solid #ccc",
   fontSize: "16px",
   width: "100%",
   };

   const buttonStyle = {
   padding: "12px",
   color: "#fff",
   backgroundColor:"#350505ff",
   border: "none",
   borderRadius: "8px",
   cursor: "pointer",
   width: "100%",
   fontWeight: "bold",
   };

   const cardStyle = {
   width: "280px",
   backgroundColor: "#fff",
   borderRadius: "12px",
   boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
   overflow: "hidden",
   };

   const imgStyle = {
   width: "100%",
   height: "180px",
   objectFit: "cover",
   };

   export default Upload;
