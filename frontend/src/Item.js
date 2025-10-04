import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from "mdb-react-ui-kit";

function Item() {
  const location = useLocation();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/worker/" + location.state)
      .then((res) => res.json())
      .then((data) => setWorker(data))
      .catch((err) => console.error(err));
  }, [location.state]);

  if (!worker) return <h2>Loading...</h2>;

  return (
    <div>
      <center>
        <MDBCard style={{ margin: "50px", width: "400px" }}>
          <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
            <MDBCardImage
              src={worker.image}
              fluid
              alt={worker.name}
              style={{ width: "200px", height: "200px", marginTop: "10px" }}
            />
            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
          </MDBRipple>
          <MDBCardBody>
            <MDBCardTitle style={{ fontSize: "30px", color: "red" }}>{worker.name}</MDBCardTitle>
            <MDBCardTitle style={{ fontSize: "25px", color: "blue" }}>{worker.skills}</MDBCardTitle>
            <MDBCardText>
              Mobile: {worker.mobile} <br />
              Email: {worker.email} <br />
              Availability: {worker.availability} <br />
              Experience: {worker.experience} <br />
              Address: {worker.address}
            </MDBCardText>
            <MDBBtn href="#">Book Now</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </center>
    </div>
  );
}

export default Item;
