import Image from "next/image";
import Link from "next/link";
import React from "react";
import profileImg from "../../assets/profileImage.png";

const TutorCard = ({ tutor }) => {
  return (
    <div className="card card-compact shadow-xl">
      <figure>
        <Image
          src={tutor?.promfileImg ? tutor?.promfileImg : profileImg}
          layout="responsive"
          width={500}
          height={270}
          alt="Profile Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${tutor?.name?.firstName} ${tutor?.name?.firstName}`}</h2>
        <p>Contact Number:{tutor?.contactNo}</p>
        <p>Prefered Classes:{tutor?.preferedClasses}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">
            <Link href={`/tutor-details/${tutor?._id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
