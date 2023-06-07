import { FC, ReactNode } from "react";
import { User } from "../../../store/models/User.models";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector<RootState>((state) => state.auth.currentUser);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
