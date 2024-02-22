import React, { useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileData,
} from "../Features/Slices/profileSlice";

const ProfileContent = () => {
  const profileData = useSelector(selectProfileData);
  const dispatch = useDispatch();
  useEffect(() => {
    if(profileData.length===0){
      dispatch({ type: "FETCH_PROFILE_REQUEST", payload: "Profile" });
      // console.log("profile data fetch funtion called");
    }
  }, []);

  return (
    <div className="transparent rounded-lg h-100 pb-8">
      <Swiper
        spaceBetween={20}
        navigation={{
          nextEl: ".vector-one",
          prevEl: ".vector-two",
        }}
        modules={[Navigation]}
        style={{ "--swiper-navigation-size": "24px", paddingRight: "30px" }}
        breakpoints={{
          100: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {profileData.map((person, index) => (
          <SwiperSlide key={index}>
            <div>
              <div className="bg-black rounded-full sm:h-40 h-28 sm:w-40 w-28 mb-2 sm:mt-32 mt-4 sm:ml-4 ml-2"></div>
              <div className="flex justify-center mr-6">
                <div className="text-2xl font-bold ">{person.name}</div>
                <a href="#">
                  <Image
                    className="sm:h-10 h-10 sm:w-10 w-10 -mt-1"
                    src="/social-icon/linkedln.svg"
                    height={6}
                    width={6}
                    alt={`LinkedIn for ${person.name}`}
                  />
                </a>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </SwiperSlide>
        ))}
        <div className="flex flex-row items-end justify-end gap-6">
          <Image
            src="/svg/dropdown/leftvector.svg"
            width={20}
            height={20}
            alt="Arrow"
            className="vector-two bg-gray-300 rounded-full h-7 w-7"
          />
          <Image
            src="/svg/dropdown/rightvector.svg"
            width={20}
            height={20}
            alt="Arrow"
            className="vector-one mr-10  bg-gray-300 rounded-full h-7 w-7"
          />
        </div>
      </Swiper>
    </div>
  );
};

export default ProfileContent;
