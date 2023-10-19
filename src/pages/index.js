import RootLayout from "@/components/Layouts/RootLayout";
import TutorCard from "@/components/tutors/TutorCard";
import ProductCard from "@/components/tutors/TutorCard";
import HomePageHeroSection from "@/components/ui/HomePageHeroSection";
import { useGetTutorsQuery } from "@/redux/features/tutor/tutorApi";
import {
  setLimit,
  setPage,
  setPreferedClasses,
  setSearchTerm,
} from "@/redux/features/tutor/tutorSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const { searchTerm, preferedClasses, limit, page } = useSelector(
    (state) => state.tutor
  );
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { data } = useGetTutorsQuery({
    searchTerm,
    preferedClasses,
    limit,
    page,
  });
  const tutors = data?.data?.data;
  const meta = data?.data?.meta;

  //console.log(tutors, meta);
  const handleSearch = (searchValue) => {
    dispatch(setSearchTerm(searchValue));
    //console.log(searchTerm);
  };
  //console.log(preferedClasses);
  //console.log("Page", page);
  return (
    <div className="w-full">
      <div>
        <HomePageHeroSection />
      </div>
      <div className="flex flex-row  items-baseline">
        <div className="w-96">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder={searchTerm ? searchTerm : "Search"}
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className="btn btn-primary ml-4"
            onClick={() => handleSearch(searchInput)}
          >
            Search
          </button>
          <div>
            <select
              defaultValue=""
              onChange={(e) => dispatch(setPreferedClasses(e.target.value))}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="">All</option>
              <option value="6-8">6 - 8</option>
              <option value="9-10">9 - 10</option>
              <option value="11-12">11 - 12</option>
              <option value="ielts">IELTs</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <h1 className="my-8 text-5xl text-center">Our Tutors</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 gap-8">
            {tutors?.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
          <div className="flex flex-row justify-center my-8">
            <div className="join">
              {Array.from(
                { length: Math.ceil(meta?.total / limit) },
                (_, index) => (
                  <button
                    className={`join-item btn btn-accent ml-1 btn-xs ${
                      page === index + 1 ? "btn-active text-white" : ""
                    }`}
                    key={index + 1}
                    onClick={() => dispatch(setPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
            <select
              onChange={(e) => {
                dispatch(setLimit(e.target.value));
                dispatch(setPage(1));
              }}
              defaultValue="10"
              className="select inline select-secondary select-xs w-14 max-w-xs mx-4"
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </div>
      </div>

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
