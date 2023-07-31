import React from "react";
import CommentList from "../commentList/CommentList";
import CommentForm from "../comentForm/CommentForm";

function CommentContainer({
    comments,
    addComment,
    deleteComment,
    setComments,
    user,
    isComPopupOpen,
    handleEditCommPopupOpen,
    username,
    password,
    role,
    adId,
    onClose
}) {
            //console.log('CommentContainer', deleteComment);
    return (
        <div className="commentContainer">
            <h2 className="commentContainer__title">Комментарии</h2>
            <CommentList
                comments={comments}
                setComments={setComments}
                user={user}
                username={username}
                password={password}
                role={role}
                isComPopupOpen={isComPopupOpen}
                adId={adId}
                deleteComment={deleteComment}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                onClose={onClose}
            />
            <CommentForm
                addComment={addComment}
                isComPopupOpen={isComPopupOpen}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
            />
        </div>
    );
}

export default CommentContainer;
