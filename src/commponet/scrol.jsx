import React, { useState } from 'react';

const Scrolbas = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let startY;

  function handleTouchStart(event) {
    startY = event.touches[0].clientY;
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientY;
    const deltaX = endX - startY;

    if (deltaX < -200) {
      // Свайп вліво
      console.log(12312321);
      document.getElementById("dscroll").style.transform = 'translate(-50%,-200%)'
      setTimeout(()=>{      
        document.getElementById("dscroll").style.display= "none"
      document.getElementById("dscroll").style.transform = 'translate(-50%,250%)'
      },100)



      setTimeout(()=>{      
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentIndex(randomIndex);      
      document.getElementById("dscroll").style.display= "block"
      setTimeout(()=>{  

        document.getElementById("dscroll").style.transform = 'translate(-50%,0%)'
      },150)
      
      },200)
    }

    startY = null;
  }

  return (
    <>
      <div
        onTouchStart={(event) => handleTouchStart(event)}
        onTouchEnd={(event) => handleTouchEnd(event)}
        id='dscroll'
      >

      <p style={{ color: data[currentIndex].colortext }} className="Post-textf">
        { data[currentIndex].text}
      </p>
    
      <img 
        className="Post-imgf"
        src={data[currentIndex].img}
        alt="Post"
        fetchpriorety="high"
      />

      <p className="Post-dataf">
        {data[currentIndex].data}
      </p>

      <p className="Post-nickf">{ data[currentIndex].nick}</p>
        {data[currentIndex].fulltext}
      </div>
    </>
  );
};

export default Scrolbas;