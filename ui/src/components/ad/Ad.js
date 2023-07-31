import React from "react";

function Ad({id, image, title, price, description}) {
  return (
    <li className="ad" key={id}>
      {image ? (
        <img src={`http://localhost:8080`+image} className="ad-img" alt="product img" />
      ) : image === null ? (
        <div className="ad-img_null" />
      ) : (
        <img src={'images/malvestida-u79wy47kvVs-unsplash.jpg'} className="ad-img" alt="product img" />
      )}
      <div className="ad__description">
        <h2 className="ad__title">{title}</h2>
        <p className="ad__price">{price} &#8381;</p>
      </div>
    </li>
  );
}

export default Ad;
