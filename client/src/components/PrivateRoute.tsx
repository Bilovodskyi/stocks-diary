import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const PrivateRoute = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo);
    return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
