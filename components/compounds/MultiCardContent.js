import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./../Imagechanger/styles.css";

const MultiCardContent = (props) => {
  const { key, iconPath, iconSize, title, text, addIconSize } = props;
  return (
    <div className=" relative  h-[300px] sm:w-[300px] w-[90%] p-2 sm:mb-24 mb-10">
      <div className="mt-8 ml-6">
        <Image src={iconPath} width={iconSize} height={iconSize} alt="image" />
      </div>
      <h2 className="text-xl font-medium ml-6 mr-12">{title}</h2>
      <div className="mt-2 ml-6 mr-12 mb-12">{text}</div>

      <div className="absolute bottom-1 right-4 mb-8">
        <Image
          src="/MultiCardIcons/add-circle.svg"
          width={addIconSize}
          height={addIconSize}
          alt="add"
        />
      </div>
    </div>
  );
};

MultiCardContent.propTypes = {
  iconPath: PropTypes.string,
  iconSize: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  addIconSize: PropTypes.number,
};

MultiCardContent.defaultProps = {
  iconPath: PropTypes.string,
  iconSize: 52,
  title: "title",
  text: "text",
  addIconSize: 34,
};

export default MultiCardContent;
