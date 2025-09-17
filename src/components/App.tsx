import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Layout from "./Layout";
import Loader from "./Loader";
import { Navigate } from "react-router";
import PrivateRoute from "../routes/PrivateRoute";
import RestrictedRoute from "../routes/RestrictedRoute";
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="/sign-in" />} />
            <Route
              path="/sign-up"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/dashboard"
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/dashboard"
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  component={<Dashboard />}
                  redirectTo="/sign-in"
                />
              }
            />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Route>
        </Routes>
      </Suspense>
  );
}

export default App;
