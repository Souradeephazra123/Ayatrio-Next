import React, { useRef, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MultiCardContent from "../compounds/MultiCardContent";
import { useSelector, useDispatch } from "react-redux";
import { selectMultiCardData } from "../Features/Slices/multiCardSlice";

const Multicard = () => {
  const swiper1Ref = useRef(null);
  const multiCardData = useSelector(selectMultiCardData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (multiCardData.length === 0) {
      dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
    }
  }, []);
  return (
    <div>
      <div className="bg-zinc-50 pt-[5rem] pb-[2rem] sm:pl-[50px] pl-[20px] overflow-x-auto">
        <div className="sm:text-3xl text-xl font-medium w-full pb-8">
          Why Ayatrio so innovative
          <br />
          for home furnishing.
        </div>
        <Swiper
          ref={swiper1Ref}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation={{
            nextEl: ".right",
            prevEl: ".back",
          }}
          draggable={true}
          style={{ "--swiper-navigation-size": "24px" }}
          breakpoints={{
            450: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4.07,
              spaceBetween: 10,
            },
          }}
        >
          {multiCardData.map((curElement, idx) => {
            return (
              <SwiperSlide key={idx}>
                <MultiCardContent
                  title={curElement.headerTitle}
                  text={
                    curElement.sections.length > 0
                      ? curElement.sections[0].sectionName
                      : ""
                  }
                  iconPath={curElement.iconPath}
                  iconSize={curElement.iconSize}
                />
              </SwiperSlide>
            );
          })}

          <div className="flex flex-row items-end justify-end gap-4">
            <Image
              src="/svg/dropdown/leftvector.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="back bg-gray-300 rounded-full h-7 w-7"
            />
            <Image
              src="/svg/dropdown/rightvector.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="right mr-16  bg-gray-300 rounded-full h-7 w-7"
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Multicard;
