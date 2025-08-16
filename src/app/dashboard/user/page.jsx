import PrivateRoute from "@/Components/PrivateRoute";
import React from "react";

const UserDashboard = () => {
  return (
    <PrivateRoute requiredRole="user">
      <div>Userrr Dashhh</div>
    </PrivateRoute>
  );
};

export default UserDashboard;
