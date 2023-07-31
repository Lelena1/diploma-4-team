import React from "react";

function AdsCardListButton({ showMoreAds }) {
  return (
    <button
      type="submit"
      className="adsCardListButton adsCardListButton-text"
      onClick={showMoreAds}
    >
      Еще
    </button>
  );
}

export default AdsCardListButton;
