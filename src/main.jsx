import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {

  // refactored the original code
  if (role === 'admin') {
    return (
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route exact path="/" element={<AdminLoginPage />} />
      {/* changed the path */}
      <Route path="*" exact element={<NotFoundPage />} />
    </Routes>
  );
}


function Main() {
  const { state } = React.useContext(AuthContext);
  // console.log(state);

  return (
    <div className="min-h-full bg-black">
      <div className="flex">
        <div className="w-full min-h-full">
          <div className="page-wrapper w-full min-h-full py-10 px-5">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
