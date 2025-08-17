import Sidebar from "@/Components/UserDashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
