import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserContext";

const PublicRoutes = ({ children }) => {
  const { user } = useUser();
  const token = window.localStorage.getItem("token");

  return user && token ? <Navigate to="/main" /> : children;
};

export default PublicRoutes;