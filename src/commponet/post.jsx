import React from "react";

export function Post({ nick, colort, text, data, fulltext, img,op }) {


  function opend() {    
    localStorage.data = JSON.stringify({
      text: text,
      data: data,
      fulltext: fulltext,
      img: img,
      color: colort,
      nick: nick,
    });
    op()

    //window.location.href = "/full";
  }



  const postStyle = {
    opacity: data === "data" ? 0 : 1,
  };

  const opens = data === "data" ? ()=>{} : opend;
  

  return (
    <div
      onClick={opens}
      className="Post"
      id="Spost"
      style={postStyle} 
    >
      <img
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
