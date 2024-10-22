import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider"; // Correct import

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useDataLayerValue(); // Use global state

  useEffect(() => {
    if (!user) {
      navigate("/signin", { state: { msg, redirect } }); // Assuming you navigate to /signin if the user is not authenticated
    }
  }, [user, navigate, msg, redirect]);

  return children;
};

export default ProtectedRoute;
