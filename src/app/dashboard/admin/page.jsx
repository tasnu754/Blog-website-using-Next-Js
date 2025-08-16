import PrivateRoute from "@/Components/PrivateRoute";

const AdminDashboard = () => {
  return (
    <PrivateRoute requiredRole="admin">
      <div>Admin Dashhh</div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
