
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import InformationClub from "pages/Presentation/sections/InformationClub";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";





function ACM_page() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        sticky
      />

        <InformationClub />

    </>
  );
}

export default ACM_page;
