import Image from "next/image";
import profileImg from "../../assets/profileImage.png";
const Review = ({ review }) => {
  return (
    <div className="border-2 rounded-md mt-4 p-3 shadow-lg ">
      <div className="flex flex-row items-center">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image
              src={
                review?.user?.promfileImg
                  ? review?.user?.promfileImg
                  : profileImg
              }
              width={48}
              height={48}
              alt="person"
            />
          </div>
        </div>
        <div>
          <p className="ml-3">{`${review?.user?.name?.firstName} ${review?.user?.name?.lastName}`}</p>
        </div>
      </div>
      <p>{review?.review}</p>
    </div>
  );
};

export default Review;
