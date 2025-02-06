import { AssemblyAI } from "assemblyai";

export async function POST(req) {
  const { audioFileUrl } = await req.json();
  const client = new AssemblyAI({
    apiKey: process.env.CAPTION_API,
  });

  const FILE_URL = audioFileUrl;

  const data = {
    audio: FILE_URL,
  };

  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.words);
}
