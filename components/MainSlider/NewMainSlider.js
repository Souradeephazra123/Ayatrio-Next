import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Navigation } from "swiper/modules";
import SwiperCore from "swiper/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
SwiperCore.use([Autoplay, Navigation]);
import { selectSliderData } from "../Features/Slices/sliderSlice";

export default function NewMainSlider() {
  const dispatch = useDispatch();
  const SliderViewData = useSelector(selectSliderData);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!SliderViewData || SliderViewData.length === 0) {
      fetchData();
      // console.log("mainslider data fetched")
    }
  }, [page]);
  const fetchData = () => {
    dispatch({
      type: "FETCH_SLIDER_VIEW_REQUEST",
      payload: {
        page: page,
        limit: 4,
      },
    });
  };
  const [sliderApiData, setSliderApiData] = useState([]);
  useEffect(() => {
    if (SliderViewData && SliderViewData.result) {
      setSliderApiData(SliderViewData.result);
    }
  }, [SliderViewData]);
  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  const [hov, setHov] = React.useState(false);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const handleEnter = () => {
    setHov(true);
  };
  const handleLeave = () => {
    setHov(false);
  };
  return (
    <div
      onMouseEnter={() => setNavigationVisible(true)}
      onMouseLeave={() => setNavigationVisible(false)}
    >
      <Swiper
        className="swiper-slider"
        centeredSlides={true}
        grabCursor={true}
        // freeMode={false}
        loop={true}
        mousewheel={false}
        keyboard={{
          enabled: true,
        }}
        style={{
          marginLeft: -60,
        }}
        // Enabled autoplay mode
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        // If we need navigation
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // Responsive breakpoints
        breakpoints={{
          412: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },

          640: {
            slidesPerView: 1.25,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 1.72,
            spaceBetween: 5,
          },
        }}
      >
        <div className={`${navigationVisible ? "block" : "hidden"}`}>
          <Image
            src="/icon/arrow_right.svg"
            width={30}
            height={30}
            alt="arrow"
            className=" rotate-180  swiper-button-prev sm:-translate-y-[150px] sm:translate-x-[-80.8vw] absolute left-0"
          />
        </div>

        <SwiperSlide key={sliderApiData[0]?._id}>
          <div className="relative group h-[70vh] bg-gray-100">
            <Image
              src={sliderApiData[0]?.imgSrc}
              fill
              alt="Swiper"
              priority
              className=" swiper-slide"
            />
            <div className="absolute flex text-lg text-white bottom-4 left-4">
              {sliderApiData[0]?.imgTitle}
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
              <div onMouseEnter={handleEnter} className="cursor-pointer">
                <div className="carcular-conui top-28 left-40 absolute rounded-full w-[30px] h-[30px]">
                  <div className="absolute w-3 h-3 bg-white rounded-full carcular-ui"></div>
                </div>
              </div>
              {hov && (
                <div
                  className={`flex-row z-10 p-2 sm:-ml-[350px] sm:-mt-[100px] flex items-center pb-3 bg-white cursor-pointer`}
                  onClick={handleTab}
                  onMouseLeave={handleLeave}
                >
                  <div className="relative flex flex-row">
                    <div
                      className="flex flex-col basis-3/4 w-36 flex-grow relative ml-1 mr-2.5 pr-4"
                      key={sliderApiData[0]?._id}
                    >
                      <h2 className="pt-1 pr-2 font-bold">
                        {sliderApiData[0]?.circles[0].circles[0].productTitle}
                      </h2>
                      <p className="pb-2 font-normal">
                        {
                          sliderApiData[0]?.circles[0].circles[0]
                            .productCategory
                        }
                      </p>
                      <p className="w-16 h-8 pl-2 font-bold bg-yellow-400 main">
                        ₹{sliderApiData[0]?.circles[0].circles[0].productPrice}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center justify-end h-full pr-1 border-l border-gray-200">
                      <Image
                        className="flex ml-2"
                        src="/icon/arrow_right.svg"
                        height={20}
                        width={20}
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={sliderApiData[1]?._id}>
          <div className="relative group h-[70vh] bg-gray-500">
            <Image
              src={sliderApiData[1]?.imgSrc}
              width={500}
              height={330}
              alt="Swiper"
              className="object-cover swiper-slide"
            />
            <div className="absolute flex text-lg text-white bottom-4 left-4">
              {sliderApiData[1]?.imgTitle}
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
              <div onMouseEnter={handleEnter} className="cursor-pointer">
                <div className="carcular-conui top-28 left-40 absolute rounded-full w-[30px] h-[30px]">
                  <div className="absolute w-3 h-3 bg-white rounded-full carcular-ui"></div>
                </div>
              </div>
              {hov && (
                <div
                  className={`flex-row z-10 p-2 sm:-ml-[350px] sm:-mt-[100px] flex items-center pb-3 bg-white cursor-pointer`}
                  onClick={handleTab}
                  onMouseLeave={handleLeave}
                >
                  <div className="relative flex flex-row">
                    <div
                      className="flex flex-col basis-3/4 w-36 flex-grow relative ml-1 mr-2.5 pr-4"
                      key={sliderApiData[1]?._id}
                    >
                      <h2 className="pt-1 pr-2 font-bold">
                        {sliderApiData[1]?.circles[0].circles[0].productTitle}
                      </h2>
                      <p className="pb-2 font-normal">
                        {sliderApiData[1]?.circles[0].circles[0].productTitle}
                      </p>
                      <p className="w-16 h-8 pl-2 font-bold bg-yellow-400 main">
                        {sliderApiData[1]?.circles[0].circles[0].productTitle}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center justify-end h-full pr-1 border-l border-gray-200">
                      <Image
                        className="flex ml-2"
                        src="/icon/arrow_right.svg"
                        height={20}
                        width={20}
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={sliderApiData[2]?._id}>
          <div className="relative group h-[70vh] bg-gray-100">
            <Image
              src={sliderApiData[2]?.imgSrc}
              width={500}
              height={330}
              alt="Swiper"
              className="object-cover swiper-slide"
            />
            <div className="absolute flex text-lg text-white bottom-4 left-4">
              {sliderApiData[2]?.imgTitle}
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
              <div onMouseEnter={handleEnter} className="cursor-pointer">
                <div className="carcular-conui top-28 left-40 absolute rounded-full w-[30px] h-[30px]">
                  <div className="absolute w-3 h-3 bg-white rounded-full carcular-ui"></div>
                </div>
              </div>
              {hov && (
                <div
                  className={`flex-row z-10 p-2 sm:-ml-[350px] sm:-mt-[100px] flex items-center pb-3 bg-white cursor-pointer`}
                  onClick={handleTab}
                  onMouseLeave={handleLeave}
                >
                  <div className="relative flex flex-row">
                    <div
                      className="flex flex-col basis-3/4 w-36 flex-grow relative ml-1 mr-2.5 pr-4"
                      key={sliderApiData[2]?._id}
                    >
                      <h2 className="pt-1 pr-2 font-bold">
                        {sliderApiData[2]?.circles[0].circles[0].productTitle}
                      </h2>
                      <p className="pb-2 font-normal">
                        {sliderApiData[2]?.circles[0].circles[0].productTitle}
                      </p>
                      <p className="w-16 h-8 pl-2 font-bold bg-yellow-400 main">
                        {sliderApiData[2]?.circles[0].circles[0].productTitle}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center justify-end h-full pr-1 border-l border-gray-200">
                      <Image
                        className="flex ml-2"
                        src="/icon/arrow_right.svg"
                        height={20}
                        width={20}
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
        {sliderApiData?.slice(3).map((data) => (
          <SwiperSlide key={data._id}>
            <div className="relative group h-[70vh] bg-gray-100">
              <Image
                src={data.imgSrc}
                width={500}
                height={330}
                alt="Swiper"
                className="object-cover swiper-slide"
              />
              <div className="absolute flex text-lg text-white bottom-4 left-4">
                {data?.imgTitle}
              </div>
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity opacity-0 group-hover:opacity-100">
                <div onMouseEnter={handleEnter} className="cursor-pointer">
                  <div className="carcular-conui top-28 left-40 absolute rounded-full w-[30px] h-[30px]">
                    <div className="absolute w-3 h-3 bg-white rounded-full carcular-ui"></div>
                  </div>
                </div>
                {hov && (
                  <div
                    className={`flex-row z-10 p-2 sm:-ml-[350px] sm:-mt-[100px] flex items-center pb-3 bg-white cursor-pointer`}
                    onClick={handleTab}
                    onMouseLeave={handleLeave}
                  >
                    <div className="relative flex flex-row">
                      <div
                        className="flex flex-col basis-3/4 w-36 flex-grow relative ml-1 mr-2.5 pr-4"
                        key={data._id}
                      >
                        <h2 className="pt-1 pr-2 font-bold">
                          {data.circles[0].circles[0].productTitle}
                        </h2>
                        <p className="pb-2 font-normal">
                          {data.circles[0].circles[0].productCategory}
                        </p>
                        <p className="w-16 h-8 pl-2 font-bold bg-yellow-400 main">
                          ₹{data.circles[0].circles[0].productPrice}
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 flex items-center justify-end h-full pr-1 border-l border-gray-200">
                        <Image
                          className="flex ml-2"
                          src="/icon/arrow_right.svg"
                          height={20}
                          width={20}
                          alt="arrow"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className={`${navigationVisible ? "block" : "hidden"}`}>
          <Image
            src="/icon/arrow_right.svg"
            width={30}
            height={30}
            alt="arrow"
            className={`swiper-button-next sm:-translate-y-[150px]`}
          />
        </div>
      </Swiper>
    </div>
  );
}
