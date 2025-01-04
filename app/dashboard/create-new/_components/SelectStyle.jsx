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
    <div>
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500 ">Select Your Video Style?</p>
      <div>
        {styleOptions.map((item,index)=>(
            <div>
                <Image src={item.image} width={100}  height={100} alt={item.name}/>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
