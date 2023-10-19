import Image from "next/image";
import profileImg from "../../assets/profileImage.png";
import Review from "../Review/Review";

const TutorDetails = ({ data }) => {
  return (
    <div>
      <div className="card card-compact shadow-xl">
        <figure>
          <Image
            src={
              data?.tutor?.promfileImg ? data?.tutor?.promfileImg : profileImg
            }
            width={500}
            height={270}
            alt="Tutor"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary ml-4">{`${data?.tutor?.name?.firstName} ${data?.tutor?.name?.lastName}`}</h2>
          <div className="">
            <div className="w-1/2">
              <p className="bg-green-200 p-2  rounded-md font-semibold text-primary m-4">
                Contact No:{data?.tutor?.contactNo}
              </p>
            </div>
            <div className="w-1/2">
              <p className="bg-green-200 p-2 rounded-md font-semibold text-primary m-4">
                Email:{data?.tutor?.email}
              </p>
            </div>
            <div className="w-1/2">
              <p className="bg-green-200 p-2  rounded-md font-semibold text-primary m-4 ">
                Educational Qualification:{data?.tutor?.educationQualification}
              </p>
            </div>
            <div className="w-1/2">
              <p className="bg-green-200 p-2 rounded-md font-semibold text-primary m-4 ">
                Prefered Classes:{data?.tutor?.preferedClasses}
              </p>
            </div>
            <div className="w-1/2">
              <p className="bg-green-200 p-2 rounded-md font-semibold text-primary m-4">
                Address:{data?.tutor?.address}
              </p>
            </div>
          </div>
          <p className="ml-4 text-justify font-semibold">
            Description: {data?.tutor?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
