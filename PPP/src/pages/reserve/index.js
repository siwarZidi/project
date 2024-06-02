// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FilterIcon from "@mui/icons-material/Filter";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popup from "components/PopUp/Popup";
// Images
import bgImage from "assets/images/insat.jpg";
import { Description } from "@mui/icons-material";

function Reserve() {
  const navigate = useNavigate();
  const [clubname, setclubname] = useState("");
  const [num_salle, setclassnum] = useState("");
  const [date, setdate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setFinishtime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [workShopName, setWorkShopName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [avatar, setAvatar] = useState(null); // Ajout de l'état pour l'image
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { clubname, num_salle, date, starttime, endtime,trainer,workShopName,description,avatar };
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log("Reservation successful!");
        navigate("/presentation");
      } else {
        console.error("Login failed");
        alert("the classroom is already taken !!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <MKBox component="section" py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container item>
          <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={5}
                position="relative"
                px={0}
                sx={{
                  backgroundImage: ({
                    palette: { gradients },
                    functions: { rgba, linearGradient },
                  }) =>
                    `${linearGradient(
                      rgba(gradients.dark.main, 0.8),
                      rgba(gradients.dark.state, 0.8)
                    )}, url(${bgImage})`,
                  backgroundSize: "cover",
                }}
              >
                <MKBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <MKBox py={6} pr={6} pl={{ xs: 6, sm: 12 }} my="auto">
                    <MKTypography variant="h3" color="white" mb={1}>
                      Make your reservation
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      Fill up the form and the administration will get back to you within 24 hours.
                    </MKTypography>
                    <MKBox display="flex" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-phone" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        (+216) 95886824
                      </MKTypography>
                    </MKBox>
                    <MKBox display="flex" color="white" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-envelope" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        INSAT.CLUB@insat.ucar.tn
                      </MKTypography>
                    </MKBox>
                    <MKBox display="flex" color="white" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-map-marker-alt" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        Insat,Tunis
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={3}>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-facebook" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-twitter" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-dribbble" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-instagram" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} lg={7}>
                <MKBox component="form" p={2} role="form" onSubmit={handleSubmit}>
                  <MKBox px={3} py={{ xs: 2, sm: 6 }}>
                    <MKTypography variant="h2" mb={1}>
                      Fill out the form
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={0.5} pb={3} px={3}>
                    <Grid container>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKInput
                          pb={2}
                          type="text"
                          label="Club's Name"
                          fullWidth
                          value={clubname}
                          onChange={(e) => setclubname(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKInput
                          type="text"
                          label="Class Number"
                          fullWidth
                          value={num_salle}
                          onChange={(e) => setclassnum(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKTypography variant="h6" mb={1}>
                          Name of the workshop or the event :
                        </MKTypography>
                        <MKBox mb={2}>
                          <MKInput
                            type="text"
                            fullWidth
                            value={workShopName}
                            onChange={(e) => setWorkShopName(e.target.value)}
                          />
                        </MKBox>
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                      <MKTypography variant="h6" mb={1}>
                            Date :
                          </MKTypography>
                        <MKInput
                          type="date"
                          fullWidth
                          value={date}
                          onChange={(e) => setdate(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={1}>
                        <MKBox mb={2}>
                          <MKTypography variant="h6" mb={1}>
                            Starting from :
                          </MKTypography>
                          <MKInput
                            type="time"
                            fullWidth
                            value={starttime}
                            onChange={(e) => setStarttime(e.target.value)}
                          />
                        </MKBox>
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKTypography variant="h6" mb={1}>
                          Finishing at :
                        </MKTypography>
                        <MKBox mb={2}>
                          <MKInput
                            type="time"
                            fullWidth
                            value={endtime}
                            onChange={(e) => setFinishtime(e.target.value)}
                          />
                        </MKBox>
                      </Grid>
                      <Grid item xs={12} pr={1} mb={3}>
                        <MKTypography variant="h6" mb={1}>
                          Trainer Name :
                        </MKTypography>
                        <MKBox mb={2}>
                          <MKInput
                            type="text"
                            fullWidth
                            value={trainer}
                            onChange={(e) => setTrainer(e.target.value)}
                          />
                        </MKBox>
                        </Grid>
                        <Grid item xs={12} pr={1} mb={3}>
                        <MKTypography variant="h6" mb={1}>
                          Trainer CV :
                        </MKTypography>
                        <MKBox mb={2}>
                        <MKInput
                          type="file" 
                          onChange={handleAvatarChange} 
                          accept="image/*" />
                       </MKBox>
                        </Grid>
                        <Grid item xs={12} pr={1} mb={3}>
                        <MKTypography variant="h6" mb={1}>
                          Short Description for the workshop or the event :
                        </MKTypography>
                        <MKBox mb={2}>
                          <MKInput
                            type="text"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </MKBox>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="flex-end"
                      textAlign="right"
                      ml="auto"
                    >
                      <MKButton
                        variant="gradient"
                        color="error"
                        onClick={() => setButtonPopup(true)}
                        style={{ marginRight: "10px" }}
                        startIcon={<FilterIcon />}
                      >
                        Filtrer
                      </MKButton>
                      <MKButton variant="gradient" color="error" onClick={handleSubmit}>
                        Send Request
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
    </MKBox>
  );
}

export default Reserve;
