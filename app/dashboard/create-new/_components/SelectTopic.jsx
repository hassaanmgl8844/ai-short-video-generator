import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectTopic = () => {
    const options=['Custom Prompt','Random AI Story','Scary Story','Historical Facts','Bed Time Story','Motivational','Fun Facts']
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500 ">What is the topic of your video?</p>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
            {options.map((item,index)=>(
                <SelectItem key={index} value={item}>{item}</SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTopic;
