import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import "./popup.css";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Popup(props) {
  //const navigate = useNavigate();
  const [num_salle, setclassnum] = useState("");

  return props.trigger ? (
    <div className="popup">
      <div className="popup_inner">
        <Grid item xs={5} lg={5} position="relative" px={0}>
          <MKBox>
            <MKTypography variant="h3" mb={3}>
              Filtrer By:
            </MKTypography>
          </MKBox>
          <MKBox display="flex" alignItems="center">
            <MKTypography variant="h5" mb={1}>
              Number of places:
            </MKTypography>
            <MKInput
              type="text"
              label="Class Number"
              Width="50%"
              value={num_salle}
              onChange={(e) => setclassnum(e.target.value)}
            />
          </MKBox>
          <MKButton variant="gradient" color="error" onClick={() => props.setTrigger(false)}>
            close
          </MKButton>
          {props.children}
        </Grid>
      </div>
    </div>
  ) : (
    ""
  );
}
Popup.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popup;
