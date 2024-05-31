import React from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { useState,useEffect } from "react";
import { Container } from "reactstrap";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

import { TextField, Button, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles.css';

import routes from "routes";
import photo1 from "assets/images/bureauclub/jci/eya.jpg";
import photo2 from "assets/images/bureauclub/jci/idris.jpg";
import photo3 from "assets/images/bureauclub/jci/syrin.jpg";
import photo4 from "assets/images/bureauclub/jci/mawada.jpg";
import photo5 from "assets/images/bureauclub/jci/mbt.jpg";
import bgFront from "assets/images/bureauclub/jci/jci1.jpg";
import bgBack from "assets/images/bureauclub/jci/jci2.png";
import video from "assets/images/bureauclub/jci/video1.mp4";
import video1 from "assets/images/bureauclub/annimation.mp4";
import bg from "assets/images/bureauclub/jci/JCI.png"

const photos = [
    { src: photo1, name: 'Président', contact: 'eya.garraoui@insat.ucar.tn' },
    { src: photo2, name: 'SG', contact: 'idris.saadi@insat.ucar.tn' },
    { src: photo3, name: 'VPPRE', contact: 'syrine.hammemi@insat.ucar.tn' },
    { src: photo4, name: 'VPFD', contact: 'mawada.bennacer@insat.ucar.tn' },
    { src: photo5, name: 'Tresorier', contact: 'mariem.bentaous@insat.ucar.tn' }
];
const theme = createTheme();
function JciInBasic() {
  const [Reservations, setReservations] = useState([]);
  const getReservations = async () => {
    try {
        const response = await fetch("http://localhost:5000/reservation/getByClub/JCI")
        const jsondata = await response.json();
        setReservations(jsondata);

    } catch (err) {
        console.error(err.message);

    }
}
useEffect(() => {
    getReservations();
}, []);
//contact us
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Ajoutez ici la logique pour soumettre le formulaire
  console.log(formData);
};
    return (
        <>
           <div style={{ position: 'relative', width: '100%', height: '400vh', overflow: 'hidden' }}>
      <DefaultNavbar routes={routes} transparent light />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, width: '100%', height: '100%' }}>
        <video autoPlay loop muted style={{ minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }}>
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />  
  
                    <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2} mt={10}>
                        <Grid container spacing={1} justifyContent="center" alignItems="flex-start" height="100%">
                            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                                <MKBox
                                    variant="gradient"
                                    bgColor="blue"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                    mx={-60}
                                    mt={2}
                                    p={3}
                                    mb={1}
                                    textAlign="center"
                                >
                                    <MKTypography variant="h1" color="blue" mb={4} mt={10}>
                                        J C I INSAT Tunis
                                    </MKTypography>
                                    <MKTypography variant="h1" color="blue" mb={4}>
                                        Le Bureau Executif de l'année 2023/2024
                                    </MKTypography>
                                    <MKBox
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        flexWrap="wrap"
                                        sx={{ position: 'relative', width: '100%', marginBottom: '2rem' }}
                                    >
                                        {photos.map((photo, index) => (
                                            <MKBox
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    marginLeft: `${index * 10}px`,
                                                    marginBottom: '2rem'
                                                }}
                                            >
                                                <MKBox
                                                    component="img"
                                                    src={photo.src}
                                                    alt={photo.name}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        borderRadius: '50%',
                                                        border: '3px solid white',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        marginBottom: 1
                                                    }}
                                                />
                                                <MKTypography variant="h6" color="textPrimary">
                                                    {photo.name}
                                                </MKTypography>
                                                <MKTypography variant="body2" color="textSecondary">
                                                    {photo.contact}
                                                </MKTypography>
                                            </MKBox>
                                        ))}
                                    </MKBox>
                                    <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
                                        <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                                            <RotatingCard>
                                                <RotatingCardFront
                                                    image={bgFront}
                                                    icon="touch_app"
                                                    color=""
                                                    title={
                                                        <>
                                                            Notre mission
                                                        </>
                                                    }
                                                    description="Offrir aux jeunes leaders des opportunités de développement du leadership en leur donnant la capacité de créer des changements positifs.. "
                                                />
                                                <RotatingCardBack
                                                    image={bgBack}
                                                    color=""
                                                    title="Notre vision"
                                                    description=" Être le principal réseau mondial de jeunes Leaders."
                                                />
                                            </RotatingCard>
                                        </Grid>
                                        <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>

                                            We are a Local JCI Organization in Tunisia (area A), founded in 2011.
                                            Our members are usually INSAT students who want to create positive change in their community and develop their technical and social skills.​
                                            INSAT is The National Institute of Applied Sciences and Technology, a Tunisian institute that is affiliated with the University of Carthage. Admission is very competitive and generally, students must hold a very good GPA on the national exam to be admitted.
                                            <br />
                                            <br />
                                            Check out our news
                                            <br />
                                            <MKSocialButton
                                                component="a"
                                                href="https://www.facebook.com/JCIINSAT/"
                                                target="_blank"
                                                color="facebook"
                                                sx={{ mr: 1 }}
                                            >
                                                <i className="fab fa-facebook" />
                                                &nbsp;
                                            </MKSocialButton>
                                            <MKSocialButton
                                                component="a"
                                                href="https://www.instagram.com/jci.insat.tunis/"
                                                target="_blank"
                                                color="instagram"
                                                sx={{ mr: 1 }}
                                            >
                                                <i className="fab fa-instagram" />
                                                &nbsp;
                                            </MKSocialButton>
                                            <MKSocialButton
                                                component="a"
                                                href="https://www.linkedin.com/company/jci-insat-tunis/"
                                                target="_blank"
                                                color="linkedin"
                                                sx={{ mr: 1 }}
                                            >
                                                <i className="fab fa-linkedin" />
                                                &nbsp;
                                            </MKSocialButton>
                                        </Grid>

                                        <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                                            Our project Ecovibes Summit for greener INSAT has been selected first nationally and among the TOP 3 in the category
                                            of best local project of global goals during the Africa and Middle East Conference! ✨✨💙💙
                                        </Grid>
                                        <Grid item xs={12} lg={7} mt={20} sx={{ ml: "auto" }}>
                                            <video width="500" height="340" controls autoPlay>
                                                <source src={video} type="video/mp4" />
                                            </video>
                                        </Grid>
                                        <Grid container item xs={11} spacing={2} lg={4} mt={10} alignItems="center" sx={{ mx: "auto" }}>
                                            ✨ Don't miss the opportunity and join us in our next events and workshops ✨
                                        </Grid>
                                        <table className="table table-striped mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col">workshop</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start time</th>
                                                    <th scope="col">End time</th>
                                                    <th scope="col">Trainer Name</th>
                                                    <th scope="col">Description</th>
                                                </tr>
                                            </thead>
                                            {Reservations.map(Reservation => (
                                                <tr key={Reservation._id}>
                                                    <td>{Reservation.workShopName}</td>
                                                    <td>{Reservation.date.split('T')[0]}</td>
                                                    <td>{Reservation.starttime.split('T')[0]}</td>
                                                    <td>{Reservation.endtime.split('T')[0]}</td>
                                                    <td>{Reservation.num_salle}</td>
                                                    <td>{Reservation.trainer}</td>
                                                    <td>{Reservation.description}</td>
                                                </tr>
                                            ))}
                              
                                        </table>
                                        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" className="App">
        <Box className="contact-form-container">
          <Typography component="h1" variant="h5" className="contact-form-title">
            Contact Us
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="contact-form-field">
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} className="contact-form-field">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} className="contact-form-field">
                <TextField
                  required
                  fullWidth
                  id="message"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="contact-form-button"
            >
              Send Message
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
                                    </Grid>
                                </MKBox>
                            </Grid>
                        </Grid>
                    </MKBox>
                    </div>
        </>
    );
}

export default JciInBasic;

