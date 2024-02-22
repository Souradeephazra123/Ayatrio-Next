"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Cards = dynamic(() =>
  import("../Cards").catch((err) => console.error(err))
);
const MobileSearchBar = dynamic(() =>
  import("../MobileSearch").catch((err) => console.error(err))
);
const Filter = dynamic(() =>
  import("../Filter").catch((err) => console.error(err))
);
const PopUp = dynamic(() =>
  import("../PopUp/PopUp").catch((err) => console.error(err))
);
const Expandedbar = dynamic(() =>
  import("../Header/Expandedbar").catch((err) => console.error(err))
);

const HomePage = () => {
  const router = useRouter();
  const onClose = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isFilterHovered, setFilteredContent] = useState(null);

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

  const popUp =
    typeof window !== "undefined" ? localStorage?.getItem("popUp") : null;

  const handleFilterHover = (content) => {
    setFilteredContent(content);
  };

  return (
    <>
      <div className="overflow-x-hidden fade-in">
        {popUp ? null : <PopUp />}
        {isFilterVisible && (
          <>
            {isSearchBarVisible && <Expandedbar onClose={onClose} />}
            <MobileSearchBar />
          </>
        )}
        <Filter
          isFilterHovered={isFilterHovered}
          onFilterHover={handleFilterHover}
        />
        <Cards />
        {isFilterVisible && (
          <div className="fixed-ayatrio-map">
            <button
              type="button"
              className="fixed sm:hidden flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] -bottom-3 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => router.push("/ayatrio-map")}
            >
              Map{" "}
              <Image
                width={25}
                height={25}
                src="/svg/icon/ayatrio_store.svg"
                alt=""
                className="header-div-sStore-icon"
              />
            </button>
            <button
              type="button"
              className="fixed sm:flex hidden leading-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] -bottom-3 text-white bg-[#222222] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-500"
              onClick={() => router.push("/ayatrio-map")}
            >
              Near Ayatrio{" "}
              <Image
                width={25}
                height={25}
                src="/svg/icon/ayatrio_store.svg"
                alt=""
                className="header-div-sStore-icon"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
