import React, { useEffect, useState } from "react";
import { Post } from "../commponet/post";
import PostSkeleton from "../commponet/postskleton";
import GMene from "../commponet/menu";
import Nws from "../commponet/ns_ppo";
import { useSubscribe } from "react-pwa-push-notifications";
import { Fulltest } from "../commponet/fulltest";

async function get(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(response.status);
      throw new Error(response.statusText);
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
  const [read, Setread] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const subscribeId= null
  let lol = '';

  const reload = async () => {
    try {
      const data = await get(global.url + "/get_data");
      let h = JSON.parse(data);
      h.push({
        nick: "nick",
        key: "index",
        colort: "colortext",
        img: "img",
        fulltext: "fulltext",
        text: "text",
        data: "data",
      });
      setD(h);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      if (!localStorage.nick) {
        window.location.href = "/settings";
      }
      reload();
      setInterval(()=>{
        setLoading(true)
        reload();
      },1000*30)
    } else {
      alert("You are offline!");
    }

  }, []);

  const handleImageLoaded = () => {
    setImageLoadCount((prevCount) => prevCount + 1);
  };

  let s = false;

  function hr1() {
    document.getElementById("menu").style.transform = "translate(-50%,-900%)";
    document.getElementById("j1").style.transform = "translate(-50%,300%)";
    document.getElementById("j2").style.transform = "translate(-50%,200%)";
    document.getElementsByClassName("Hes")[0].style.transform = "translate(-50%,0%)";
  }


  function hr() {
    if (!read){

    
    if (s) {
      document.getElementById("menu").style.transform = "translate(-50%,0%)";
      if (!loading) {
        
      document.getElementsByClassName("Hes")[0].style.transform = "translate(-50%,150%)";
      document.getElementById("j1").style.transform = "translate(-50%,300%)";
      document.getElementById("j2").style.transform = "translate(-50%,200%)";
      s = false;
      document.getElementById("ng").style.transform = "translate(0%,0%)";
    
      }

    } else {
      if (!loading) {
        document.getElementById("ng").style.transform = "translate(-120%,0%)";     
        document.getElementById("menu").style.transform = "translate(-50%,-250%)";
        document.getElementById("j1").style.transform = "translate(-50%,0%)";
        document.getElementById("j2").style.transform = "translate(-50%,0%)";
        s = true;
      }
 
    }
  }
  }

  const PUBLIC_KEY = "BASbtuZCuVdXUMLM5By1Vw5Z_gkx_llfbv9ll0jPIsdqPYpefWlBPIsk7cs1OT-YhN0baqNODw1w_7Ac8aHg-CE";

  const { getSubscription } = useSubscribe({ publicKey: PUBLIC_KEY });
  const onSubmitSubscribe = async (e) => {
    e.preventDefault();
    try {
      const existingSubscription = localStorage.getItem('subscription');
      if (existingSubscription) {
        console.log('Subscription already exists.');
        await sendMessage("Welcome to our app!");
        return; 
      }
  
      const subscription = await getSubscription();
      await fetch(global.url + "/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          subscription: subscription,
          id: subscribeId, 
          nick:localStorage.nick,
        }),
      });
      
      localStorage.setItem('subscription', JSON.stringify(subscription));
  
      console.log("Subscribe success");
      await sendMessage("Welcome to our app!");
    } catch (error) {
      console.error(error);
      console.error("Failed to subscribe");
    }
  };
    const sendMessage = async (message) => {
    try {
      await fetch(global.url +"/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          title: message,
          id: subscribeId,
        }),
      });
      console.log("Push notification sent successfully");
    } catch (error) {
      console.error("Failed to send push notification");
    }
  };
  
  async function senck(f) {
    document.getElementById("ng").style.transform = "translate(-120%,0%)";

    
    document.getElementById("menu").style.transform = "translate(-200%,0%)";
    Setread(true);
    setTimeout(()=>{
      
    document.getElementById("place").style.transform = "translate(-50%,0%)";
    document.getElementById("place-text").style.transform = "translate(0%,0%)";
    document.getElementById("ng").style.transform = "translate(-120%,0%)";
    document.getElementsByClassName("menus")[0].style.transform = "translate(-50%,0%)";
    document.getElementsByClassName("image-gallery")[0].style.transform = "translate(-50%,0%)";
    })
}



  async function censk() {

    document.getElementById("ng").style.transform = "translate(0%,0%)";
    
    document.getElementById("menu").style.transform = "translate(-50%,0%)";
    Setread(false)
    document.getElementById("place").style.transform = "translate(-550%,0%)";
    document.getElementById("place-text").style.transform = "translate(-550%,0%)";
    document.getElementById("j3").style.transform = "translate(-50%,200%)";
    document.getElementById("j4").style.transform = "translate(-50%,300%)";  

    document.getElementsByClassName("menus")[0].style.transform = "translate(-300%,0%)";  
    document.getElementsByClassName("image-gallery")[0].style.transform = "translate(-200%,0%)";

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
      ) : (
        <div>
          <div id="ng">
            {d.map((data, index) => (
              <Post
                nick={data.nick}
                key={index}
                colort={data.colortext}
                img={data.img}
                fulltext={data.fulltext}
                text={data.text}
                data={data.data}
                onImageLoad={handleImageLoaded}
                op={senck}
              />
            ))}
          </div>
        </div>
      )}
      <div className="Read">
        
      <Fulltest p={censk} datas={lol} />
      </div>

      <GMene op={hr} text={"Menu📋"} styles={"menu"} />
      <GMene op={hr1} text={"New post📮"} styles={"j1"} />
      <GMene op={onSubmitSubscribe} text={"Settings⚙️"} styles={"j2"} />
      <Nws func={reload} />
      <p id="version">1.0.2v</p>
    </div>
  );
}

export default Home;
