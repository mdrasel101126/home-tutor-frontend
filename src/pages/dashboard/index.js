import AllUsers from "@/components/Dashboard/AllUsers";
import CreateTutor from "@/components/Dashboard/CreateTutor";
import RootLayout from "@/components/Layouts/RootLayout";

const Dashboard = () => {
  return (
    <div>
      <h1>Hello Dashboard</h1>
      {/* <AllUsers /> */}
      <CreateTutor />
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
