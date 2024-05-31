import React, { useEffect, Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
//import MKSocialButton from "components/MKSocialButton";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, FormText, NavLink} from "reactstrap";
import "./PopStyle.css";

const ListReservations = () => {
  //update
  const [showPopup, setShowPopup] = useState(false);
  const [updateData, setUpdateData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    roomName: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  // Open update form
  const openUpdateForm = (reservation) => {
    setShowUpdateForm(true);
    setUpdateData(reservation);
  };

  // Close update form
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

    // Fonction pour gérer la soumission du formulaire de mise à jour
    const handleSubmitUpdate = async () => {
        try {
            // Envoi de la requête PUT au backend avec les nouvelles données de réservation
            await fetch(`http://localhost:5000/reservation/update/${updateData.reservation_id}`, {
                method: 'PUT', // Utilisez la méthode PUT pour la mise à jour
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            // Fermer le popup après la mise à jour
            closeUpdateForm();
            window.location = "/reservation";
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réservation:', error);
        }
    };
    //filtrage 
    const [date, setDate] = useState('');
    const [Starttime, setStartTime] = useState('');
    const [Endtime, setEndTime] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

  const handleFilter = () => {
    // Pass the filter criteria to the parent component
    onFilter({ date, time, name, room });
  };

  const [Reservations, setReservations] = useState([]);
  const deleteReservation = async (id) => {
    try {
      const deleteReservation = await fetch(`http://localhost:5000/reservation/update/${id}`, {
        method: "DELETE",
      });
      setReservations(Reservations.filter(Reservation => Reservation.reservation_id !== id));
      } catch (err) {
            console.error(err.message);
        }
    }

    const getReservations = async () => {
        try {
            const response = await fetch("http://localhost:5000/reservation/get")
            const jsondata = await response.json();
            setReservations(jsondata);

        } catch (err) {
            console.error(err.message);

        }
    }
    useEffect(() => {
        getReservations();
    }, []);

    const handleAccept = async (reservation) => {
        try {
          await fetch(`http://localhost:5000/reservation/accept`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationId: reservation.reservation_id, clubEmail: reservation.clubemail }),
          });
          alert("Acceptance email sent!");
        } catch (error) {
          console.error('Error sending acceptance email:', error);
        }
      };

    return (
        <>
            <Container >
                <DefaultNavbar routes={routes} transparent light />
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
                                    <MKTypography variant="h4" fontWeight="medium" color="white" >
                                        FILTRER
                                    </MKTypography>
                                </MKBox>
                                <MKBox
                                    textAlign="center"
                                >

                                    <label>Date:</label>
                                    <MKInput
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}

                                    />

                                    <label> Start Time:</label>
                                    <MKInput
                                        type="time"
                                        value={Starttime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                    <label> End Time:</label>
                                    <MKInput
                                        type="time"
                                        value={Endtime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                    <label>Club Name:</label>
                                    <MKInput
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <MKInput list="browsers" />

                                    <MKBox mt={4} mb={1}>
                                        <MKButton type="submit" variant="gradient" color="error" onClick={handleFilter}>Apply Filter</MKButton>
                                    </MKBox>
                                </MKBox>
                            </Card>
                        </Grid>
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
                                        <table className="table table-striped mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col">class Name</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start time </th>
                                                    <th scope="col">End time </th>
                                                    <th scope="col">club Name </th>
                                                </tr>
                                            </thead>
                                            {Reservations.map(Reservation => (
                                                <tr key={Reservation.Reservation_id}>
                                                    <td>{Reservation.roomname}</td>
                                                    <td>{Reservation.date.split('T')[0]}</td>
                                                    <td>{Reservation.starttime}</td>
                                                    <td>{Reservation.endtime}</td>
                                                    <td>{Reservation.clubname}</td>
                                                    <td><button className="btn btn-danger" onClick={() => deleteReservation(Reservation.reservation_id)}>Delete</button></td>
                                                    <td>
                                                        <button className="btn btn-pastel" onClick={() => openUpdateForm(Reservation)} >UPDATE</button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleAccept(Reservation)}>Accept</button>
                                                    </td>

                                                </tr>
                                            ))}
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
             {/* Update form */}
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
                        <Label for="roomName">Nom du salle</Label>
                        <Input type="text" name="roomName" id="roomName" value={updateData.roomName} onChange={(e) => setUpdateData({ ...updateData, roomName: e.target.value })} />
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmitUpdate}>Enregistrer</Button>{' '}
                    <Button color="secondary" onClick={closeUpdateForm}>Annuler</Button>
                </ModalBody>
            </Modal>
                       
        </>
    )
};
export default ListReservations;
