import RootLayout from "@/components/Layouts/RootLayout";

const OtherProducts = () => {
  return (
    <div className="my-12">
      <h1 className="text-5xl text-center font-semibold text-green-600">
        Comming Soon.....
      </h1>
    </div>
  );
};

export default OtherProducts;

OtherProducts.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
