import RootLayout from "@/components/Layouts/RootLayout";
import ProductCard from "@/components/products/ProductCard";
import HomePageHeroSection from "@/components/ui/HomePageHeroSection";
import { useGetTutorsQuery } from "@/redux/features/tutor/tutorApi";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { searchTerm, preferedClasses } = useSelector((state) => state.tutor);
  const { data } = useGetTutorsQuery({ searchTerm, preferedClasses });
  /* console.log(searchTerm, preferedClasses);
  console.log(data); */
  return (
    <div className="w-full">
      <div>
        <HomePageHeroSection />
      </div>
      <h1 className="my-8 text-5xl text-center">Featured Products</h1>
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 gap-8">
        {tutors?.map((tutor) => (
          <ProductCard key={tutor._id} tutor={tutor} />
        ))}
      </div> */}
      <h3 className="my-8 text-5xl text-center">Featured Categories</h3>
      <div className="my-8 flex flex-row flex-wrap justify-center items-center">
        <Link
          href="/processor"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4 w-52 text-center"
        >
          Processor
        </Link>

        <Link
          href="/motherboard"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          Motherboard
        </Link>

        <Link
          href="/ram"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          RAM
        </Link>

        <Link
          href="/power-supply"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          Power Supply Unit
        </Link>

        <Link
          href="/storage-device"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          Storage Device
        </Link>

        <Link
          href="/monitor"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          Monitor
        </Link>

        <Link
          href="/others"
          className="p-4 bg-green-300 text-primary font-semibold rounded-md m-4  w-52 text-center"
        >
          Others
        </Link>
      </div>
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
