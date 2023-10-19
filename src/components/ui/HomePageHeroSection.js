import React from "react";
import heroImage from "../../assets/download.png";
import Image from "next/image";

const HomePageHeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={heroImage}
          alt="Hero image"
          className="w-4/6 h-64 rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">HOME TUTOR!</h1>
          <p className="py-6">
            Home Tuition is Flexible and Rewarding. Teach as home tutor at your
            convenient timings. Few hours of home tutoring a day can help you
            earn decent income.Guided students learn & achieve Better Grades!
            Numerous students have benefitted from expert guidance from home
            tutors. Home tutoring is the best part time job option. Thousands of
            parents are offering part time teaching jobs for home tutors. Work
            part time and earn additional income!
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeroSection;
