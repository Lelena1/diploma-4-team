import React from "react";
import Promo from "../promo/Promo";
import Preloader from "../preloader/Preloader";
import Ads from "../ads/Ads";

function Main(props) {
  const allAds = props.isAuthorized ? props.ads : props.adsDefault;
  // console.log('Main', props, allAds);
  return (
    <main className="main">
      <Promo ad={props.ad} setAd={props.setAd} />
      {props.isLoading ? (
        <Preloader />
      ) : allAds.length === 0 ? (
        <p className="error-paragraph">По вашему запросу ничего не найдено</p>
      ) : (
        <Ads
          isAuthorized={props.isAuthorized}
          ads={props.ads}
          visiableAds={props.visiableAds}
          showMoreAds={props.showMoreAds}
        />
      )}
    </main>
  );
}

export default Main;
