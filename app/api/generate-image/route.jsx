import { getDownloadURL } from "firebase/storage";
import Replicate from "replicate";
import { NextResponse } from "next/server";
import axios from "axios";
import { storage } from "@/configs/FirebaseConfig";
import { uploadString } from "firebase/storage";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );
    console.log(output);

    // Save to Firebase
    const base64Image =
      "data:image/png;base64," + (await ConvertImage(output[0]));
    const fileName = "ai-short-video=files/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);

    return NextResponse.json({ result: downloadURL });
  } catch (e) {
    return NextResponse.json({ 'error': e });
  }
}

const ConvertImage = async (imageUrl) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const base64Image = Buffer.from(resp.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.log("Error:", error);
  }
};
