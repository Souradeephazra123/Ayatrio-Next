"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import "../styles/virtualexperience.css";
import { dataRooms } from "@/Model/data";
import { datarooms, dataTiles, colorTiles } from "@/Model/sampledata";
import { selectVirtualData } from "@/components/Features/Slices/virtualSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const FreeSample = () => {
  const [catdatas, setcatDatas] = useState([]);
  const dataSelector = useSelector(selectVirtualData);
  console.log("dataSelector", dataSelector);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCircle, setShowCircle] = useState(false);
  const [showbuttoncontent, setShowbuttoncontent] = useState(false);
  const [count, setCount] = useState(0);
  const [roomstate, setRoomstate] = useState("");
  const [colorstate, setColorstate] = useState("");
  const search = useSearchParams();
  const rooms = [
    { title: "All" },
    { title: "Living Room" },
    { title: "Kids Room" },
    { title: "Dinning Room" },
    { title: "Bedroom" },
    { title: "Kitchen" },
    { title: "Pooja Room" },
    { title: "Guest Room" },
    { title: "Office Room" },
    { title: "Balcony" },
    { title: "Bathroom" },
  ];
  const colors = [
    { title: "All" },
    { title: "Sky Blue" },
    { title: "Forest Green" },
    { title: "Sunset Orange" },
    { title: "Rose Pink" },
    { title: "Charcoal Gray" },
  ];
  const [style, setStyle] = useState("");

  const [selectedPage, setSelectedPage] = useState("vrooms");

  const searchparams = useSearchParams();
  const searchtext = searchparams.get("search1");
  // console.log("searchtext", searchtext);
  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const handleSelect = () => {
    setShowCircle(!showCircle);
  };

  const handleClick = (roomId, roomPrice, roomTitle, roomImage) => {
    setSelectedActivity((prevSelectedRooms) => {
      if (prevSelectedRooms[roomId]) {
        const updatedSelectedRooms = { ...prevSelectedRooms };
        delete updatedSelectedRooms[roomId];
        return updatedSelectedRooms;
      } else {
        return {
          ...prevSelectedRooms,
          [roomId]: {
            id: roomId,
            price: roomPrice,
            title: roomTitle,
            image: roomImage,
          },
        };
      }
    });

    // Toggle showCircle state
    setShowCircle((prevShowCircle) => !prevShowCircle);
    // Toggle showButtonContent state
    setShowbuttoncontent((prevShowButtonContent) => !prevShowButtonContent);

    // Update selectedImage state
    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === roomImage ? null : roomImage
    );
  };

  const handleres = (roomId, roomPrice, roomTitle, roomImage) => {
    setSelectedActivity((prevSelectedRooms) => {
      if (prevSelectedRooms[roomId]) {
        // Unselect the room
        const updatedSelectedRooms = { ...prevSelectedRooms };
        delete updatedSelectedRooms[roomId];

        // Decrease the count
        setCount((prev) => prev - 1);
        return updatedSelectedRooms;
      } else {
        // Select the room
        setCount((prev) => prev + 1);

        return {
          ...prevSelectedRooms,
          [roomId]: {
            id: roomId,
            price: roomPrice,
            title: roomTitle,
            image: roomImage,
          },
        };
      }
    });

    // Toggle showCircle state
    setShowCircle((prevShowCircle) => !prevShowCircle);

    // Toggle showButtonContent state
    setShowbuttoncontent((prevShowButtonContent) => !prevShowButtonContent);
  };
  console.log(search.get("category"));
  useEffect(() => {
    if (dataSelector && search.get("category")) {
      let tempData = dataSelector?.filter(
        (item) => item.category === search.get("category")
      );
      setcatDatas(tempData);
      // console.log("tempData", tempData);
    }
  }, [dataSelector]);
  useEffect(() => {
    let dataArray = Array.isArray(catdatas) ? catdatas : [catdatas];
    console.log("dataArray", dataArray);
  }, [catdatas]);

  const router = useRouter();
  const handleAddress = () => {
    router.push("/cart");
  };
  const [status, setStatus] = useState("");

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`;
  const [sdata, setsData] = useState("");
  useEffect(() => {
    const fetchedItems = async () => {
      try {
        setStatus("loading");
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error("HTTP status" + response.status);
        }
        setsData((prevData) => {
          const newData = response.data[0].categories;
          if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
            return newData;
          } else {
            return prevData;
          }
        });
        setStatus("succeeded");
      } catch (error) {
        console.error("Error ocurrs here", error);
        setStatus("failed");
      }
    };
    fetchedItems();
  }, []);
  let url2 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`;
  const [data, setData] = useState("");
  const [datastat, setDatastat] = useState("");
  useEffect(() => {
    const fetchedpdt = async () => {
      try {
        setDatastat("loading");
        const response = await axios.get(url2, {
          params: {
            limit: 100,
          },
        });
        if (response.status !== 200) {
          throw new Error("HTTP status" + response.status);
        }
        setData((prevData) => {
          const newData = response.data;
          if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
            return newData;
          } else {
            return prevData;
          }
        });
        setDatastat("succeeded");
      } catch (error) {
        console.error("Error ocurrs here", error);
        setDatastat("failed");
      }
    };
    fetchedpdt();
  }, []);

  useEffect(() => {
    // console.log("the data from products", data);
  }, [data]);
  // const filteredProducts = data.filter(
  //   (product) =>
  //     (!roomstate || product.roomCategory === roomstate) &&
  //     (!colorstate || product.colors.includes(colorstate))
  // );

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Check if data is an array before attempting to filter
    if (!Array.isArray(catdatas)) {
      console.error("Data is not an array:", catdatas);
      return;
    }
    // Apply filtering based on roomstate and colorstate
    const filteredResults = catdatas.filter((item) => {
      const isRoomMatch =
        roomstate === "All" ||
        (item.rooms &&
          item.rooms.some((room) => {
            const roomTitle = room.title.toLowerCase().trim(); // Normalize title for comparison
            const selectedRoom = roomstate.toLowerCase().trim(); // Normalize selected room
            console.log("Room Comparison:", roomTitle, selectedRoom);
            return roomTitle === selectedRoom;
          }));
      const isColorMatch =
        colorstate === "All" ||
        (item.color &&
          item.color.some((color) => {
            const colorTitle = color.title.toLowerCase().trim(); // Normalize title for comparison
            const selectedColor = colorstate.toLowerCase().trim(); // Normalize selected color
            console.log("Color Comparison:", colorTitle, selectedColor);
            return colorTitle === selectedColor;
          }));

      return isRoomMatch && isColorMatch;
    });

    console.log("Filtered Results:", filteredResults);
    // Update the filtered data state
    setFilteredData(filteredResults);
  }, [roomstate, colorstate, catdatas]);

  //posting to order api
  if (typeof window !== "undefined") {
    var id = localStorage.getItem("deviceId");
    // console.log("deviceId : ", id);
  }
  const posturl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order`;

  const postproductdata = async (postData) => {
    try {
      const response = await axios.post(posturl, postData);

      if (response.status !== 200) {
        throw new Error("HTTP status" + response.status);
      }

      // console.log("Data posted successfully:", postData);
    } catch (error) {
      console.error("Error posting room data:", error);
    }
  };

  useEffect(() => {
    console.log("filteredData", filteredData);
  }, [catdatas]);
  const handleClickDB = async () => {
    try {
      const selectedProduct = Object.values(selectedActivity)[0];

      if (!selectedProduct || !selectedProduct.id) {
        console.error("Invalid product details");
        return;
      }

      const postData = {
        deviceId: id,
        productId: selectedProduct.id,
      };

      // Post data to the database
      await postproductdata(postData);

      // Redirect to the checkout page
    } catch (error) {
      console.error("Error handling click:", error);
    }
  };

  return (
    <div className="sm:m-[3rem] m-0 px-[20px]">
      <div className="relative">
        <Image
          src="/customerservice/shoppingInfo/shop.avif"
          height={500}
          width={1200}
          alt="sample"
          className="h-[34rem] relative flex object-cover"
        />
        <div className="absolute top-0 left-0 flex flex-col sm:w-1/4 w-1/2 bg-zinc-100 h-max m-8 sm:p-12 p-2 sm:pt-12 pt-3">
          <div className="sm:text-4xl text-2xl font-bold sm:mb-4 mb-0 sm:mt-0 mt-10">
            Free
            <br />
            Samples
          </div>
          <div className="mb-8">
            There is a floor for every style and budget and finding the right
            one has never been easier with our free flooring samples. We offer
            hundreds of samples to choose from, making it easy to find the right
            floor.
          </div>
          <div>
            <button className="bg-stone-700 rounded-md text-white pl-5 pr-5 pt-3 pb-3 text-sm">
              SHOP FREE SAMPLES
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        {/* shop by room */}
        <div className="">
          <div className="text-3xl font-bold flex justify-center items-center mt-12">
            Shop Flooring by Room
          </div>
          <div className="py-4 relative w-full h-full flex flex-col  justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
              {catdatas && catdatas[0] && catdatas[0].rooms ? (
                catdatas[0].rooms.map((item, idx) => (
                  <div
                    key={item._id}
                    className=" relative  overflow-hidden m-1  group rounded-2xl"
                  >
                    <div
                      onClick={() => {
                        setRoomstate(item.title);
                      }}
                      style={{ width: "272px", height: "150px" }}
                      className={` rounded-2xl object-cover w-full opactiy-100 h-full block p-1
             bg-gray-500
             ${roomstate === item.title ? " border-2 border-black " : ""}
              `}
                    >
                      <Image
                        src={item.img}
                        alt="image1"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <h3
                      className={` p-1 rounded-sm absolute right-0 bottom-0
              ${
                roomstate === item.title
                  ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                  : "bg-white"
              }
              `}
                    >
                      {item.title}
                    </h3>

                    {roomstate === item.title && (
                      <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                        <div className="circle-container relative flex justify-center items-center rounded-full bg-none">
                          <Image
                            src="/svg/icon/tick.svg"
                            alt="tick"
                            width={30}
                            height={30}
                            className=" opacity-100 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="">
                  No data is available here.Please select go back and select
                  catogory
                </p>
              )}
            </div>
          </div>
        </div>

        {/* shop by color */}

        <div>
          <div className="text-3xl font-bold flex justify-center items-center mt-12">
            Shop Flooring by Color
          </div>
          <div className="py-4 relative w-full h-full flex flex-col justify-center">
            <div className="grid  sm:grid-cols-4 grid-cols-2 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
              {catdatas && catdatas[0] && catdatas[0].color ? (
                catdatas[0].color.map((item) => (
                  <div
                    key={item._id}
                    className=" relative  overflow-hidden m-1 aspect-w-16 aspect-h-9 group sm:w-[200px] w-[170px] h-[150px]"
                  >
                    <div
                      onClick={() => {
                        setColorstate(item.title);
                      }}
                      className={` rounded-2xl object-cover w-full opactiy-100 h-full block p-1
             
 ${colorstate === item.title ? " border-2 border-black " : ""}

              bg-gray-400`}
                    >
                      <Image
                        src={item.img}
                        alt="image2"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>

                    <h3
                      className={` p-1 rounded-sm absolute right-0 bottom-0
              ${
                colorstate === item.title
                  ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                  : "bg-white"
              }
              `}
                    >
                      {item.title}
                    </h3>

                    {colorstate === item.title && (
                      <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                        <div className="circle-container relative flex justify-center items-center">
                          <Image
                            src="/svg/icon/tick.svg"
                            alt="tick"
                            width={30}
                            height={30}
                            className=" opacity-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>
                  Either there are no color in this category or select category
                </p>
              )}
            </div>
          </div>
        </div>

        {/* selected data */}
        <div>
          <div className="text-xl font-bold flex justify-center items-center mt-12">
            Styles we think you'll love
          </div>
          <div className="flex flex-row sticky top-0 pt-3 pb-2 bg-white z-10">
            <div className="text-red-400">
              *Select at least 4 images to proceed
            </div>
            <button
              className={`ml-auto text-white rounded-full pt-2 pb-2 pl-4 pr-4 ${
                count < 8 ? "bg-gray-200" : "bg-black"
              }`}
              disabled={count < 8}
              onClick={handleAddress}
            >
              Apply filter
            </button>
            {/* <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "freesample",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white sm:w-40 w-40 sm:h-16 h-8 rounded-full hover:bg-gray-900 transition duration-300">
                Free Sample
              </button>
            </Link> */}
            {/* <Link
              href={{
                pathname: "/checkout",
                query: {
                  search: "freedesign",
                },
              }}
              className="memberCheckout my-4 flex items-center justify-center"
            >
              <button className="bg-black text-white sm:w-40 w-40 sm:h-16 h-8 rounded-full hover:bg-gray-900 transition duration-300">
                Free Design
              </button>
            </Link> */}
          </div>
          {/* {selectedImage ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
              {dataRooms.map((item) => (
                <div
                  key={item._id}
                  className=" relative  overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    onClick={() => {
                      handleres(item._id, item.img, item.price, item.title);
                      handleSelect();
                    }}
                    className={`room-item rounded-2xl object-cover w-full opactiy-100 h-full block p-1
             
            ${selectedActivity[item._id] ? " " : "overlay z-10 "}  ${
                      selectedActivity[item._id]
                        ? " border-2 border-black "
                        : ""
                    }

              `}
                  />

                  <h3
                    className={` p-1 rounded-sm absolute right-0 bottom-0
              ${
                selectedActivity[item._id]
                  ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                  : "bg-white"
              }
              `}
                  >
                    {item.title}
                  </h3>

                  {selectedActivity[item._id] && (
                    <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                      <div className="circle-container relative flex justify-center items-center">
                        <Image
                          src="/svg/icon/tick.svg"
                          alt="tick"
                          width={30}
                          height={30}
                          className=" opacity-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )} */}
        </div>

        <div>
          {/* ... (your existing JSX) */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1 mb-4 my-0 mx-2">
              {filteredData.map((item) => (
                <div
                  key={item._id}
                  className=" relative  overflow-hidden m-1 aspect-w-16 aspect-h-9 group"
                >
                  {/* Your existing code for displaying product images */}
                  <img
                    src={item.images} // Assuming the first image is used
                    alt={item.productTitle}
                    onClick={() => {
                      handleres(
                        item.productId,
                        item.images[0],
                        item.perUnitPrice,
                        item.productTitle
                      );
                      handleSelect();
                    }}
                    className={`room-item rounded-2xl object-cover w-full opactiy-100 h-full block p-1
                    ${
                      selectedActivity[item.productId] ? " " : "overlay z-10 "
                    }  ${
                      selectedActivity[item.productId]
                        ? " border-2 border-black "
                        : ""
                    }
                  `}
                  />

                  {/* Your existing code for displaying product title */}
                  <h3
                    className={` p-1 rounded-sm absolute right-0 bottom-0
                    ${
                      selectedActivity[item.productId]
                        ? "font-semibold text-white absolute left-2 bottom-2 bg-transparent"
                        : "bg-white"
                    }
                  `}
                  >
                    {item.productTitle}
                  </h3>

                  {/* Your existing code for displaying the tick icon */}
                  {selectedActivity[item.productId] && (
                    <div className="room-item absolute top-2 right-2 z-10  flex items-center opacity-50 justify-center">
                      <div className="circle-container relative flex justify-center items-center">
                        <Image
                          src="/svg/icon/tick.svg"
                          alt="tick"
                          width={30}
                          height={30}
                          className=" opacity-100"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>No products found based on selected filters.</div>
          )}
        </div>
        <Link
          href={{
            pathname: "/checkout",
            query: {
              search: "freesample",
            },
          }}
          className="memberCheckout my-4 flex items-center justify-center"
        >
          <button
            onClick={() => handleClickDB()}
            className="bg-black text-white sm:w-40 w-40 sm:h-16 h-8 rounded-full hover:bg-gray-900 transition duration-300"
          >
            Free Sample
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FreeSample;
