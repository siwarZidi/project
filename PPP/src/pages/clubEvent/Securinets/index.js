import React from 'react';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import '../styles.css';
import video1 from "assets/images/bureauclub/annimation.mp4";

function SecurinetsInBasic() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <DefaultNavbar routes={routes} transparent light className="default-navbar" />
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
    </div>
  );
}

export default SecurinetsInBasic;
