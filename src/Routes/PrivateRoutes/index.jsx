import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserContext";

const PrivateRoutes = ({ children }) => {
  const { user } = useUser();
  const token = window.localStorage.getItem("token");

  return user && token ? children : <Navigate to="/" />;
};

export default PrivateRoutes;