import RootLayout from "./RootLayout";

const DashBoardLayout = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default DashBoardLayout;

DashBoardLayout.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
