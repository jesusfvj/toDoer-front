import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserContext";

const PublicRoutes = ({ children }) => {
 /*  const { user } = useUser();

  return !user ? children : <Navigate to="/main" />; */
  return children
};

export default PublicRoutes;