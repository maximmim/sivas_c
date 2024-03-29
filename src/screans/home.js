import React, { useEffect, useState } from "react";
import { Post } from "../commponet/post";
import PostSkeleton from "../commponet/postskleton";

import Scrolbas from "../commponet/scrol";
import GMene from "../commponet/menu";
import Nws from "../commponet/ns_ppo";

async function get(url) {                                              
  try {                                              
    const response = await fetch(url);                                               
    if (!response.ok) {                                              
    console.log(response.status)       
    throw new Error(response.status)                                       
    }                                              
    const data = await response.json();                                              
    return data;                                               
  } catch (error) {                                              
    console.error(error);                                               
    throw new Error(error);                                               
  }                                              
 } 

function Home() {
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vis, setvis] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);

  useEffect(() => {
    if (!localStorage.nick) {
      window.location.href = "/settings"
    }    



get(global.url+"/get_data").then(data=>{

let h = JSON.parse(data)

h.push(
{
  nick:"nick",
  key:"index",
  colort:"colortext",
  img:"img",
  fulltext:"fulltext",
  text:"text",
  data:"data"
}
)
setD(h);
setLoading(false);
if (h.length === 0) {
  setvis(true);
}
})
  }, []);

  const handleImageLoaded = () => {
    setImageLoadCount((prevCount) => prevCount + 1);
  };

let s = false;

function hr1() {
  document.getElementById("menu").style.transform = "translate(-50%,-840%)";
  document.getElementById("j1").style.transform = "translate(-50%,300%)";
  document.getElementById("j2").style.transform = "translate(-50%,200%)";


 document.getElementsByClassName('Hes')[0].style.transform = 'translate(-50%,0%)'



  
}

function hr2() {

}

function hr() {
  if (s){

      document.getElementById("menu").style.transform = "translate(-50%,0%)";     
  
     if (document.getElementById("ng")) {
      document.getElementById("ng").style.transform = "translate(0%,0%)";
  
      }; 


  



      document.getElementsByClassName('Hes')[0].style.transform = 'translate(-50%,150%)'

     document.getElementById("j1").style.transform = "translate(-50%,300%)";
     document.getElementById("j2").style.transform = "translate(-50%,200%)";



     s = false
  }
  else {
    if (document.getElementById("ng")) {
    document.getElementById("ng").style.transform = "translate(-120%,0%)";
    }; 



        document.getElementById("menu").style.transform = "translate(-50%,-250%)";      
      document.getElementById("j1").style.transform = "translate(-50%,0%)";
      document.getElementById("j2").style.transform = "translate(-50%,0%)";

   


    s = true
  }
 
}


  return (
    <div id="body">
      {loading && imageLoadCount === d.length ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (         <div>
        <div id="ng">
{

        d.map((data, index) => (
          <Post
            nick={data.nick}
            key={index}
            colort={data.colortext}
            img={data.img}
            fulltext={data.fulltext}
            text={data.text}
            data={data.data}
            onImageLoad={handleImageLoaded} 
          />
        ))       
}
</div>
{/*
    <div id="scrol">
<Scrolbas data={d}/>
</div>
*/}    


        </div>
      )}

<GMene op={hr} text={"Menu📋"} style={"menu"}/>
<GMene op={hr1} text={"New post📮"} style={"j1"}/>
<GMene op={hr2} text={"Settings⚙️"} style={"j2"}/>


<Nws/>
      
      <p id="version">1.0.2v</p>
      {vis && <h1 className="plas">None posts :(</h1>}



    </div>
  );
}

export default Home;
