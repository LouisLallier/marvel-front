import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ token }) => {
  const navigate = useNavigate();

  const goToHomeAndLog = () => {
    navigate("/signIn");
  };

  return token ? <Outlet /> : goToHomeAndLog();
};
export default ProtectedRoute;
