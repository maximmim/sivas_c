import React, { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import GMene from "../commponet/menu"
export function Fulltest({p,place,place_text,menus,exit,settings}) {
let data;
let images
const menuf = menus;
const ecit = exit;
const inf = settings;
let s = false
    
  if (global.datg) {
    data = JSON.parse(global.datg);
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

  
  function hr() {
    if (s){
      menuf.current.style.transform = "translate(-50%,0%)";
      ecit.current.style.transform = "translate(-50%,200%)";
      inf.current.style.transform = "translate(-50%,300%)";
      s = false
    }
    else {
      menuf.current.style.transform = "translate(-50%,-230%)";
      ecit.current.style.transform = "translate(-50%,0%)";
      inf.current.style.transform = "translate(-50%,0%)";
      s = true
    }
   
  }


  return (
    <>
      {global.datg && (
        <>
        <GMene 
        op={hr} 
        text={"Menu📋"} 
        styles={"menus"}
        ref={menus}
        />

        <GMene 
        op={hr2} 
        text={"information ℹ️"} 
        styles={"j3"} 
        ref={exit}
        />

        <GMene 
        op={p} 
        text={"Go to home🏠"} 
        styles={"j4"} 
        ref={settings}
        />

        <h1 
        ref={place} 
        id='place'
        >{data.text}
        </h1>

        <p 
        ref={place_text} 
        id='place-text'
        >{data.fulltext}
        </p>

        <ImageGallery showThumbnails={false} showPlayButton={false} items={images} />
        </>
      )}
    </>
  );
}
