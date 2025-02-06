// import textToSpeech from "@google-cloud/text-to-speech";
// import { NextResponse } from "next/server";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { initializeApp } from "firebase/app";

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "anime-px.firebaseapp.com",
//   projectId: "anime-px",
//   storageBucket: "anime-px.appspot.com",
//   messagingSenderId: "693612741676",
//   appId: "1:693612741676:web:5fb52a39fede7e1ac7fd89",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);

// // Initialize Google Text-to-Speech Client
// const client = new textToSpeech.TextToSpeechClient();

// export async function POST(req) {
//   try {
//     const { text, id } = await req.json();
//     const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");

//     const request = {
//       input: { text },
//       voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
//       audioConfig: { audioEncoding: "MP3" },
//     };

//     // Perform the text-to-speech request
//     const [response] = await client.synthesizeSpeech(request);

//     // Convert response to Uint8Array for Firebase Storage
//     const audioBuffer = new Uint8Array(response.audioContent);

//     // Upload audio to Firebase Storage
//     await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

//     // Get the download URL
//     const downloadUrl = await getDownloadURL(storageRef);
//     console.log("Download URL:", downloadUrl);

//     return NextResponse.json({ result: downloadUrl });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import textToSpeechClient from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import fs from "fs";
import util from "util";
import { getDownloadURL, ref, storage } from "firebase/storage";

const client = new textToSpeechClient.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();
  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");
  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response.audioContent, "binary");

  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

  const downloadUrl = await getDownloadURL(storageRef);
  console.log(downloadUrl);

  // console.log("Audio content written to file: output.mp3");

  return NextResponse.json({ Result: downloadUrl });
}
