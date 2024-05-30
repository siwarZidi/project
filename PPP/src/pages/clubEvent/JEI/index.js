import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Container } from "reactstrap";
import MKSocialButton from "components/MKSocialButton"
// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";


// Material Kit 2 React page layout routes
import routes from "routes";


// Images
import photo1 from "assets/images/bureauclub/JEI/amin.png";
import photo2 from "assets/images/bureauclub/JEI/ismail.png";
import photo3 from "assets/images/bureauclub/JEI/inessg.png";
import photo4 from "assets/images/bureauclub/JEI/cherifa.png";
import photo from "assets/images/bureauclub/JEI/JEI1.png"
import photoForum from "assets/images/bureauclub/JEI/JEI2.png"


const photos = [
  { src: photo1, name: 'Président', contact: 'amin@insat.ucar.tn' },
  { src: photo2, name: 'VP', contact: 'ismail@insat.ucar.tn' },
  { src: photo3, name: 'SG', contact: 'ines@insat.ucar.tn' },
  { src: photo4, name: 'Tresorier', contact: 'cherifa@insat.ucar.tn' }
];

function JeiInBasic() {
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
              Junior Entreprise INSAT
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
                
                <Grid item xs={12}  sx={{ ml: "auto" }}>
                <img src={photo} width="1100" height="540" alt="Description de l'image" />  
                <br />
                <br />
                Junior Enterprise INSAT is a student-run professional organization at the National Institute of Applied Sciences and Technology 
                (INSAT) in Tunis. It functions as a student-led consulting firm, 
                offering various services to businesses while providing valuable hands-on experience to its members.
                          <br />
                          <br />
                          Check out our news
                          <br />
                          <MKSocialButton
                  component="a"
                  href="https://www.facebook.com/junior.entreprise.insat/"
                  target="_blank"
                  color="facebook"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-facebook" />
                  &nbsp;
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.instagram.com/junior_entreprise_insat/reel/CoflRmnOGEA/"
                  target="_blank"
                  color="instagram"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-instagram" />
                  &nbsp;
                </MKSocialButton>
                <MKSocialButton
                  component="a"
                  href="https://www.linkedin.com/company/junior-entreprise-insat/"
                  target="_blank"
                  color="linkedin"
                  sx={{ mr: 1 }}
                >
                  <i className="fab fa-linkedin" />
                  &nbsp;
                </MKSocialButton>
                </Grid>
               
                <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
                Relive the electrifying atmosphere of our latest Job Fair and Hackathon at Forum INSAT Entreprise! 
                With over 2000 enthusiastic students flooding in, our event was an unforgettable blend of opportunities and innovation. 
                From networking with top-tier companies to diving into the hackathon participants' pitches,
                this throwback video encapsulates the essence of our vibrant community.
              </Grid>
                <Grid item xs={12} lg={7} mt={20} sx={{ ml: "auto" }}>
                <img src={photoForum} width="500" height="540" alt="Description de l'image" />
                </Grid>
                <Grid container item xs={11} spacing={2} lg={4} mt={10} alignItems="center" sx={{ mx: "auto" }}>
                 Don't miss the opportunity and join us in our next events and workshops 
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

export default JeiInBasic;