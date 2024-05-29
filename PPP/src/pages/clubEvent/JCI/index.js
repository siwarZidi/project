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
import photo1 from "assets/images/bureauclub/jci/eya.jpg";
import photo2 from "assets/images/bureauclub/jci/idris.jpg";
import photo3 from "assets/images/bureauclub/jci/syrin.jpg";
import photo4 from "assets/images/bureauclub/jci/mawada.jpg";
import photo5 from "assets/images/bureauclub/jci/mbt.jpg";
import bgFront from "assets/images/bureauclub/jci/jci1.jpg";
import bgBack from "assets/images/bureauclub/jci/jci2.png";
import video from "assets/images/bureauclub/jci/video1.mp4"

const photos = [
  { src: photo1, name: 'Président', contact: 'eya.garraoui@insat.ucar.tn' },
  { src: photo2, name: 'SG', contact: 'idris.saadi@insat.ucar.tn' },
  { src: photo3, name: 'VPPRE', contact: 'syrine.hammemi@insat.ucar.tn' },
  { src: photo4, name: 'VPFD', contact: 'mawada.bennacer@insat.ucar.tn' },
  { src: photo5, name: 'Tresorier', contact: 'mariem.bentaous@insat.ucar.tn' }
];

function JciInBasic() {
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
                          Notre mission
                        </>
                      }
                      description="Offrir au jeunes leaders des opportunités de développement du leadership en leur donnant la capacité de créer des changements positifs.. "
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
                Our project Ecovibes Summit for greener INSAT  has been selected first nationally and among the TOP 3 in the category 
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
                <table class="table table-striped mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col">workshop</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Start time </th>
                                                    <th scope="col">End time </th>
                                                    <th scope="col">Trainer Name </th>
                                                </tr>
                                            </thead>
                              
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

export default JciInBasic;