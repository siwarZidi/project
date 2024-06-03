import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import Register from "layouts/pages/register";

// Material Kit 2 React routes
import routes from "routes";
import Reserve from "layouts/pages/reserve";
import AdminReservation from "layouts/pages/AdminReservation";
import JCI from "layouts/pages/clubEvent/JCI";
import ACM from "layouts/pages/clubEvent/ACM";
import JEI from "layouts/pages/clubEvent/JEI";
import Securinets from "layouts/pages/clubEvent/Securinets";
import Acm_Page from "layouts/pages/Club";
import { UserProvider } from "context/AppContext";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <UserProvider>


    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservation" element={<AdminReservation />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
        <Route path="/JCI" element={<JCI />} />
        <Route path="/ACM" element={<ACM />} />
        <Route path="/JEI" element={<JEI />} />
        <Route path="/Club/:name" element={<Acm_Page />} />
        <Route path="/Securinets" element={<Securinets />} />
      </Routes>
    </ThemeProvider>
    </UserProvider>
  );
}
