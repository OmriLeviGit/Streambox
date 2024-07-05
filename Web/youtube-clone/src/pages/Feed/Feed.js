import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Feed.module.css";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import axios from "axios";
import Categories from "../../components/Feed/Categories/Categories";
import VerticalVideoCard from "../../components/Feed/VideoShow/VerticalVideoCard";
import LeftMenu from "../../components/Feed/LeftMenu/LeftMenu";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const { trigger, setTrigger } = useOutletContext();
  const { videoList, setVideoList, isFilltered, fillteredVideoList } = useContext(AppContext);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get("/api/videos", { timeout: 0 });
        const fetchedVideoList = res.data;
        console.log("video list: ", fetchedVideoList);
        setVideoList(fetchedVideoList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (trigger === false && videoList.length === 0) {
      fetchFeed();
    }
  }, [trigger, videoList]);

  return (
    <div className={styles.Home}>
      <div className={styles.LeftMenu}>
        <LeftMenu />
      </div>
      <div className={styles.FeedContainer}>
        <div className={styles.categories}>
          <Categories />
        </div>
        <div>
          <div className={styles.videoGrid}>
            {!isFilltered
              ? videoList.map((video) => <VerticalVideoCard key={video._id} video={video} />)
              : fillteredVideoList.map((video) => <VerticalVideoCard key={video._id} video={video} />)}
          </div>
        </div>
      </div>
      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
