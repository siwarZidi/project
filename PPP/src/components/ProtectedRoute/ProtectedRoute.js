import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useApp } from "context/AppContext";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { club } = useApp();

  return (
    <Route
      {...rest}
      element={club ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default ProtectedRoute;
