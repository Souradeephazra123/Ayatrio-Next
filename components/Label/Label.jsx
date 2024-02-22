import React from "react";
import "./styles.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Label = () => {
  const circled = [
    {
      top: 50,
      left: 68,
      productTitle: "Bedroom...",
      productCategory: "Mountain view",
      price: 1900,
    },
  ];
  const router = useRouter();
  const handleTab = () => {
    router.push("/room");
  };
  return (
    <div>
      <div className=" bg-white h-3 w-3 absolute rounded-full carcular-ui">
        <div
          className={`flex-row z-10 mt-5 box-container-product w-fit h-auto flex items-center  bg-white cursor-pointer`}
          onClick={handleTab}
        >
          <div className="flex flex-row relative">
            {circled.map((data, idx) => (
              <div
                className="flex flex-col basis-3/4 w-24 flex-grow relative p-2.5 mr-1"
                key={idx}
              >
                <h2 className="font-bold pt-1 pr-2">{data.productTitle}</h2>
                <p className="font-normal pb-2">{data.productCategory}</p>
                <p className="font-bold bg-yellow-400 h-8 w-16 pl-2 main">
                  ₹{data.price}
                </p>
              </div>
            ))}
            <div className="flex basis-1/4 w-8 top-16 border-l border-zinc-200">
              <Image
                className="flex ml-2 mr-2 object-none"
                src="/svg/dropdown/nextarrow.png"
                height={20}
                width={20}
                alt="arrow"
                
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;
