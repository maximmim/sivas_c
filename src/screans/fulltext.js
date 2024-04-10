import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GMene from "../commponet/menu"
export function Fulltext() {
  let data;
  if (localStorage.data) {
    data = JSON.parse(localStorage.data);
   //setTimeout(() => {
   //  localStorage.removeItem('data');
   //}, 1000);
  } else {
    window.location.href = '/';
  }

  const images = [
    {
      original: data.img,
      thumbnail: data.img, 
      description: data.alt,
    },
  ];





  function hr2() {

  }


function hrs() {
  localStorage.removeItem('data');
  window.location.href = '/';
}



  let s = false
  function hr() {
    if (s){
       document.getElementById("menu").style.transform = "translate(-50%,0%)";
       if (document.getElementById("ng")) {
        document.getElementById("ng").style.transform = "translate(0%,0%)";
    
        }; 
       document.getElementById("j2").style.transform = "translate(-50%,200%)";
       document.getElementById("j3").style.transform = "translate(-50%,300%)";
  

  
       s = false
    }
    else {
      if (document.getElementById("ng")) {
      document.getElementById("ng").style.transform = "translate(-120%,0%)";
      }; 
      
  
      document.getElementById("menu").style.transform = "translate(-50%,-230%)";
      document.getElementById("j2").style.transform = "translate(-50%,0%)";
      document.getElementById("j3").style.transform = "translate(-50%,0%)";


      s = true
    }
   
  }


  return (
    <>
      {localStorage.data && (
        <>
        <GMene op={hr} text={"Menu📋"} styles={"menu"}/>
<GMene op={hr2} text={"information ℹ️"} styles={"j2"} />

<GMene op={hrs} text={"Go to home🏠"} styles={"j3"} />

  <h1 id='place'>{data.text}</h1>
        <p id='place-text'>{data.fulltext}</p>
          <ImageGallery showThumbnails={false} showPlayButton={false} items={images} />
        </>
      )}
    </>
  );
}
