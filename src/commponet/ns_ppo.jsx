import React, { useEffect, useState, useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import GMene from "./menu";

const Nws = ({func}) => {
  const [img, setImg] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
  const [fulltext, setFulltext] = useState('');
  const fileInputRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [ddaw, setDdaw] = useState("../img/photp.png");
  const imageListRef = ref(storage, "images/");
  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const formattedDate = `${hours}:${minutes} ${day}.${month}`;
    return formattedDate;
  }

  const j1 = document.getElementById("j1");
  const j2 = document.getElementById("j2");
  const ng = document.getElementById("ng");
  const Hes = document.getElementsByClassName('Hes')[0];
  const menu =  document.getElementById("menu");


  function handleFileInputClick() {
    document.getElementsByClassName("Photosd")[0].style.backgroundColor ="rgb(44 67 177)";
    fileInputRef.current.click();
  }

  function handleFileChange(event) {
    setImg(event.target.files[0]);
    setDdaw("../img/photpfull.png");
  }

  function handleInputChange1(event) {
    setFulltext(event.target.value);
  }

  function handleInputChange2(event) {
    setPlaceholder(event.target.value);
    document.getElementById("sg2").style.color = color;
  }

  async function handleUpload() {
    if (img) {
      alert("Не покидайте сторінку це може бути фатально ❗") 
      const imageRef = ref(storage, "images/" + img.name + v4());
      await uploadBytes(imageRef, img);
      const url = await getDownloadURL(imageRef);
      const currentTime = new Date();
      const formattedTime = formatTime(currentTime);
      let daw = {
          text: placeholder,
          data: formattedTime,
          fulltext: fulltext,
          img: url,
          nick: localStorage.nick,
      };
      try { 
        const response = await fetch( global.url + "/post_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(daw) 
        });
        if (response.ok) {
  
            alert("Your state is upliad ✅")
            menu.style.transform = "translate(-50%,0%)";     
            if (ng) {
        
             ng.style.transform = "translate(0%,0%)";
            }
            Hes.style.transform = 'translate(-50%,150%)'
            j1.style.transform = "translate(-50%,300%)";
            j2.style.transform = "translate(-50%,200%)";
            func()
        } else {
          console.error("Error creating post:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      const urls = [];
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          urls.push(url);
        });
      });
    });
  }, []);

  return (
    <>
    <div className="Hes">

    
      <textarea
        placeholder="Enter your text here"
        value={fulltext}
        id="sg1"
        className="k"
        onChange={handleInputChange1}
      />
      <input
        type="text"
     
        className="k"
        id="sg2"
        placeholder="Enter a title"
        value={placeholder}
        onChange={handleInputChange2}
      />
      <input
        ref={fileInputRef}
        accept=".jpg, .png, .webp, .jpeg"
        type="file"
        className="k"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <GMene op={handleUpload} text={"Upload📩"} styles={"Send"}/>
    
      <GMene op={handleFileInputClick} text={"Photo📷"} styles={"Photosd"}/>

   
        </div>
    </>
  );
}

export default Nws;
