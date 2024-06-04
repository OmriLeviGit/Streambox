import React, {useState} from 'react'
import styles from './Comments.module.css'
import Comment from '../Comment/Comment'

export default function Comments({ currentVideo, editVideo, videos, currentUser }) {
  const [addComment, setAddComment] = useState("")

  const getMaxId = () => {
    let id = 0
    videos.map((video) => {
      if (video.id > id)
        id = video.id
    })
    return id
  }
  console.log(currentUser)
  const addCommentToVideo = (comment) => {
    let addedComment = {
      id: (getMaxId() + 1),
      title: comment,
      user: currentUser.username,
      date: Date.now(),
      icon: currentUser.photo == null? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png":currentUser.photo
    }
    let changedVideo = {
      id: currentVideo.id,
      title: currentVideo.title,
      description: currentVideo.description,
      user: currentVideo.user,
      user_image: currentVideo.user_image,
      category: currentVideo.category,
      publication_date: currentVideo.publication_date,
      icon: currentVideo.icon,
      video: currentVideo.video,
      views: currentVideo.views,
      comments: [...currentVideo.comments,addedComment]
    }
    setAddComment("")
    editVideo(changedVideo)
  }

  return (
    <div className={styles.commentsWrapper}>
      <h4>{currentVideo.comments.length}  Comments</h4>
      <div className={styles.addCommentWrapper}>
        <button className={addComment.length===0? styles.buttonDisabled : styles.button} disabled={addComment.length===0} onClick={()=>addCommentToVideo(addComment)}>Post</button>
        <input placeholder='Add Comment' value={addComment} onChange={e => setAddComment(e.target.value)} />
        <img src={currentUser.photo == null? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png":currentUser.photo} className={styles.profileImage} />
      </div>
      {
        currentVideo.comments.map((comment) => {
          return <Comment {...comment} />
        })
      }
    </div>
  )
}
