import PrivateRoute from "@/Components/PrivateRoute";

const UserDashboard = () => {
  return (
    <PrivateRoute requiredRole="user">
      <div>ddirghjidsh</div>
    </PrivateRoute>
  );
};

export default UserDashboard;
