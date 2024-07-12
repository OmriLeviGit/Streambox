import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import HorizontalVideoCard from "../../components/Feed/VideoShow/HorizontalVideoCard";
import styles from "./UserPage.module.css";
import axios from "axios";

export default function UserPage() {
  const { userId } = useParams();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`/api/users/${userId}/videos`);
      setVideoList(data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <div>
        <UserInfo userId={userId} />
      </div>
      <hr />
      <div className={styles.videoGrid}>
        {videoList.map((video) => (
          <HorizontalVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
