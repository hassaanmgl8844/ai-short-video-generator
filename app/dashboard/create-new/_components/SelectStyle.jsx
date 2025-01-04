import Image from "next/image";
import React from "react";

const SelectStyle = () => {
  const styleOptions = [
    {
      name: "Realstic",
      image: "/real.jpeg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpg",
    },
    {
      name: "Comic",
      image: "/comic.webp",
    },
    {
      name: "WaterColor",
      image: "/WaterColor.jpg",
    },
    {
      name: "GTA",
      image: "/gta.jpg",
    },
  ];
  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500 ">Select Your Video Style?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, index) => (
          <div className="relative hover:scale-105 transition-all">
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="h-48 object-cover rounded-lg w-full"
            />
            <h2 className="absolute p-1 bg-black text-white text-center rounded-b-lg bottom-0 w-full">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
