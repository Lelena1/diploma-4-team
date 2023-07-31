import React, {useState} from "react";
import api from "../../utils/api";

import Buttons from "../buttons/Buttons";
import EditCommentPopup from "../editCommentPopup/EditCommentPopup";

function Comment({
    text,
    deleteComment1,
    adId,
    createdAt,
    img,
    commentId,
    authorId: userId,
    authorName,
    currentUserId: user,
    username,
    password,
    role
}) {
    const commentDate = (new Date(createdAt));
    const [isEdit, setEdit] = useState(false);
    const [, setAdComment] = useState({});
    const toggleEdit = () => setEdit(!isEdit);

    const handleEditComment = (data) => {
        api
            .editComment(adId, commentId, data, username, password)
            .then((res) => {
                setAdComment(res);
            })
            .catch((error) => console.log("error", error));
    };

    const onDelete = (e) => {
        e.preventDefault();
        deleteComment1(adId, commentId);
    };

    return (
        <li className="comment" key={commentId}>
            <div className="comment-box">
                {img ? (
                    <img src={`http://localhost:8080` + img} alt="user-img" className="comment-img"/>
                ) : (
                    <img src={'/src/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'} alt="user-img" className="comment-img"/>
                )}
                <p className="comment-text comment__author-text">
                    {authorName || 'Комментатор'}
                    <span>{commentDate.toLocaleString()}</span>
                </p>
            </div>
            <div className="commentBox">
                <p className="comment-text comment-message">{text}</p>
                {user === userId || role === 'ADMIN' ? (
                    <Buttons
                        className="comment-buttons"
                        classButton="comment-button"
                        onOpen={toggleEdit}
                        onSubmit={onDelete}
                        key={`${commentId}-btn`}
                    />
                ) : null}
                <EditCommentPopup
                    onClose={toggleEdit}
                    isOpen={isEdit}
                    id={adId}
                    commentText={text}
                    handleEdit={handleEditComment}
                    userId={user}
                    commentUserId={userId}
                    commentId={commentId}
                    currentComId={commentId}
                    key={`${commentId}-popup`}/>
            </div>
        </li>
    );
}

export default Comment;
