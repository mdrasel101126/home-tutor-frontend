import RootLayout from "@/components/Layouts/RootLayout";
import ProductDetails from "@/components/products/ProductDetails";

const ProductDetailsPage = ({ product }) => {
  //console.log(product);
  return (
    <div className="my-8">
      <ProductDetails key={product._id} product={product} />
    </div>
  );
};

export default ProductDetailsPage;

ProductDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getStaticPaths() {
  const res = await fetch("https://pc-builer-backend.vercel.app/products");
  const data = await res.json();
  const paths = data.map((product) => ({
    params: { id: product._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://pc-builer-backend.vercel.app/products/${params?.id?.toString()}`
  );
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
}
