"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
 const [loading,setLoading]=useState(false);
 const [videoScript,setVideoScript] = useState();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Wriate a script to generate " +
      formData.duration +
      " video on topic : " +
      formData.topic +
      "  along with AI image prompt in " +
      formData.imageStyle +
      " format  for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain Text";
    console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        // console.log(resp.data.result);
        setVideoScript(resp.data.result);
        GenerateAudioFile();
      });
      setLoading(false);
  };

  const GenerateAudioFile=async(videoScriptData)=>{
    let script='';
    videoScriptData.forEach(item=>{
      script=script+item.ContentText+' ';
    })

    console.log(script);
    
  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic Component */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style Component  */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration Component  */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button  */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNew;
