import DashBoardLayout from "@/components/Layouts/DashBoardLayout";
import RootLayout from "@/components/Layouts/RootLayout";
import Spinner from "@/components/ui/Spinner";
import { useGetUserQuery } from "@/redux/features/user/userApi";

const Dashboard = () => {
  const { data, isLoading } = useGetUserQuery();

  return (
    <div>
      {isLoading && <Spinner />}
      <h1 className="text-center font-bold text-primary text-4xl">
        Welcome{" "}
        {`${data?.data?.name?.firstName} ${data?.data?.name?.lastName} To Your Dashboard`}
      </h1>
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
