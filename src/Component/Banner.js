import React from "react";
import BannerImg from "../../Image/karang1-removebg-preview.png";

const Banner = () => {
  return (
    <div>
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[650px]">
      {/* Text section */}
      <div className="flex flex-col justify-center gap-8 text-center md:text-left pt-10 md:pt-0 pb-20">
        <h1 className="text-4xl lg:text font-semibold">
          Delicious Food Is Waiting For You
        </h1>
        <p className="text-lg">
        Discover a world of flavors that will delight your taste buds. Experience the perfect blend of taste and tradition, all in one bite.
        </p>
      </div>

      {/* Image section with buttons */}     
      <div className="flex flex-col justify-center">
        <img src={BannerImg} alt="" />
      </div>
    </div>
    
    </div>
  );
};

export default Banner;
