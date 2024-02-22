import React from "react";
import data from "./CategoryText.json";
const Products = ({ filteredProductData, heading }) => {
  // console.log("Filtered products:", filteredProductData);
  console.log(
    "this is from product.jsx filterdata",
    filteredProductData.length > 0 && filteredProductData[0].category
  );
  // console.log("data from categorydata.json", data);

  // Use the first product's category as the main heading
  const mainCategory =
    filteredProductData.length > 0
      ? filteredProductData[0].category
      : "Products";

  return (
    <div className="relative top-20 sm:px-[50px] px-[20px] ">
      {/* main heading of pdt */}
      <h1 className="text-3xl font-bold mb-10">{heading}</h1>
      {/* img of product using flex and a fix width */}
      <div className="flex flex-row gap-3 sm:w-[65vw] sm:overflow-x-hidden overflow-x-auto mb-16">
        {filteredProductData.map((product, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {/* Assuming the first image from the images array is used */}
            <img
              className="sm:min-w-[120px] sm:h-[70px] min-w-[120px] h-[70px]"
              src={product.images[0]}
              alt={product.productTitle}
            />
            <p>{product.productTitle}</p>
          </div>
        ))}
      </div>

      {/* relevant text */}
      <p className="sm:w-[50vw] w-[100%] text-base text-justify">
        {data
          .filter((item) => item.category === heading)
          .map((item) => item.text)}
      </p>
    </div>
  );
};

export default Products;
