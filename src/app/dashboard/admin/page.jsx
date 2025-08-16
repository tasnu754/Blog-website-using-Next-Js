import PrivateRoute from "@/Components/PrivateRoute";
import Sidebar from "@/Components/UserDashboard/Sidebar";

const AdminDashboard = () => {
  return (
    <PrivateRoute requiredRole="admin">
      <div>aiiehfwi</div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
