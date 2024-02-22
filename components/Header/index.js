"use client";
import React from "react";
import "./styles.css";
import SearchModal from "./MobileSearch";
import Menu from "./menu";
import { useEffect, useState } from "react";

import Expandedbar from "./Expandedbar";

import TopLoader from "../AddOn/TopLoader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";
// import NextTopLoader from "nextjs-toploader";

function Header({ howMuchScrolled }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchEngine, SetSeacrhEngine] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);
  const handleLoginNav = () => {
    router.push("/login");
  };
  const handleProfileNav = () => {
    // console.log("Profile");
    handleLinkClick("/login");
  };
  const onClose = () => {
    setSearchQuery("");
    SetSeacrhEngine("");
  };
  const loginStatus =
    typeof window !== "undefined" ? localStorage.getItem("Login") : null;

  const [isLoading, setIsLoading] = useState(false);
  const handleLinkClick = (path) => {
    // console.log(isLoading);
    setIsLoading(true);
    // console.log(isLoading);
    setTimeout(() => {
      router.push(path);
      setIsLoading(false);
    }, 1310);
  };

  const [isModalOPen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = (event) => {
    event.stopPropagation();
    setModalOpen(false);
    onClose();
  };

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

  const homeRoute = "/home";

  return (
    <div>
      {/* <NextTopLoader zIndex={999999}  /> */}
      {homeRoute === pathname && typeof window !== "undefined" ? (
        typeof window !== "undefined" && window.scrollY < 20 ? (
          <TopHeader />
        ) : null
      ) : null}
      <div
        className={`fixed w-full sm:bg-none ${
          homeRoute === pathname
            ? typeof window !== "undefined" && window.scrollY < 20
              ? "sm:top-[30px] top-[35px]"
              : "top-0"
            : "top-0"
        } z-[99999]
       ${isScrolled ? "bg-white" : "bg-white"} 
      
      
      ${isFilterVisible ? "block" : "hidden"}
      `}
      >
        {/* {isLoading && <TopLoader />} */}
        {!searchQuery ? (
          <div
            className={`${
              isScrolled ? "border-b-[0.5px] border-slate-200" : ""
            }  flex flex-row justify-between items-center py-[3px] sm:px-[30px] px-[10px] py-0`}
          >
            <div className="flex flex-row items-center justify-start w-1/3 gap-1 sm:gap-5 ">
              <div className="profile-menu font-bold p-[9px] hover:bg-zinc-100 hover:rounded-full">
                <Menu />
              </div>
              {/* for only mobile search */}

              <div
                className="sm:hidden block  w-10 h-10 p-[7px]"
                onClick={handleModalOpen}
              >
                <Image
                  src="/svg/icon/search.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="header-div-icon"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-1/3">
              <div className="mainlogo">
                <Link href="/">
                  <Image
                    src="/images/ayatriologo.webp"
                    alt="logo"
                    width={300}
                    height={40}
                    priority
                    className="p-2 sm:w-44"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end w-1/3 gap-2">
              <div
                onClick={handleModalOpen}
                className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer sm:block hidden"
              >
                <Image
                  src="/svg/icon/search.svg"
                  alt=""
                  className="absolute z-10 seachbar-div2-icon"
                  width={27}
                  height={27}
                />
              </div>
              <div className="sm:block hidden w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                <Link href={"/login"}>
                  <Image
                    src="/svg/icon/like.svg"
                    alt=""
                    className="header-div-icon"
                    width={22}
                    height={22}
                  />
                </Link>
              </div>
              <div className="w-10 h-10 p-[9px] hover:bg-zinc-100 hover:rounded-full cursor-pointer">
                <Link href={"/cart"}>
                  <Image
                    src="/svg/icon/adtocart.svg"
                    alt=""
                    className="header-div-icon"
                    width={22}
                    height={22}
                  />
                </Link>
                <div className="cart-notification">3</div>
              </div>
              {loginStatus === "true" ? (
                <div
                  className="pro flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap "
                  onClick={handleProfileNav}
                >
                  <Image
                    src="/svg/icon/profile.svg"
                    alt=""
                    className="header-div-icon"
                    width={22}
                    height={22}
                  />
                </div>
              ) : (
                <div
                  className="pro flex p-[9px] hover:bg-zinc-100 hover:rounded-full whitespace-nowrap cursor-pointer "
                  onClick={handleProfileNav}
                >
                  <Image
                    src="/svg/icon/profile.svg"
                    onClick={handleLoginNav}
                    alt=""
                    width={20}
                    height={20}
                    className="header-div-icon"
                  />
                </div>
              )}
              {/* for only mobole search */}
              {isModalOPen && (
                /* <SearchModal
                isOpen={isModalOPen}
                onClose={handleModalClose}
                onSearch={(e) =>
                  dispatch(searchProductsRequest(e.target.value))
                }
              /> */
                <Expandedbar
                  searchQuery={searchQuery}
                  onClose={handleModalClose}
                  onSearch={handleSearchChange}
                />
              )}
            </div>
          </div>
        ) : (
          <Expandedbar
            searchQuery={searchQuery}
            onClose={onClose}
            onSearch={handleSearchChange}
          />
        )}
      </div>
    </div>
  );
}
export default Header;
