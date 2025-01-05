const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a  script to generate 30 seconds video on topic : Interesting historical story along with AI Image prompt in realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 4,\n        \"imagePrompt\": \"A wide shot of a bustling marketplace in 16th century Tenochtitlan, the Aztec capital. People in traditional clothing are trading goods like corn, pottery, and textiles. The grand Templo Mayor pyramid rises in the background, with smoke coming from ceremonial fires. The sky is bright blue with a few clouds.\",\n      \"contentText\": \"Imagine Tenochtitlan, the Aztec capital, a city of wonders in the 16th century. Its markets pulsed with life, a vibrant tapestry of trade and culture.\"\n    },\n     {\n      \"scene_number\": 2,\n      \"duration\": 4,\n        \"imagePrompt\": \"A close-up, eye-level view of an Aztec merchant holding a jade ornament. He has a weathered face and wears a feathered headdress. His eyes reflect the bustling marketplace. Focus on intricate details of the jade and his clothing.\",\n      \"contentText\": \"Merchants brought treasures from distant lands – jade, feathers, spices – all exchanged with meticulous care.\"\n    },\n    {\n      \"scene_number\": 3,\n      \"duration\": 5,\n       \"imagePrompt\": \"A medium shot of the Templo Mayor pyramid, focusing on the intricate carvings and the priests performing rituals. Smoke rises from braziers, and people kneel in reverence. The architecture is precise and impressive, with bright colors.\",\n      \"contentText\": \"At the heart of the city stood the Templo Mayor, a testament to their beliefs, a place of reverence and sacrifice.\"\n    },\n    {\n      \"scene_number\": 4,\n      \"duration\": 4,\n     \"imagePrompt\": \"A long shot of a Spanish galleon arriving on the horizon of a lake next to the city. The sails are billowing, and the ship looks foreign against the backdrop of the Aztec architecture. There are canoes carrying people on the water who watch the arrival. The sky is hazy with early morning mist.\",\n      \"contentText\": \"Then, a change arrived – ships unlike any they’d ever seen, carrying men who spoke in strange tongues.\"\n\n    },\n       {\n      \"scene_number\": 5,\n      \"duration\": 5,\n        \"imagePrompt\": \"A medium shot of Hernán Cortés, the Spanish conquistador, standing in front of the Templo Mayor. He is dressed in armor, looks determined and a little arrogant, and is looking at the city with his hand on his hip. Aztec nobles in feathered headdresses stand cautiously behind him.\",\n       \"contentText\": \"Hernán Cortés and his conquistadors, their arrival a clash of worlds, a moment that changed the course of history.\"\n    },\n     {\n      \"scene_number\": 6,\n      \"duration\": 8,\n        \"imagePrompt\":\"A slow motion sequence of a series of Aztec warriors battling the Spanish conquistadors. A mix of close-ups and wide shots.  Use swords, spears, and other ancient weapons clashing against the armor of the Spanish soldiers. Focus on the expressions of determination and fear. The setting is chaotic and intense, a battle to decide the fate of an empire.\",\n      \"contentText\": \"The collision was violent, cultures clashing, empires crumbling. This was more than just a battle, but the unraveling of a civilization, a poignant reminder of the fragility of power.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  