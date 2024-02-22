import React from "react";
import "@/components/Product/styles.css";
import Image from "next/image";

const TabsProductContent = (props) => {
  const {
    key,
    commonClasses,
    filterName,
    isFilterOpen,
    handleAll,
    handleTabClick,
    handleFilter,
    handleAllFilter,
    filterArr,
    renderFilter,
    openContent,
    handleContent,
    typeContent,
    renderTypeContent,
    stickyDrop,
  } = props;

  return (
    <>
      <div className="flex flex-col w-fit">
        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth <= 450) {
              handleAll();
              handleTabClick();
              handleAllFilter();
            } else {
              handleFilter();
              handleTabClick();
            }
          }}
          className={`bg-gray-100
                  ${
                    isFilterOpen
                      ? `relative active-tabs z-10 border border-black ${commonClasses}`
                      : `relative tabS  border border-white ${commonClasses}`
                  }
                  ${() =>
                    typeof window !== "undefined" && window.innerWidth <= 450
                      ? " justify-center"
                      : " justify-between"}
                  `}
        >
          {filterName} &nbsp;
          <Image
            src="/svg/dropdown/backarrow.svg"
            width={40}
            height={40}
            className={`w-6 h-6  mt-1 sm:block hidden
                ${isFilterOpen ? " rotate-90" : "-rotate-90"}
                
                `}
            alt=""
          />
        </button>
        {isFilterOpen ? (
          <div className="flex z-10 top-[65px] flex-col px-5 py-5 overflow-y-auto bg-white border gap-7 rounded-2xl w-72 h-80 absolute">
            {filterArr.map(renderFilter)}
            {filterName === "Type" ? (
              <button
                className={`text-left underline
                  ${openContent ? "hidden" : "block"}
                  `}
                onClick={handleContent}
              >
                +7 more
              </button>
            ) : null}
            {openContent ? typeContent.map(renderTypeContent) : null}

            {filterName === "Type" && openContent ? (
              <button
                onClick={handleContent}
                className={`text-left underline ${
                  openContent ? "block" : "hidden"
                }`}
              >
                Less
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TabsProductContent;
