import React from "react";
import "../styles.css";
import Carous from "@/components/Carousel/Carous";
import Image from "next/image";
// const CustomStar = ({ color, ...props }) => (
//   <StarIcon style={{ color, fontSize: "16px" }} {...props} />
// );
const ratingsData = [
  {
    label: "Overall rating",
    value: (
      <div className="-ml-3 mt-3">
        {[5, 4, 3, 2, 1].map((number, index) => (
          <div
            key={index}
            className={`border mb-2 ${index === 0 ? "border-black bg-black" : "bg-gray-300"
              } rounded-full w-32 h-1.5 flex flex-row items-center ml-4 justify-start`}
          >
            <span className="-ml-3">{number}</span>
          </div>
        ))}
      </div>
    ),
    icon: null,
  },
  {
    label: "Cleanliness",
    value: "4.9",
    icon: <Image src="/rooms/cleanliness-icon.svg" width={36} height={36} alt="cleanliness" className="mt-5" />,
  },
  {
    label: "Accuracy",
    value: "5.0",
    icon: <Image src="/rooms/checkmark-icon.svg" width={36} height={36} alt="accuracy" className="mt-5" />,
  },
  {
    label: "Check-in",
    value: "4.9",
    icon: <Image src="/rooms/keys-icon.svg" width={36} height={36} alt="check in" className="mt-5" />,
  },
  {
    label: "Communication",
    value: "4.9",
    icon: <Image src="/rooms/message-icon.svg" width={36} height={36} alt="communication" className="mt-5" />,
  },
  {
    label: "Location",
    value: "4.0",
    icon: <Image src="/rooms/map-location-icon.svg" width={36} height={36} alt="map" className="mt-5" />,
  },
  {
    label: "Value",
    value: "5.0",
    icon: <Image src="/rooms/price-tag-icon.svg" width={36} height={36} alt="value" className="mt-5" />,
  },
];

const Reviews = ({ data }) => {
  return (
    <>
      <div className="py-12 border-t sm:w-auto w-[90vw] border-b overflow-x-hidden">
        <div>
          <div className="flex flex-col justify-center mx-auto">
            <div className="flex items-center justify-center overflow-hidden flex-row ">
              <img
                src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg"
                className="h-28"
                alt=""
                data-original-uri="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg"
              />
              <div className="text-[6rem] font-bold text-gray-700 pb-5">
                5.0
              </div>
              <img
                className="h-28"
                alt=""
                src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg"
                data-original-uri="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg"
              />
            </div>
            <div className="flex justify-center items-center flex-col ">
              <div className="text-xl font-bold -mt-5">Guest favourite</div>
              <div className="text-lg text-gray-500">
                One of the most loved homes on Airbnb
                <br />
                based on ratings, reviews, and reliability
              </div>
            </div>
          </div>
          <div className="rating-map flex flex-row justify-between mt-12 sm:w-auto w-[90vw] overflow-x-auto">
            {ratingsData.map((item, index) => (
              <div
                key={index}
                className={` basis-1/7 flex pr-6 ${index < ratingsData.length - 1
                  ? "border-r border-gray-400 h-32 "
                  : ""
                  }flex-col pl-6`}
              >
                {item.label}
                <div>{item.value}</div>
                <div>{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <hr />
        <h3 className="mb-1 text-xl font-semibold pt-4">2 reviews</h3>
        <span className="font-normal text-sm text-gray-500">
          Average rating will appear after 3 reviews
        </span>
        <div
          className="reviews-container mt-6 grid sm:grid-cols-2 grids-col-1 grid-rows-2 gap-4 mx-auto "
          style={{ overflowX: "hidden" }}
        >
          <div className="sm:mr-12 m-0 sm:block ">
            <div className="review-header flex">
              <div className="w-[48px] h-[48px] mr-4">
                <img
                  className="w-full h-full"
                  src="https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=M&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[16px]">Manas</span>
                <span className="font-normal text-[14px] text-gray-500">
                  India
                </span>
              </div>
            </div>
            <div className="ratings flex mt-3">
              {[1, 1, 1, 1, 1].map((item) => {
                return (
                  <Image
                    src="/rooms/star-black-filled-icon.svg"
                    width={15}
                    height={15}
                    alt="star"
                  />
                );
              })}
              <span className="text-sm font-semibold ml-2">October 2023</span>
            </div>
            <div className="review mt-2">
              <p className="text-gray-600 font-[16px] leading-6	mb-6 sm:w-auto text-left w-full">
                We really had an amazing experience. Totally worth the money
                paid. Amazing food and service. The care takers were very very
                helpful and didn't say no to anything. Must visit.
              </p>
            </div>
          </div>

          <div className="sm:mr-12 mr-0">
            <div className="review-header flex">
              <div className="w-[48px] h-[48px] mr-4">
                <img
                  className="w-full h-full"
                  src="https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=N&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[16px]">Nikhil</span>
                <span className="font-normal text-[14px] text-gray-500">
                  India
                </span>
              </div>
            </div>
            <div className="ratings flex mt-3">
              {[1, 1, 1, 1, 1].map((item) => {
                return (
                  <Image
                    src="/rooms/star-black-filled-icon.svg"
                    width={15}
                    height={15}
                    alt="star"
                  />
                );
              })}
              <span className="text-sm font-semibold ml-2">April 2023</span>
            </div>
            <div className="review mt-2">
              <p className="text-gray-600 font-[16px] leading-6	mb-6 text-left sm:w-auto w-[100%]">
                We really had an amazing experience. Totally worth the money
                paid. Amazing food and service. The care takers were very very
                helpful and didn't say no to anything. Must visit.
              </p>
            </div>
          </div>
          <div className="sm:mr-12 m-0 sm:block ">
            <div className="review-header flex">
              <div className="w-[48px] h-[48px] mr-4">
                <img
                  className="w-full h-full"
                  src="https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=M&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[16px]">Manas</span>
                <span className="font-normal text-[14px] text-gray-500">
                  India
                </span>
              </div>
            </div>
            <div className="ratings flex mt-3">
              {[1, 1, 1, 1, 1].map((item) => {
                return (
                  <Image
                    src="/rooms/star-black-filled-icon.svg"
                    width={15}
                    height={15}
                    alt="star"
                  />
                );
              })}
              <span className="text-sm font-semibold ml-2">October 2023</span>
            </div>
            <div className="review mt-2">
              <p className="text-gray-600 font-[16px] leading-6	mb-6 sm:w-auto text-left w-[100%]">
                We really had an amazing experience. Totally worth the money
                paid. Amazing food and service. The care takers were very very
                helpful and didn't say no to anything. Must visit.
              </p>
            </div>
          </div>

          <div className="sm:mr-12 m-0 sm:block ">
            <div className="review-header flex">
              <div className="w-[48px] h-[48px] mr-4">
                <img
                  className="w-full h-full"
                  src="https://a0.muscache.com/im/Portrait/Avatars/messaging/b3e03835-ade9-4eb7-a0bb-2466ab9a534d.jpg?im_policy=medq_w_text&im_t=M&im_w=240&im_f=airbnb-cereal-medium.ttf&im_c=ffffff"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[16px]">Manas</span>
                <span className="font-normal text-[14px] text-gray-500">
                  India
                </span>
              </div>
            </div>
            <div className="ratings flex mt-3">
              {[1, 1, 1, 1, 1].map((item) => {
                return (
                  <Image
                    src="/rooms/star-black-filled-icon.svg"
                    width={15}
                    height={15}
                    alt="star"
                  />
                );
              })}
              <span className="text-sm font-semibold ml-2">October 2023</span>
            </div>
            <div className=" mt-2">
              <p className="text-gray-600 font-[16px] leading-6	mb-6 sm:w-auto text-left w-[100%]">
                We really had an amazing experience. Totally worth the money
                paid. Amazing food and service. The care takers were very very
                helpful and didn't say no to anything. Must visit.
              </p>
            </div>
          </div>
        </div>
        <Carous data={data} />
      </div>
    </>
  );
};

export default Reviews;
