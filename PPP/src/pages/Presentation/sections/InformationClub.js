// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import ExampleCard from "../components/ExampleCard";
import Card from "@mui/material/Card";
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from "reactstrap";

// Images
import acm from "assets/images/clubs-logos/ACM-logo.jpg";
import ieee from "assets/images/clubs-logos/IEEE-logo.jpg";
import jei from "assets/images/clubs-logos/JEI-logo.jpg";
import aero from "assets/images/clubs-logos/Aerobotix-logo.jpg";
import jci from "assets/images/clubs-logos/JCI-logo.jpg";
import and from "assets/images/clubs-logos/Android-logo.jpg";
import sec from "assets/images/clubs-logos/Securinets-logo.jpg";
import tim from "assets/images/clubs-logos/Timun-logo.jpg";
import chess from "assets/images/clubs-logos/Chess-logo.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function InformationClub() {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  //const clubName = "JCI"; 
  const {name}=useParams(); 
  const clubName=name.toUpperCase();
  const [updateData, setUpdateData] = useState({
    date: "",
    workShopName: "",
    startTime: "",
    endTime: "",
    num_salle: "",
    trainer: ""
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
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
      window.location = `/Club/${clubName}`;
      ;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation:", error);
    }
  };
  const navigate = useNavigate();
  console.log(reservations);
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/club/getByName/${clubName}`);
        const data = await response.json();
        setClubData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchClubData();
  }, [clubName]);
  const openUpdateForm = (reservation) => {
    setShowUpdateForm(true);
    setUpdateData(reservation);
  };
  
  const deleteReservation = async (id) => {
    try {
      await fetch(`http://localhost:5000/reservation/delete/${id}`, {
        method: "DELETE",
      });
      setReservations(reservations.filter((reservation) => reservation.num_reservation !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getReservations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reservation/getByClub/${clubName}`);
      const jsondata = await response.json();
      setReservations(jsondata);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading club data: {error.message}</p>;

  const formatTime = (isoDate) => {
    if (!isoDate) return '';
    const timePart = isoDate.split('T')[1]; // Extraire la partie temporelle
    const [hours, minutes] = timePart.split(':'); // Séparer les heures et les minutes
    return `${hours}:${minutes}`;
  };

  const clubLogoMap = {
    ACM: acm,
    IEEE: ieee,
    JCI: jci
  };

  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} mt={10} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
          <ExampleCard  image={clubLogoMap[clubName]} />
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MKTypography variant="h4" color="dark" fontWeight="bold" mb={3}>
                  Name: {clubData.name}
                </MKTypography>
                <MKTypography variant="h4" color="dark" fontWeight="bold" mb={3}>
                  Foundation Year: {clubData.year}
                </MKTypography>
                <MKTypography variant="h4" color="dark" fontWeight="bold" mb={3}>
                  Email: {clubData.email}
                </MKTypography>
                <MKButton variant="gradient" color="info" onClick={() => navigate('/reserve')}>
                  Create a new reservation
                </MKButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={11} mt={5} sm={9} md={9} lg={9} xl={9}>
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
                <table className="table table-striped mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Class Number</th>
                      <th scope="col">Workshop Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Trainer</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation.reservation_id}>
                        <td>{reservation.num_salle}</td>
                        <td>{reservation.workShopName}</td>
                        <td>{reservation.date.split('T')[0]}</td>
                        <td>{formatTime(reservation.starttime)}</td>
                        <td>{formatTime(reservation.endtime)}</td>
                        <td>{reservation.trainer}</td>
                        <td>{reservation.statu}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => deleteReservation(reservation.num_reservation)}>
                            Delete
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-pastel" onClick={() => openUpdateForm(reservation)}>
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MKTypography>
            </MKBox>
          </Card>
        </Grid>
        <Modal isOpen={showUpdateForm} toggle={closeUpdateForm}>
        <ModalHeader toggle={closeUpdateForm}>Modify the reservation</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="date">Workshop Name</Label>
            <Input type="text" name="workShopName" id="workShopName" value={updateData.workShopName} onChange={(e) => setUpdateData({ ...updateData, workShopName: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input type="date" name="date" id="date" value={updateData.date} onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="startTime">Start Time</Label>
            <Input type="time" name="startTime" id="startTime" value={updateData.startTime} onChange={(e) => setUpdateData({ ...updateData, startTime: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="endTime">End Time</Label>
            <Input type="time" name="endTime" id="endTime" value={updateData.endTime} onChange={(e) => setUpdateData({ ...updateData, endTime: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="endTime">Trainer</Label>
            <Input type="text" name="trainer" id="trainer" value={updateData.trainer} onChange={(e) => setUpdateData({ ...updateData, trainer: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="num_salle">Class Number</Label>
            <Input type="text" name="num_salle" id="num_salle" value={updateData.num_salle} onChange={(e) => setUpdateData({ ...updateData, num_salle: e.target.value })} />
          </FormGroup>
          <Button color="primary" onClick={handleSubmitUpdate}>SAVE</Button>{' '}
          <Button color="secondary" onClick={closeUpdateForm}>CANCEL</Button>
        </ModalBody>
      </Modal>
      </Container>
    </MKBox>
  );
}

export default InformationClub;
