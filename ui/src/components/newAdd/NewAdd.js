import React from "react";
import AddAd from "../addAd/AddAd";

function NewAdd({ handleAddAd, isLoading, userAds }) {
  //console.log(userAds);
  return (
    <main className="main">
      <AddAd handleAddAd={handleAddAd} isLoading={isLoading} userAds={userAds}/>
    </main>
  );
}

export default NewAdd;
