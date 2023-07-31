import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentContainer from "../commentContainer/CommentContainer";
import EditAdPopup from "../editAdPopup/EditAdPopup";
import Buttons from "../buttons/Buttons";
import api from "../../utils/api";
import Preloader from "../preloader/Preloader";
import EditPhotoAdPopup from "../editPhotoAdPopup/EditPhotoAdPopup";
import {connect} from 'react-redux';
import {REDUCERS as adsReducers} from '../../redux/reducers/ads/ads'
import {REDUCERS as userAdsReducers} from '../../redux/reducers/ads/userAds'
import {REDUCERS as defaultAdsReducers} from '../../redux/reducers/ads/adsDefault'

function SinglePage(props) {
  const { id } = useParams();
  const [ad, setAd] = useState({});
  const [comments, setComments] = useState([]);
  let adId = id;
  // console.log('Single Page', props, ad);

  let navigate = useNavigate();

  useEffect(() => {
    if (props.isAuthorized) {
      props.setIsLoading(true);
      Promise.all([
        api.getComments(adId, props.userInfo.username, props.userInfo.password),
        api.getAd(id, props.userInfo.username, props.userInfo.password),
      ])
        .then(([commentsData, adData]) => {
          setComments(commentsData.results);
          setAd(adData);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setTimeout(() => props.setIsLoading(false), 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isAuthorized]);

  function handleEditAdd(data) {
    props.setIsLoading(true);
    api
      .editAdd(id, data, props.userInfo.username, props.userInfo.password)
      .then((result) => {
        let combinedAd = {...ad, ...data};
        setAd(combinedAd);
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.id ? combinedAd : null))
        );
        props.onUpdateAdFromStore(parseInt(id), data)
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => props.setIsLoading(false), 700));
  }

  function handleEditPhotoAdd(image) {
    api
      .editAddPhoto(id, image, props.userInfo.username, props.userInfo.password)
      .then((image) => {
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.id ? image : null))
        );
      })
      .catch((error) => console.log("error", error));
  }

  function handleDeleteAdd() {
    api
      .deleteAdd(id, props.userInfo.username, props.userInfo.password)
      .then(() => {
        props.setAds((ads) => ads.filter((i) => i.pk !== ad.pk));
        props.onDeleteAdFromStore(parseInt(id))
        navigate("/");
      })
      .catch((error) => console.log("error", error));
  }

  function handleAddComment(data) {
    api
      .addComment(id, data, props.userInfo.username, props.userInfo.password)
      .then((newComment) => {
        setComments([newComment, ...comments]);
      })
      .catch((error) => console.log("error", error));
  }
  
  function handleDeleteComment(adId, commentId) {
    api
      .deleteComment(adId, commentId, props.userInfo.username, props.userInfo.password)
      .then(() => {
        setComments(comments.filter((item) => item.pk !== commentId));
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <main className="cardInformation">
      {props.isLoading ? (
        <Preloader />
      ) : (
        ad && (
          <>
            <h1 className="cardInformation__title">{ad.title}</h1>
            <div className="cardInformation__container">
              {ad.image === null ? (
                <div className="cardInformation__img-null">
                  {props.userInfo.username === ad.email || props.userInfo.role === 'ADMIN' ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              ) : (
                <div
                  style={{ backgroundImage: `url(${"http://localhost:8080"+ad.image})` }}
                  className="cardInformation__img"
                >
                  {props.userInfo.username === ad.email || props.userInfo.role === 'ADMIN' ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              )}
              {props.userInfo.username !== ad.email && props.userInfo.role !== 'ADMIN' ? null : (
                <Buttons
                  user={props.user}
                  product={ad}
                  onOpen={props.handleOpenEditPopup}
                  className="buttons"
                  classButton="buttons-item"
                  onSubmit={handleDeleteAdd}
                />
              )}
              <div className="cardInformation__box">
                <div className="cardInformation__box_second">
                  <p className="cardInformation__contact">{ad.authorFirstName}&nbsp;{ad.authorLastName},&nbsp;{ad.phone}</p>
                </div>
                <p className="cardInformation__price">{ad.price} &#8381;</p>
              </div>
              <div className="cardInformation__box">
                <p className="cardInformation__description">{ad.description}</p>
              </div>
              <CommentContainer
                comments={comments}
                addComment={handleAddComment}
                deleteComment={handleDeleteComment}
                isComPopupOpen={props.isComPopupOpen}
                handleEditCommPopupOpen={props.handleEditCommPopupOpen}
                setComments={setComments}
                user={props.user}
                username={props.userInfo.username}
                password={props.userInfo.password}
                role={props.userInfo.role}
                adId={adId}
                onClose={props.onClose}
              />
            </div>
            <EditAdPopup
              isEditPopupOpen={props.isEditPopupOpen}
              onClose={props.onClose}
              handleEditAdd={handleEditAdd}
              id={id}
              ad={ad}
            />
            <EditPhotoAdPopup
              id={id}
              handleEdit={handleEditPhotoAdd}
              isOpen={props.isEditPhotoPopupOpen}
              onClose={props.onClose}
            />
          </>
        )
      )}
    </main>
  );
}

const ConnectedSinglePage = connect(
    (state) => ({userInfo: {...state.userInfo}}),
    (dispatch) => ({
        onDeleteAdFromStore(delId) {
            dispatch(defaultAdsReducers.DELETE(delId));
            dispatch(userAdsReducers.DELETE(delId));
            dispatch(adsReducers.DELETE(delId));
        },
        onUpdateAdFromStore(adId, newData) {
            dispatch(defaultAdsReducers.EDIT(adId, newData));
            dispatch(userAdsReducers.EDIT(adId, newData));
            dispatch(adsReducers.EDIT(adId, newData));
        }
    })
)(SinglePage)

export default ConnectedSinglePage;
