import React from "react";
import routes from "routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/bg-sign-in.jpeg";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
//import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { FormGroup } from "react-bootstrap";
import { Table, Form } from "react-bootstrap";
import { useEffect } from "react";

function Reservation() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch reservations data from your PostgreSQL database
    // Example fetch code
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/reservations");
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error("Failed to fetch reservations");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [searchSalle, setSearchSalle] = useState("");
  const [searchTaille, setSearchTaille] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filterDisponibilite, setFilterDisponibilite] = useState("");
  const [searchClub, setSearchClub] = useState("");
  const filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.num_salle.includes(searchSalle) &&
      reservation.taille.includes(searchTaille) &&
      reservation.date.includes(searchDate) &&
      (filterDisponibilite === "" ||
        (filterDisponibilite === "disponible" && reservation.disponibilite) ||
        (filterDisponibilite === "réservée" && !reservation.disponibilite)) &&
      reservation.club.includes(searchClub)
    );
  });
  const [showForm, setShowForm] = useState(false);
  const handleFiltrerClick = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={9} lg={9} xl={9}>
            <Card>
              <MKBox pt={4} pb={3} px={3}>
                <MKTypography
                  variant="h4"
                  fontWeight="medium"
                  color="textPrimary"
                  mt={1}
                  mb={3}
                  textAlign="center"
                >
                  Reservations
                </MKTypography>
                <div style={{ float: "left", width: "100%" }}>
                  <MKButton
                    variant="gradient"
                    color="error"
                    onClick={handleFiltrerClick}
                    size="small"
                    style={{ float: "left" }}
                  >
                    Filtrer
                  </MKButton>
                </div>
                {showForm && (
                  <Form>
                    <Form.Group controlId="formRoomNumber">
                      <Form.Label>Numero de salle: </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter le numero de salle"
                        value={searchSalle}
                        onChange={(e) => setSearchSalle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formTaille">
                      <Form.Label>Nombre de places: </Form.Label>
                      <Form.Control
                        type="number"
                        value={searchTaille}
                        onChange={(e) => setSearchTaille(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formDate">
                      <Form.Label>Date: </Form.Label>
                      <Form.Control
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formAvailability">
                      <Form.Label>Disponibilté: </Form.Label>
                      <Form.Control
                        as="select"
                        value={filterDisponibilite}
                        onChange={(e) => setFilterDisponibilite(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="disponible">disponible</option>
                        <option value="réservée">réservée</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="SearchClub">
                      <Form.Label>Club: </Form.Label>
                      <Form.Control
                        list="clubOptions"
                        type="text"
                        value={searchClub}
                        onChange={(e) => setSearchClub(e.target.value)}
                      ></Form.Control>
                      <datalist id="clubOptions">
                        <option value="Edge" />
                        <option value="Firefox" />
                        <option value="Chrome" />
                        <option value="Opera" />
                        <option value="Safari" />
                      </datalist>
                    </Form.Group>
                  </Form>
                )}
                <Table striped bordered hover style={{ borderSpacing: "40px 20px" }}>
                  <thead>
                    <tr>
                      <th>Numero de sallle</th>
                      <th>Nombre de places</th>
                      <th>Disponibilté</th>
                      <th>Date</th>
                      <th>Club</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((reservation, index) => (
                      <tr key={index}>
                        <td>{reservation.num_salle}</td>
                        <td>{reservation.taille}</td>
                        <td>{reservation.disponibilite ? "disponible" : "réservée"}</td>
                        <td>{reservation.date}</td>
                        <td>{reservation.club}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <MKButton
                  variant="gradient"
                  color="error"
                  onClick={() => navigate("/presentation")}
                  fullWidth
                >
                  Back to Presentation
                </MKButton>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Reservation;
