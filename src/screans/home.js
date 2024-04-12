import React, { useEffect, useState, useRef } from "react";
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
  const PUBLIC_KEY = "BASbtuZCuVdXUMLM5By1Vw5Z_gkx_llfbv9ll0jPIsdqPYpefWlBPIsk7cs1OT-YhN0baqNODw1w_7Ac8aHg-CE";
  const { getSubscription } = useSubscribe({ publicKey: PUBLIC_KEY });  
  const [d, setD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [read, Setread] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const [cloase, setCloase] = useState(false);
  const subscribeId = null;
  const menuRef = useRef(null);
  const newPostRef = useRef(null);
  const settingsRef = useRef(null);
  const HesRef = useRef(null);
  const PostsRef = useRef(null);
  const menusRef = useRef(null);
  const settingss = useRef(null);
  const exit = useRef(null);
  const place = useRef(null);
  const place_text = useRef(null);
  let lol = "";
  
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
    setInterval(() => {
      setLoading(true);
      reload();
    }, 1000 * 30);
  } else {
    alert("You are offline!");
  }
}, []);

const handleImageLoaded = () => {
  setImageLoadCount((prevCount) => prevCount + 1);
};
  

function hr1() {
  menuRef.current.style.transform = "translate(-50%,-900%)";
  newPostRef.current.style.transform = "translate(-50%,300%)";
  settingsRef.current.style.transform = "translate(-50%,200%)";
  HesRef.current.style.transform = "translate(-50%,0%)";
  
}
function hr() {
  if (!read) {
    if (cloase) {
      if (!loading) {
        menuRef.current.style.transform = "translate(-50%,0%)";
        HesRef.current.style.transform = "translate(-50%,150%)";
        newPostRef.current.style.transform = "translate(-50%,300%)";
        settingsRef.current.style.transform = "translate(-50%,200%)";
        PostsRef.current.style.transform = "translate(0%,0%)";
        setCloase(false);
      }
    } else {
      if (!loading) {
        PostsRef.current.style.transform = "translate(-120%,0%)";
        menuRef.current.style.transform = "translate(-50%,-250%)";
        newPostRef.current.style.transform = "translate(-50%,0%)";
        settingsRef.current.style.transform = "translate(-50%,0%)";
        setCloase(true);
      }
    }
  }
}

const onSubmitSubscribe = async (e) => {
    e.preventDefault();
    try {
      const existingSubscription = localStorage.getItem("subscription");
      if (existingSubscription) {
        console.log("Subscription already exists.");
        await sendMessage("How are you ?");
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
          nick: localStorage.nick,
        }),
      });

      localStorage.setItem("subscription", JSON.stringify(subscription));

      console.log("Subscribe success");
      await sendMessage("Test notification!");
    } catch (error) {
      console.error(error);
      console.error("Failed to subscribe");
    }
};

const sendMessage = async (message) => {
    try {
      await fetch(global.url + "/send", {
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
  PostsRef.current.style.transform = "translate(-120%,0%)";
  menuRef.current.style.transform = "translate(-200%,0%)";
  Setread(true);
  setTimeout(() => {
    place.current.style.transform = "translate(-50%,0%)";
    place_text.current.style.transform ="translate(0%,0%)";
    PostsRef.current.style.transform = "translate(-120%,0%)";
    menusRef.current.style.transform ="translate(-50%,0%)";
    document.getElementsByClassName("image-gallery")[0].style.transform = "translate(-50%,0%)";
  });
}

async function censk() {
  PostsRef.current.style.transform = "translate(0%,0%)";
  menuRef.current.style.transform = "translate(-50%,0%)";
  Setread(false);
  place.current.style.transform ="translate(-550%,0%)";
  place_text.current.style.transform ="translate(-550%,0%)";
  exit.current.style.transform = "translate(-50%,200%)";
  settingss.current.style.transform = "translate(-50%,300%)";
  menusRef.current.style.transform ="translate(-300%,0%)";
  document.getElementsByClassName("image-gallery")[0].style.transform ="translate(-200%,0%)";
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
        <>
          <div ref={PostsRef} id="ng">
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
        </>
      )}

      <div className="Read">
        <Fulltest 
          p={censk} 
          datas={lol} 
          place={place} 
          place_text={place_text}
          menus={menusRef}
          exit={exit}
          settings={settingss}
        />
      </div>

      <GMene 
        op={hr}
        text={"Menu📋"}
        styles={"menu"}
        ref={menuRef}
      />
      <GMene 
        op={hr1} 
        text={"New post📮"}
        styles={"j1"}
        ref={newPostRef} 
      />
      <GMene
        op={onSubmitSubscribe}
        text={"Settings⚙️"}
        styles={"j2"}
        ref={settingsRef}
      />

      <Nws 
        func={reload} 
        refs={HesRef} 
      />
    </div>
  );
}

export default Home;