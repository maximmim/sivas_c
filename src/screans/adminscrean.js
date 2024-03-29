import { useEffect, useState,useRef } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function Admin() {
  const [img, setImg] = useState(null);
  const [imgList, setImgList] = useState([]);
  const [placeholder, setplaceholder] = useState('');
  const [fulltext, setfulltext] = useState('');
  const fileInputRef = useRef(null);
  const [ddaw, setd] = useState("../img/photp.png");
  const imageListRef = ref(storage, "images/");
  let color;


  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const formattedDate = `${hours}:${minutes} ${day}.${month}`;
  
    return formattedDate;
  }
  
  if (!localStorage.nick) {
    window.location.href = "/settings"
  }


  
  function handleUpload() {
    if (img) {
      alert("Не покидайте сторінку це може бути фатально ❗") 
      const imageRef = ref(storage, "images/" + img.name + v4());
      uploadBytes(imageRef, img).then(() => {
        
        getDownloadURL(imageRef).then(async (url) => {
          const currentTime = new Date();
          const formattedTime = formatTime(currentTime);
          w()
    
          let daw = {
              text: placeholder,
              data: formattedTime,
              fulltext: fulltext,
              colortext: color,
              img: url,
              nick: localStorage.nick,
              
            }
          try { 
            
            const response = await fetch("http://192.168.1.112:8000/post_data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(daw) 
            });
      
            if (response.ok) {
              const result = await response.json();
              window.location.href = "/"
              alert("Стаття успішно завантажена ✅")
            } else {
              console.error("Error creating post:", response.status, response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }
      
        });
      });
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
      setImgList(urls);
    });
  }, []);



  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setImg(event.target.files[0])
    // Обработка выбранного файла...
    setd("../img/photpfull.png")
  };

  const handleInputChange1 = (event) => {
    setfulltext(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setplaceholder(event.target.value);
    
    document.getElementById("plas").style.color = color;
  };
  function w(event) {
    color = document.getElementById("colortex").value
  };

  return (
    <>
      <textarea
        type="text"
        placeholder="Ведіть текст"
        value={fulltext}
        className="g1"
        onChange={handleInputChange1}
      />
      <input
        type="color"
        id="colortex"
        value={color}
        onChange={w}
        />
      <input
        type="text"
        id="plas"
        className="g2"
        placeholder="Ведіть заголовок"
        value={placeholder}
        onChange={handleInputChange2}
        />
      <img className="inputphoto" src={ddaw} onClick={handleFileInputClick}/>
      <input
        ref={fileInputRef}
        accept=".jpg, .png, .webp, .jpeg"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img src="../img/upload.png" className="upload" onClick={handleUpload} />


    </>
  );
}

export default Admin;
