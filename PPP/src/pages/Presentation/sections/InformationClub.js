// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import ExampleCard from "../components/ExampleCard";
import Card from "@mui/material/Card";

// Images
import img_acm from "assets/images/clubs-logos/ACM-logo.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InformationClub() {
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const clubName = "ACM";  
  const navigate = useNavigate();

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

  const deleteReservation = async (id) => {
    try {
      await fetch(`http://localhost:5000/reservation/delete/${id}`, {
        method: "DELETE",
      });
      setReservations(reservations.filter(reservation => reservation.reservation_id !== id));
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

  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} mt={10} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <ExampleCard image={img_acm} />
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
                      <th scope="col">Date</th>
                      <th scope="col">Start time</th>
                      <th scope="col">End time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(reservation => (
                      <tr key={reservation.reservation_id}>
                        <td>{reservation.num_salle}</td>
                        <td>{reservation.date.split('T')[0]}</td>
                        <td>{reservation.starttime}</td>
                        <td>{reservation.endtime}</td>
                        <td>{reservation.statu}</td>
                        <td>
                          <button className="btn btn-danger" onClick={() => deleteReservation(reservation.reservation_id)}>
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
      </Container>
    </MKBox>
  );
}

export default InformationClub;
