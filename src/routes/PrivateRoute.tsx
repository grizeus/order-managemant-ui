import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";

const PrivateRoute = ({
  component,
  redirectTo,
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
