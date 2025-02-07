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
  {
    imagePrompt:
      "Chaotic civil war battlefield: Legionaries clashing, blood and dust, Cato observing with grim determination.",
    ContentText:
      "Brother against brother, the Republic tearing itself apart, Cato watches with a heavy heart.",
  },
  {
    imagePrompt:
      "Burning ruins of Utica, smoke billowing, Cato standing amidst the destruction, resolute.",
    ContentText:
      "The ashes of a fallen Republic, a final stand against the tide of tyranny.",
  },
  {
    imagePrompt:
      "Poignant image of Cato's suicide: a lone figure with a sword, about to fall on it, stark light, dramatic shadows.",
    ContentText:
      "Death before dishonor, a final act of defiance against a world he could no longer bear.",
  },
  {
    imagePrompt:
      "Tense negotiation in the Senate: close-ups of faces, sweat, anger, accusations flying.",
    ContentText:
      "The viper's nest of Roman politics, where alliances are forged and broken in the blink of an eye.",
  },
  {
    imagePrompt:
      "Shadowy meeting: conspirators whispering, dimly lit room, secrets being exchanged.",
    ContentText:
      "In the darkness, plans are hatched to undermine the very foundations of the Republic.",
  },
  {
    imagePrompt:
      "Cato's aging face in Utica: close-up, lines of weariness and determination, a mix of sadness and resolve in his eyes.",
    ContentText:
      "The weight of the world on his shoulders, a solitary figure facing the inevitable.",
  },
  {
    imagePrompt:
      "Sun-drenched North African landscape: vast and beautiful, contrasted with the turmoil in Cato's mind.",
    ContentText:
      "Even in the beauty of nature, Cato cannot escape the looming shadow of Rome's demise.",
  },
  {
    imagePrompt:
      "Stylized battle scene: opposing legions clashing, dramatic lighting, focus on dynamic movement and action.",
    ContentText:
      "The clash of armies, the death knell of the Republic's ideals.",
  },
  {
    imagePrompt:
      "Intense close-up of Cato and Caesar arguing: faces contorted with anger, sparks of animosity flying.",
    ContentText:
      "A clash of titans, two men locked in a struggle for the soul of Rome.",
  },
  {
    imagePrompt:
      "Dramatic slow-motion: Cato delivering a powerful speech to the Senate, audience captivated, lighting emphasizing his importance.",
    ContentText:
      "A voice of reason, drowned out by the clamor of ambition and greed.",
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

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((resp) => {
        setAudioFileUrl(resp.data.result);
        resp.data.result && GenerateAudioCaption(resp.data.result);
      });
    setLoading(false);
  };

  const GenerateAudioCaption = async (fileUrl) => {
    setLoading(true);
    console.log(fileUrl);

    await axios
      .post("/api/generate-captions", {
        audioFileUrl: fileUrl,
      })
      .then((resp) => {
        console.log(resp.data.result);
        setCaptions(resp?.data?.result);
        GenerateImage();
      });
    console.log(videoScript, captions, audioFileUrl);
  };

  const GenerateImage = () => {
    let images = [];
    videoScript.forEach(async (element) => {
      await axios
        .post("api/generate-image", {
          prompt: element?.imagePrompt,
        })
        .then((resp) => {
          console.log(resp.data.result);
          images.push(resp.data.result);
        });
    });
    console.log(images);
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
