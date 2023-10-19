import RootLayout from "@/components/Layouts/RootLayout";
import Review from "@/components/Review/Review";
import TutorDetails from "@/components/tutors/TutorDetails";
import Spinner from "@/components/ui/Spinner";
import { usePostReviewMutation } from "@/redux/features/review/reviewApi";
import { useGetSingleTutorQuery } from "@/redux/features/tutor/tutorApi";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const TutorDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  //console.log(id);
  const { data, isLoading } = useGetSingleTutorQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  //console.log(data);
  const { _id } = useSelector((state) => state.user);
  const [reviewInput, setReviewInput] = useState("");
  const [postReview] = usePostReviewMutation();
  const handleReview = (reviewData) => {
    if (!_id) {
      return toast.error("Please Login to Add a Comment");
    }
    console.log(reviewData);
    const options = {
      review: reviewData,
      user: _id,
      tutor: data?.data?.tutor?._id,
    };
    postReview(options);
  };
  return (
    <div>
      {isLoading && <Spinner />}
      {data && <TutorDetails data={data?.data} />}
      <div className="w-4/5 mx-auto mt-8">
        <div>
          <input
            onChange={(e) => setReviewInput(e.target.value)}
            type="text"
            placeholder="Enter Review"
            className="input input-bordered w-full max-w-xs"
          />
          <button
            className="btn btn-primary ml-4"
            onClick={() => handleReview(reviewInput)}
          >
            Add Review
          </button>
        </div>
        <p className="mt-4 text-lg font-bold">Comments</p>
        {data?.data?.reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default TutorDetailsPage;

TutorDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
