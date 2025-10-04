import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBBadge
} from "mdb-react-ui-kit";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/worker")
      .then((res) => res.json())
      .then((data) => setWorkers(data))
      .catch((err) => console.error("Error fetching workers:", err));
  }, []);

  function viewWorker(_id) {
    navigate("/item", { state: _id });
  }

  function addToCard(worker) {
    axios
      .post("http://localhost:4000/wrk/card", worker)
      .then(() => alert("Added to card successfully"))
      .catch((err) => console.error(err));
  }

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#2c0213" }}>
        Our Community Helpers
      </h2>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {workers.map((worker) => (
          <MDBCol key={worker._id}>
            <MDBCard
              className="h-100 shadow-sm"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                backgroundColor: "#fff",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ backgroundColor: "#2c0213", padding: "20px 0" }}>
                <MDBCardImage
                  src={worker.image || "https://via.placeholder.com/150"}
                  alt={worker.name}
                  position="top"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #fff",
                    margin: "auto",
                    display: "block",
                  }}
                />
              </div>
              <MDBCardBody style={{ textAlign: "center", padding: "20px" }}>
                <MDBCardTitle
                  style={{ fontSize: "22px", fontWeight: "700", color: "#2c0213" }}
                >
                  {worker.name}
                </MDBCardTitle>
                <MDBCardText style={{ fontSize: "16px", color: "#007bff", fontWeight: "500" }}>
                  {worker.skills}
                </MDBCardText>
                <MDBBadge color={worker.availability === "Available" ? "success" : "danger"} pill>
                  {worker.availability}
                </MDBBadge>

                <hr style={{ margin: "15px 0" }} />

                <MDBCardText style={{ fontSize: "14px", color: "#555", textAlign: "left" }}>
                  <strong>📞 Mobile:</strong> {worker.mobile} <br />
                  <strong>📧 Email:</strong> {worker.email} <br />
                  <strong>💼 Experience:</strong> {worker.experience} <br />
                  <strong>📍 Address:</strong> {worker.address}
                </MDBCardText>

                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                  <MDBBtn color="primary" size="sm" onClick={() => viewWorker(worker._id)}>
                    View Profile
                  </MDBBtn>
                  <MDBBtn color="success" size="sm" onClick={() => addToCard(worker)}>
                    Add to Card
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <Footer />
    </div>
  );
}

export default Home;
