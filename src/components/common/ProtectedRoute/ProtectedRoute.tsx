import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetAuthQuery, useLoginMutation } from "../../../store/authApi";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isLoading, isSuccess, error } = useGetAuthQuery();

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return data ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
