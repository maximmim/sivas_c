import React, { useState } from "react";

export function Post({ nick, colort, text, data, fulltext, img }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function opend() {
    localStorage.data = JSON.stringify({
      text: text,
      data: data,
      fulltext: fulltext,
      img: img,
      color: colort,
      nick: nick,
    });
    window.location.href = "/full";
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  let startX;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < 200) {
      console.log("Swiped from right to left");
    }

    startX = null;
  }


  const postStyle = {
    opacity: data === "data" ? 0 : 1,
  };

  const opens = data === "data" ? ()=>{} : opend;
  

  return (
    <div
      onClick={opens}
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchEnd={(event) => handleTouchEnd(event)}
      className="Post"
      id="Spost"
      style={postStyle} 
    >
      <img
        onLoad={handleImageLoad}
        className="Post-img"
        src={img}
        alt="Post"
        fetchpriorety="high"
      />
      <p style={{ color: colort }} className="Post-text">
        {text}
      </p>
      <p className="Post-data">{data}</p>
      <p className="Post-nick">{nick}</p>
    </div>
  );
}
