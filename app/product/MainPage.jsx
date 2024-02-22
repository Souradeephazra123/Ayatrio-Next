"use client";
import Card from "@/components/Room/Other/Card";
import Reviews from "@/components/Room/Other/Reviews";
import RoomImageList from "@/components/Room/RoomImageList";
import RoomInfo from "@/components/Room/RoomInfo";
import React, { useEffect, useState } from "react";
import ImageCaresoul from "@/components/Room/imagecaresoul";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuantity,
  updateQuantity,
} from "@/components/Features/Slices/calculationSlice";
import {
  selectRoomData,
  setRoomData,
} from "@/components/Features/Slices/roomSlice";
import axios from "axios";
const RoomPage = () => {
  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity);
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=`;
  const [howMuchScrolled, setHowMuchScrolled] = useState(0);
  const [data, setData] = useState([]);
  const selectedData = useSelector(selectRoomData);
  // console.log("selectedData", selectedData);
  useEffect(() => {
    if (selectedData && Object.keys(selectedData).length !== 0) {
      sessionStorage?.setItem("roomData", JSON.stringify(selectedData));
    }
    if (sessionStorage?.getItem("roomData")) {
      let cachedData = JSON.parse(sessionStorage?.getItem("roomData"));
      setData(cachedData);
    }
  }, [selectedData]);
  // console.log(data)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHowMuchScrolled(window.scrollY);
      } else {
        setHowMuchScrolled(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [howMuchScrolled]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isFilterVisible, setIsFilterVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsFilterVisible(
        currentScrollPos <= prevScrollPos || currentScrollPos < 100
      );
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="container-rooms flex sm:block items-center ">

        <div className="sm:pl-[50px] sm:pr-0 px-[20px] mt-[65px]">
          <div className="flex sm:flex-row flex-col">
            <div className="sm:basis-2/3 flex flex-col  sm:flex-grow">
              <RoomImageList images={data?.images} />
              <ImageCaresoul images={data?.images} />
              <RoomInfo data={data} />
            </div>
            <div className="sm:basis-2/3 flex flex-col  ">
              <div className="sm:sticky flex top-9 mb-16 ml-0">
                <Card data={data} />
              </div>
            </div>
          </div>

          <Reviews data={data} />

        </div>
      </div>
    </>
  );
};

export default RoomPage;
