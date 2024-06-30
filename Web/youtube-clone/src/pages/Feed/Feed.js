import React, { useState } from "react";
import styles from "./Feed.module.css";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";

export default function Feed() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [searchText, setsearchText] = useState("");
  const [trigger, setTrigger] = useState(false);

  console.log("hi");

  return (
    <div className={styles.Feed}>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setCurrentVideo={setCurrentVideo} />
          </div>
        ) : (
          <VideoDisplay />
        )}
      </div>
      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
