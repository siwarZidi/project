import React from "react";
import routes from "routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/bg-sign-in.jpeg";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormGroup } from "react-bootstrap";
function Reserve() {
  const navigate = useNavigate();
  const [clubname, setclubname] = useState("");
  const [num_salle, setclassname] = useState("");
  const [date, setdate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setFinishtime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { clubname, num_salle, date, starttime, endtime };
      const response = await fetch("http://localhost:5000/reserve", {
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
        <Grid container spacing={3} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={2}>
                  Make your reservation
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onsubmit={handleSubmit}>
                  <FormGroup>
                    <MKBox mb={2}>
                      <MKInput
                        pb={2}
                        type="text"
                        label="Club's Name"
                        fullWidth
                        value={clubname}
                        onChange={(e) => setclubname(e.target.value)}
                      />
                    </MKBox>
                  </FormGroup>
                  <FormGroup>
                    <MKBox mb={2}>
                      <MKInput
                        type="text"
                        label="class Name"
                        fullWidth
                        value={num_salle}
                        onChange={(e) => setclassname(e.target.value)}
                      />
                    </MKBox>
                  </FormGroup>
                  <FormGroup>
                    <MKBox mb={2}>
                      <MKInput
                        type="date"
                        fullWidth
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                      />
                    </MKBox>
                  </FormGroup>
                  <FormGroup>
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
                  </FormGroup>
                  <FormGroup>
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
                  </FormGroup>
                  <MKButton type="submit" variant="gradient" color="error" fullWidth>
                    Check
                  </MKButton>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}
export default Reserve;
