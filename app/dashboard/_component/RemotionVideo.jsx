import React from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";

const RemotionVideo = ({ script, imageList, audioFileUrl, captions , setDurationInFrame }) => {
  const { fps } = useVideoConfig();
  const getDurationFrames = () => {
    setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps)
    return captions[captions?.length - 1]?.end / 1000 * fps;
  };

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => (
        <>
          <Sequence
            key={index}
            from={(index * getDurationFrames()) / imageList?.length}
            durationInFrames={getDurationFrames}
          >
            <Img
              src={item}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
        </>
      ))}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
