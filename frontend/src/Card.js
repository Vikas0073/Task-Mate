import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn
} from "mdb-react-ui-kit";

function Card() {
  const [apidata, setData] = useState([]);
  const [count, setCount] = useState(0);

  const fetchCards = () => {
    axios.get("http://localhost:4000/wrk/card")
      .then(res => {
        setData(res.data);
        setCount(res.data.length);
      })
      .catch(err => console.error("Failed to fetch cards:", err));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const deleteCard = (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    axios.delete(`http://localhost:4000/wrk/card/${id}`)
      .then(res => {
        alert(res.data.message);
        fetchCards(); // refresh list
      })
      .catch(err => console.error("Failed to delete card:", err));
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <center>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>My Helpers</h2>
      </center>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {apidata.map((item) => (
          <MDBCard
            key={item._id}
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <MDBRow className="g-0">
              <MDBCol md="4" style={{ padding: "10px" }}>
                <MDBCardImage
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  fluid
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle style={{ fontSize: "24px", color: "#ff4d4d", fontWeight: "600" }}>
                    {item.name}
                  </MDBCardTitle>
                  <MDBCardText style={{ fontSize: "14px", color: "#555" }}>
                    <strong>Skills:</strong> {item.skills}<br />
                    <strong>Mobile:</strong> {item.mobile}<br />
                    <strong>Email:</strong> {item.email}<br />
                    <strong>Availability:</strong> {item.availability}<br />
                    <strong>Experience:</strong> {item.experience}<br />
                    <strong>Address:</strong> {item.address}
                  </MDBCardText>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <MDBBtn color="primary">Book Now</MDBBtn>
                    <MDBBtn color="danger" onClick={() => deleteCard(item._id)}>Remove</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        ))}
      </div>
      <center style={{ marginTop: "30px" }}>
        <h3>Total Helpers: {count}</h3>
      </center>
    </div>
  );
}

export default Card;
