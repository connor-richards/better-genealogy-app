import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import HomePage from "./home/HomePage"; // User's personal homepage
import PrivateRoute from "./auth/PrivateRoute"; // Protect private routes
import { AuthProvider, useAuth } from "./auth/AuthProvider"; // Provide auth state

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire Router with AuthProvider */}
      <AppRoutes /> {/* Separate component to handle routes */}
    </AuthProvider>
  );
};

const AppRoutes = () => {
  const { currentUser } = useAuth(); // Now useAuth is within the AuthProvider context

  return (
    <Router>
      <Routes>
        {/* Redirect logged-in users trying to access login or signup */}
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/home" /> : <SignUp />}
        />

        {/* Private route - accessible only to logged-in users */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* Redirect any unknown route to login or home based on auth status */}
        <Route
          path="*"
          element={
            currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
