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
          <h1 className="text-5xl font-bold">PC BUILDER!</h1>
          <p className="py-6">
            If you are looking for the best computer shop in Bangladesh you have
            to consider PC Builder, as it is a pioneer computer shop and
            e-commerce platform selling computer and IT products all over
            Bangladesh through its branches and website.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeroSection;
