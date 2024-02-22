"use client";
import React, { useState, useEffect } from "react";
import "../MainSlider/Mainslidestyle.css";
import room from "@/public/images/room.webp";
import work from "@/public/images/work.webp";
import living from "@/public/images/living.webp";
import kitchen from "@/public/images/kitchen.webp";
import "./tabs.css";
import TabImage from "./TabImage";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Tabs = ({ data }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(data?.recommendations?.[0]?.recommendedProducts[0]?.roomCategory.toLowerCase());
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const thirdDiv = document.querySelector(".classic-tabs");

      if (thirdDiv) {
        const thirdDivTop = thirdDiv.getBoundingClientRect().top;
        const elementVisible =
          thirdDivTop <= 0 && thirdDivTop + thirdDiv.clientHeight > 0;
        setIsSticky(elementVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const uniqueRoomCategories = data?.recommendations?.[0]?.recommendedProducts
    .map((item) => item.roomCategory)
    .filter((item, i, ar) => ar.indexOf(item) === i);

  const tabsData = [];

  uniqueRoomCategories?.forEach((category) => {
    tabsData.push({
      key: category.toLowerCase(),
      label: category,
      img: data?.recommendations?.[0]?.recommendedProducts
        .find((item) => item.roomCategory === category)?.images[1],
    });
  });

  const tabImages = {};

  uniqueRoomCategories?.forEach((category) => {
    tabImages[category.toLowerCase()] = data?.recommendations?.[0]?.recommendedProducts
      .find((item) => item.roomCategory === category)?.images[1];
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTab = () => {
    router.push("/room");
  };

  return (
    <>
      <div className="mb-20 sm:px-[50px] px-[20px] py-20 h-full">
        <div>
          <h2 className="text-xl font-bold mb-5">More ideas and inspiration</h2>
        </div>
        <div
          className={` py-2.5 bloc-tabsnone flex flex-row tabcategory ${
            isSticky ? "sticky-tabcategory" : ""
          }`}
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          {tabsData.map((tab, i) => (
            <div
              key={i}
              className={` px-5 py-2 tabS cursor-pointer
            ${
              activeTab === tab.key
                ? "active-tabs  border border-black mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
                : "tabs  border border-white mr-2.5 rounded-full flex items-center justify-center bg-gray-100 whitespace-nowrap"
            }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="classic-tabs text-green-800 grid sm:grid-cols-3 grid-cols-2 gap-3 grid-rows-3">
          <TabImage
            width={450}
            height={700}
            src={tabImages[activeTab]}
            alt="Room"
            handleTab={handleTab}
          />

          <div className="overflow-hidden relative">
            <Image
              className="h-full w-full object-cover "
              src={tabImages[activeTab]}
              alt="Room"
              width={450}
              height={350}
            />
          </div>

          <TabImage
            src={tabImages[activeTab]}
            alt="Room"
            width={450}
            height={700}
            handleTab={handleTab}
          />
          <div className="overflow-hidden sm:hidden block">
            <Image
              className="h-full w-full object-cover "
              src={work}
              alt="Room"
            />
          </div>

          <TabImage
            src={tabImages[activeTab]}
            alt="Room"
            handleTab={handleTab}
            width={450}
            height={700}
          />
          <div className="overflow-hidden">
            <Image
              className="h-full w-full object-cover"
              src={tabImages[activeTab]}
              alt="Room"
              width={450}
              height={350}
            />
          </div>
          <div className="bg-teal-100 overflow-hidden ">
            <Image
              className="h-full w-full object-cover"
              src={tabImages[activeTab]}
              alt="Room"
              width={450}
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
