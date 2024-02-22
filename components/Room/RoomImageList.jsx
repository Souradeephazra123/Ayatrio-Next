import React from "react";
import Image from "next/image";

import "./styles.css";

export default function RoomImageList({ images }) {
  return (
    <>


      <div className="imggallery mt-[50px] sm:h-[55vh] w-[60vw]">
        <div className="sm:grid hidden sm:grid-cols-2 sm:grid-rows-2 gap-3">
          {images?.map((image, index) => (
            <div key={index} className={`sm:col-span-1 sm:row-start-${index + 1}`}>
              <Image
                src={image}
                alt={`Room Image ${index + 1}`}
                width={720}
                height={480}
                className="sm:w-full w-[80vw] h-[22rem] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
