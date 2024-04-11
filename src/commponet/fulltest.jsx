import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GMene from "../commponet/menu"
export function Fulltest({p}) {
  let data;
let images

    
  if (global.datg) {
    data = JSON.parse(global.datg);
   //setTimeout(() => {
   //  localStorage.removeItem('data');
   //}, 1000);
  
  

   images = [
 {
   original: data.img,
   thumbnail: data.img, 
   description: data.alt,
 },
  ];

} 

  function hr2() {

  }

  let s = false
  function hr() {
    if (s){
       document.getElementById("menus").style.transform = "translate(-50%,0%)";

       document.getElementById("j3").style.transform = "translate(-50%,200%)";
       document.getElementById("j4").style.transform = "translate(-50%,300%)";
  

  
       s = false
    }
    else {

      
  
      document.getElementById("menus").style.transform = "translate(-50%,-230%)";
      document.getElementById("j3").style.transform = "translate(-50%,0%)";
      document.getElementById("j4").style.transform = "translate(-50%,0%)";


      s = true
    }
   
  }


  return (
    <>
      {global.datg && (
        <>
        <GMene op={hr} text={"Menu📋"} styles={"menus"}/>
<GMene op={hr2} text={"information ℹ️"} styles={"j3"} />

<GMene op={p} text={"Go to home🏠"} styles={"j4"} />

  <h1 id='place'>{data.text}</h1>
        <p id='place-text'>{data.fulltext}</p>
          <ImageGallery showThumbnails={false} showPlayButton={false} items={images} />
        </>
      )}
    </>
  );
}
