import PrivateRoute from "@/Components/PrivateRoute";
import Sidebar from "@/Components/UserDashboard/Sidebar";

const UserDashboard = () => {
  return (
    <PrivateRoute requiredRole="user">
      <div>ddirghjidsh</div>
    </PrivateRoute>
  );
};

export default UserDashboard;
