import React from "react";
import "./tabs.css";
import Image from "next/image";
import Label from "../Label/Label";
const TabImage = ({ src, alt ,width,height}) => {
  return (
    <div className="row-span-2 overflow-hidden relative">
      <Image className="h-full w-full object-cover" src={src} alt={alt}  width={width} height={height} />
      <div className="carcular-conui top-16 left-16  absolute rounded-full w-[30px] h-[30px]">
        <Label/>
        </div>
    </div>
  );
};

export default TabImage;
