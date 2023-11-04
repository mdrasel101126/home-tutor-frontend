import RootLayout from "@/components/Layouts/RootLayout";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import Image from "next/image";

import profileImage from "../../assets/profileImage.png";

import Link from "next/link";

const EditProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery();

  return (
    <div>
      <div className="my-8">
        <h2 className="text-primary font-bold text-center">My Profile</h2>
      </div>
      <div className="card card-compact shadow-xl">
        <figure>
          <Image
            src={
              user?.data?.promfileImg ? user?.data?.promfileImg : profileImage
            }
            width={500}
            height={270}
            alt="person"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-primary ml-4">
            {`${user?.data?.name?.firstName} ${user?.data?.name?.lastName}`}
          </h2>

          <div className="w-52">
            <p className=" p-2 rounded-md font-semibold  m-4">
              Email:{user?.data?.email}
            </p>
          </div>
          <div className="w-52">
            <p className="p-2  rounded-md font-semibold  m-4">
              Contact:{user?.data?.contactNo}
            </p>
          </div>
          <div className="w-52">
            <p className=" p-2 rounded-md font-semibold m-4 ">
              Address:{user?.data?.address}
            </p>
          </div>
        </div>
        <div className="text-center my-8">
          <Link href="/profile/edit-profile" className="btn btn-primary ">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

EditProfile.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
