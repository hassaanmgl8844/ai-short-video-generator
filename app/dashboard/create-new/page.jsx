"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const scriptData =
  'A person sits on their bed, scrolling through their phone in a dimly lit room. The phone buzzes, and they see a notification: "Message from yourself." Confused, they open it to find a photo of themselves sitting on the bed, exactly as they are now. Nervously, they glance around the room but see nothing unusual. The phone buzzes again with a new message: "Look behind you." Their breathing quickens as they slowly turn to look behind them, finding only an empty hallway. Turning back to their phone, trembling, they mutter, "This isn&apos;t funny..." Another buzz comes through: "You have 10 seconds." Panic sets in as they drop the phone, which now displays a countdown: 10... 9... 8... Frozen in fear, they watch the numbers tick down until it reaches 1. The screen goes black, and the room is plunged into silence. A faint whisper echoes: "Time&apos;s up." The screen cuts to black.';
const FILEURL =
  "https://firebasestorage.googleapis.com/v0/b/tubeguruji/ps.appspot.com/o/ai-short-video-files%2F1e23f618-f8d2-4762-a0a8-ef/21529.mp3?alt=media&token=2756b6f9-c0f2-4385-9cdb-d0f1e3cf89af";

const videoSCRIPT = [
  {
    imagePrompt:
      "Sweeping aerial shot of the Roman Forum, bustling with activity, signs of wealth and power.",
    ContentText:
      "The heart of Rome, teeming with life and ambition, yet rotting from within.",
  },
  {
    imagePrompt:
      "Close-up of Cato's stoic face, weathered and determined, Roman senator robes.",
    ContentText:
      "A face etched with principle, unyielding in the face of corruption.",
  },
];

const CreateNew = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL);
    // GenerateImage();
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
        console.log("EXE");
        setVideoScript(resp.data.result);
        resp.data.result && GenerateAudioFile(resp.data.result);
      });
  };

  // Get Audio File and Save to Firebase Storage
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setAudioFileUrl(resp.data.result);
    resp.data.result && GenerateAudioCaption(resp.data.result, videoScriptData);
  };

  // Used to Generate Caption From AUDIO File
  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);

    const resp = await axios.post("/api/generate-captions", {
      audioFileUrl: fileUrl,
    });
    setCaptions(resp?.data?.result);
    console.log(resp.data.result);
    resp.data.result && (await GenerateImage(videoScriptData));
  };

  // Used to Generate AI Images
  const GenerateImage = async (videoScriptData) => {
    let images = [];
    setImageList(images);
    setLoading(false);
  };

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
