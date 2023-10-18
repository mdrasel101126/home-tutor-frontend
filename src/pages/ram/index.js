import RootLayout from "@/components/Layouts/RootLayout";
import ProductCard from "@/components/products/ProductCard";
import React from "react";

const Ram = ({ products }) => {
  return (
    <div>
      <h1 className="my-8 text-5xl text-center">Ram</h1>
      <div>
        {
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 gap-8">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Ram;

Ram.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getStaticProps() {
  const res = await fetch("https://pc-builer-backend.vercel.app/products");
  const data = await res.json();
  const products = data?.filter(
    (product) => product.category.toLowerCase() === "ram"
  );
  return {
    props: {
      products: products,
    },
    revalidate: 300,
  };
}
