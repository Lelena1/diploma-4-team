import React from "react";
import Comment from "../comment/Comment";

function CommentList({ 
    comments, 
    setComments, 
    user, 
    adId, 
    username, 
    password,
    role,
    handleEditCommPopupOpen, 
    deleteComment,
    onClose,
    isComPopupOpen
}) {
  //console.log('CommentList', deleteComment);

  return (
    <>
      {!comments.length ? (
        <p className="comment-text">Оставьте комментарий первым</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment, ind) => {
            return (
              <Comment
                isComPopupOpen={isComPopupOpen}
                key={`${comment.pk}-par-${ind}`}
                text={comment.text}
                deleteComment1={deleteComment}
                adId={adId}
                img={comment.authorImage}
                authorName={comment.authorFirstName}
                commentId={comment.pk || comment.id}
                authorId={comment.author}
                createdAt={comment.createdAt}
                setComments={setComments}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                currentUserId={user}
                username={username}
                password={password}
                role={role}
                onClose={onClose}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default CommentList;
