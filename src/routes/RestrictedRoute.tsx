import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";

const RestrictedRoute = ({
  component,
  redirectTo,
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? <Navigate to={redirectTo} /> : component;
};

export default RestrictedRoute;
