import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from "reactstrap";
import "./PopStyle.css";

const ListReservations = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [updateData, setUpdateData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    num_salle: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [filterData, setFilterData] = useState({
    date: "",
    startTime: "",
    clubname: "",
    num_salle: "",
    statu: "",
  });

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [clubname, setClubname] = useState("");
  const [numSalle, setNumSalle] = useState("");
  const [statu, setStatu] = useState("");
  const [email, setEmail] = useState("");
  const [workShopName, setworkShopName] = useState("");
  const [Reservations, setReservations] = useState([]);

  const openUpdateForm = (reservation) => {
    setShowUpdateForm(true);
    setUpdateData(reservation);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/reservation/update/${updateData.num_reservation}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      closeUpdateForm();
      window.location = "/reservation";
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
    }
  };

  const handleFilter = async () => {
    try {
      await fetch(`http://localhost:5000/filtrage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });
      window.location = "/reservation";
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await fetch(`http://localhost:5000/reservation/decline/${id}`, {
        method: "POST",
      });
      setReservations(Reservations.filter((Reservation) => Reservation.num_reservation !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const acceptReservation = async (id, clubEmail) => {
    try {
      await fetch(`http://localhost:5000/reservation/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, clubEmail }),
      });
      console.log(clubEmail);
      setReservations(Reservations.filter((Reservation) => Reservation.num_reservation !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getReservations = async () => {
    try {
      const response = await fetch("http://localhost:5000/reservation/get");
      const jsonData = await response.json();
      setReservations(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  
  useEffect(() => {
    getReservations();
  }, []);

  const formatTime = (isoDate) => {
    if (!isoDate) return '';
    const timePart = isoDate.split('T')[1]; // Extraire la partie temporelle
    const [hours, minutes] = timePart.split(':'); // Séparer les heures et les minutes
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <Container>
        <DefaultNavbar routes={routes} />
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" style={{ top: '100px' }}>
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={10}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="error"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={10}
                  textAlign="center"
                >
                  <MKTypography variant="h4" fontWeight="medium" color="white">
                    FILTRER
                  </MKTypography>
                </MKBox>
                <MKBox textAlign="center">
                  <label>Date:</label>
                  <MKInput
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label> Start Time:</label>
                  <MKInput
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <label> End Time:</label>
                  <MKInput
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <label>Club Name:</label>
                  <MKInput
                    type="text"
                    value={clubname}
                    onChange={(e) => setClubname(e.target.value)}
                  />
                  <label>Class Number</label>
                  <MKInput
                    type="text"
                    value={numSalle}
                    onChange={(e) => setNumSalle(e.target.value)}
                  />
                  <label>Status :</label>
                  <MKInput
                    type="text"
                    value={statu}
                    onChange={(e) => setStatu(e.target.value)}
                  />
                  <MKBox mt={4} mb={1}>
                    <MKButton type="submit" variant="gradient" color="error" onClick={handleFilter}>Apply Filter</MKButton>
                  </MKBox>
                </MKBox>
              </Card>
            </Grid>
            <Grid item >
              <Card>
                <MKBox>
                  <MKTypography
                    variant="h4"
                    fontWeight="medium"
                    color="textPrimary"
                    mt={1}
                    mb={3}
                    textAlign="center"
                  >
                    <table className="table table-striped mt-5">
                      <thead>
                        <tr>
                          <th scope="col">Class Number</th>
                          <th scope="col">Workshop Name</th>
                          <th scope="col">Date</th>
                          <th scope="col">Start time</th>
                          <th scope="col">End time</th>
                          <th scope="col">Club Name</th>
                          <th scope="col">Status</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Reservations.map((Reservation) => (
                          <tr key={Reservation.num_reservation}>
                            <td>{Reservation.num_salle}</td>
                            <td>{Reservation.workShopName}</td>
                            <td>{Reservation.date.split('T')[0]}</td>
                            <td>{formatTime(Reservation.starttime)}</td>
                            <td>{formatTime(Reservation.endtime)}</td>
                            <td>{Reservation.clubname}</td>
                            <td>{Reservation.statu}</td>
                            <td>{Reservation.email}</td>
                            <td>
                              <button className="btn btn-vet" onClick={() => acceptReservation(Reservation.num_reservation, Reservation.email)}>ACCEPT</button>
                            </td>
                            <td><button className="btn btn-danger" onClick={() => declineReservation(Reservation.num_reservation)}>DECLINE</button></td>
                            <td>
                              <button className="btn btn-pastel" onClick={() => openUpdateForm(Reservation)}>UPDATE</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </MKTypography>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </Container>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Popup</h2>
            <p>Ceci est une popup.</p>
          </div>
        </div>
      )}
      <Modal isOpen={showUpdateForm} toggle={closeUpdateForm}>
        <ModalHeader toggle={closeUpdateForm}>Modifier la réservation</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input type="date" name="date" id="date" value={updateData.date} onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="startTime">Heure de début</Label>
            <Input type="time" name="startTime" id="startTime" value={updateData.startTime} onChange={(e) => setUpdateData({ ...updateData, startTime: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="endTime">Heure de fin</Label>
            <Input type="time" name="endTime" id="endTime" value={updateData.endTime} onChange={(e) => setUpdateData({ ...updateData, endTime: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="num_salle">Numéro de la salle</Label>
            <Input type="text" name="num_salle" id="num_salle" value={updateData.num_salle} onChange={(e) => setUpdateData({ ...updateData, num_salle: e.target.value })} />
          </FormGroup>
          <Button color="primary" onClick={handleSubmitUpdate}>SAVE</Button>{' '}
          <Button color="secondary" onClick={closeUpdateForm}>CANCEL</Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ListReservations;
