import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { Container } from "reactstrap";
import MKSocialButton from "components/MKSocialButton"
// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

// Material Kit 2 React page layout routes
import routes from "routes";
import { Facebook, Instagram } from 'bootstrap-icons-react';

// Images
import photo1 from "assets/images/bureauclub/ACM/karim.png";
import photo2 from "assets/images/bureauclub/ACM/ahmed.png";
import photo3 from "assets/images/bureauclub/ACM/ines.png";
import photo4 from "assets/images/bureauclub/ACM/rim.png";
import bgFront from "assets/images/bureauclub/ACM/ACM2.png";
import bgBack from "assets/images/bureauclub/ACM/ACM1.png";
import photo from "assets/images/bureauclub/ACM/eventacm.png"

const photos = [
  { src: photo1, name: 'Président', contact: 'karim@insat.ucar.tn' },
  { src: photo2, name: 'RL', contact: 'ahmed@insat.ucar.tn' },
  { src: photo3, name: 'Tresorier', contact: 'ines@insat.ucar.tn' },
  { src: photo4, name: 'RH', contact: 'rim@insat.ucar.tn' }
];

function AcmInBasic() {

  const [Reservations, setReservations] = useState([]);
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


  return (
    <>
     
      <Container>
     
      <DefaultNavbar routes={routes} transparent light />
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
              mt={2} // Adjusted margin-top to move the box higher
              p={3} // Adjusted padding to make the box smaller
              mb={1}
              textAlign="center"
            >
              <MKTypography variant="h1" color="blue" mb={4} mt={10}>
              INSAT ACM Student Chapter
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
                    mt={20}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      marginLeft: `${index * 10}px`,
                      marginBottom: '2rem' // Added margin-bottom to space out the images
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
                         Nos Objectifs
                        </>
                      }
                      description="Offrir des opportunités d'apprentissage à travers des ateliers, des séminaires, et des conférences sur divers sujets en informatique. "
                    />
                    <RotatingCardBack
                      image={bgBack}
                      color=""
                      title="ACM"
                      description=" En organisant des événements diversifiés et en fournissant des ressources précieuses, il aide les étudiants à se préparer pour leurs futures carrières et à contribuer de manière significative au domaine de l'informatique."
                    />
                  </RotatingCard>
                </Grid>
                <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
                        
                ACM (Association for Computing Machinery) INSAT Tunis is the student chapter of the ACM at the National Institute of Applied Science and Technology (INSAT) in Tunis, Tunisia. 
                This chapter is part of a global network of ACM student chapters that aim to promote computer science and IT education, foster professional development, and provide networking 
                opportunities for students.
                          <br />
                          <br />
                          Check out our news
                          <br />
                          <MKSocialButton
                  component="a"
                  href="https://www.facebook.com/insatacm/"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.instagram.com/acm_insat_sc/"
                  target="_blank"
                  color="instagram"
                  sx={{ mr: 1 }}
                >
                <i className="fab fa-instagram" />
                  &nbsp;
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.linkedin.com/company/insatacm/?originalSubdomain=fr"
                  target="_blank"
                  color="linkedin"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-linkedin" />
                  &nbsp;
                </MKSocialButton>
                </Grid>
               
                <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                🚀 L'événement Code Quest, organisé par le chapitre étudiant de l'ACM à l'INSAT, s'est déroulé le 10 décembre 2023.
                 Cette journée dédiée à l'informatique et à l'échange de connaissances a offert un programme riche et diversifié
              </Grid>
                <Grid item xs={12} lg={7} mt={20} sx={{ ml: "auto" }}>
                <img src={photo} width="500" height="540" alt="Description de l'image" />
                </Grid>
                <Grid container item xs={11} spacing={2} lg={4} mt={10} alignItems="center" sx={{ mx: "auto" }}>
                🚀 Don't miss the opportunity and join us in our next events and workshops 🚀
                </Grid>
                <table class="table table-striped mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col">workshop</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start time </th>
                                                    <th scope="col">End time </th>
                                                    <th scope="col">Class </th>
                                                    <th scope="col">Trainer Name </th>
                                                    <th scope="col">Description </th>
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

                                                </tr>
                                            ))}
                              
                 </table>
              </Grid>

            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </Container>
     
    </>
  );
}

export default AcmInBasic;