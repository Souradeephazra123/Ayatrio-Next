import React from "react";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProfileContent from "./ProfileContent";

const Profile = () => {
  return (
    <div>
      <div className=" ">
        <div className="grid sm:grid-cols-5 grid-cols-1 gap-4 bg-zinc-100 pt-11 sm:px-[50px] px-[20px]  ">
          <div className="col-span-2 sm:mb-auto mb-0">
            <div className="col-span-1  mt-4">
              <div className="mb-2 ">Inspiration to installation</div>
              <div className="font-bold sm:text-3xl text-xl mb-4">
                <span className="whitespace-nowrap">Meet our designers,</span>
                <br />
                <span className="whitespace-nowrap">to make your dream</span>
                <br />
                to true
              </div>
              <div className="sm:text-xl text-lg mb-8">
                <span className="whitespace-nowrap">
                  We bring your vision to life with
                </span>
                <br />
                <span className="whitespace-nowrap">
                  free white glove services
                </span>
                <br />
              </div>
              <button className="bg-black pt-3 pb-3 pl-4 pr-4 mb-24 mt-12 rounded-full flex justify-center items-center text-white">
                Book an appointment
              </button>
            </div>
          </div>
          <div className=" col-span-3 my-auto overflow-x-auto">
            <ProfileContent/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
