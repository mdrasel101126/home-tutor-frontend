import AllTutors from "@/components/Dashboard/AllTutors";
import AllUsers from "@/components/Dashboard/AllUsers";
import Bookings from "@/components/Dashboard/Bookings";
import CreateTutor from "@/components/Dashboard/CreateTutor";
import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import RootLayout from "@/components/Layouts/RootLayout";

const Dashboard = () => {
  return (
    <div>
      <h1>Hello Dashboard</h1>
      {/* <AllUsers /> */}
      {/*  <CreateTutor /> */}
      {/* <AllTutors /> */}
      {/* <Bookings /> */}
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <DashBoardLayout>{page}</DashBoardLayout>
    </RootLayout>
  );
};
