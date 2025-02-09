import React, { useState , useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";


const PlayerDialog = ({playVideo,videoId}) => {
  const [openDialog,setOpenDialog]=useState(false);

  useEffect(() => {
    setOpenDialog(playVideo);
  }, [playVideo])

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">Your Video Is Ready!</DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
