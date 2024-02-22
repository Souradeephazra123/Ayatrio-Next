import React, { useState } from "react";
import "./imagecaresoul.css"; // Assuming your CSS file is named Carousel.css
import Image from "next/image";
const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    let index = activeIndex;
    let length = images.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    goToSlide(index);
  };

  const goToNextSlide = () => {
    let index = activeIndex;
    let length = images.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    goToSlide(index);
  };

  const [touchPosition, setTouchPosition] = useState(null); // New state for tracking touch position
  // Function to handle the start of a touch
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  // Function to handle the end of a touch
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      goToNextSlide();
    }

    if (diff < -5) {
      goToPrevSlide();
    }

    setTouchPosition(null);
  };

  return (
    <section aria-label="Newest Photos" className="sm:hidden block h-[80vh] ">
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ul>
          {images?.map((src, index) => (
            <li
              key={src}
              className={`slide ${index === activeIndex ? "active" : ""}`}
            >
              <Image
                src={src}
                alt=""
                width={720}
                height={600}
                className=" w-[80vw] h-[30rem] object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="indicators flex items-center mt-[10rem]">
        {images?.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === activeIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
