import React, { useState } from "react";
import { Post } from "../commponet/post";

  
function Settings() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!login || !password) {
            alert('Please enter both login and password.');
            return;
        }
        if (password.length < 8 ) {
            alert('Please enter a longer password.');
            return;
        }
        fetch(global.url + '/get_datas')
        .then(response => response.json())
        .then(data => {
            let d = JSON.parse(data)
            const userExists = d.some(s => s.login === login);
            if (userExists) {
                    console.log(123)
                fetch(global.url + '/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"pass":password}) 
                })
                .then(response => response.json())
                .then((data)=>{
                        if (data.status === true) {
                            let t = document.getElementsByClassName("h");
        
                            for (let i = 0; i < t.length; i++) {
                                t[i].style.transform = 'translate(-50%,600%)';
                            }
        
                            document.getElementsByClassName("Title")[0].style.transform = 'translate(-50%,650%)';
                            setTimeout(() => {
                                document.getElementsByClassName("Title")[0].style.transform = 'translate(-50%,2000%)';   
        
                            }, 1000);
                        
                            setTimeout(() => {
                                localStorage.nick = login; 
                                window.location.href = "/"
                            }, 500);
                        
                
                                
                        }
                        else if (data.status === false) {
                            alert("Invalid password")
                        }
                })

            } else {
                    let t = document.getElementsByClassName("h");
        
                    for (let i = 0; i < t.length; i++) {
                        t[i].style.transform = 'translate(-50%,600%)';
                    }


                fetch(global.url + '/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login, password }) 
                })
                .then(data => {
        

        
                document.getElementsByClassName("Title")[0].style.transform = 'translate(-50%,650%)';
                    setTimeout(() => {
                        document.getElementsByClassName("Title")[0].style.transform = 'translate(-50%,2000%)';   

                    }, 1000);
                
                    setTimeout(() => {
                        localStorage.nick = login; 
                        window.location.href = "/"
                    }, 500);
                
        
                })
                .catch(error => {
                    console.error('Ошибка при отправке запроса:', error);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    function faw() {
        document.getElementsByClassName("jsdw")[0].style.transform = 'translate(0%,-200%)';
        document.getElementsByClassName("reg_fons")[0].style.transform = 'translate(-50%,650%)';

        setTimeout(() => {
            document.getElementsByClassName("Title")[0].style.transform = 'translate(-50%,0%)';
            if (window.innerWidth < 768) {
               document.getElementsByClassName("reg_fon")[0].style.transform = 'translate(-50%,0%)'; 
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                document.getElementsByClassName("reg_fon")[0].style.transform = 'translate(-50%,-10%)';
            } 
         
            
        }, 500);

    }



   
    return (
        <>  
            <div className="fon"><h1 className="Title">Welcome!</h1></div>

            <div className="jsdw">
          
            <Post
               nick={"Ann"}
               key={"1"}
               img={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/274px-A_small_cup_of_coffee.JPG"}
               fulltext={"Coffee is one of the most beloved beverages worldwide. It is made from roasted coffee beans, which are the seeds of the Coffea plant. Coffee comes in various forms, including espresso, cappuccino, latte, and americano, each with its unique flavor and preparation method. Besides its rich taste, coffee contains caffeine, a natural stimulant that can help improve alertness and concentration. Some people enjoy coffee for its social aspects, while others appreciate its aroma and taste. Whether you prefer your coffee black, with milk, or sweetened, there's a coffee drink for everyone. So, grab a cup of coffee and enjoy its warmth and flavor!"}
               text={"Your favorite coffee?"}
               data={"15.03.2024"}
            />
             <Post
                nick={"Kate"}
                key={"2"}
                img={"https://lh5.googleusercontent.com/p/AF1QipMmzZx6WRQqez33gFVJMiS46TO04QKtEs-ZddJs=w408-h272-k-no"}
                fulltext={"Renting a scooter has become a popular option for urban transportation in many cities around the world. Scooter rental services offer a convenient way to get around town without the hassle of owning a scooter. Users can simply locate a nearby scooter using a mobile app, unlock it with their smartphone, and start riding. Scooters are often electrically powered, making them eco-friendly and cost-effective. Whether you need to run errands, commute to work, or explore the city, renting a scooter can be a fun and practical choice."}
                text={"Have you tried scooter rental?"}
                data={"18.03.2024"}
            />

            <Post
                nick={"Mike"}
                key={"3"}
                img={"https://uniqa.ua/content/news/001000-002000/beautiful-girl-standing-airport_1157-22072_sm2_1548.jpg"}
                fulltext={"Air travel is a vital mode of transportation for millions of people worldwide. Whether it's for business or leisure, flying allows individuals to travel long distances quickly and efficiently. With the advent of modern aviation technology, air travel has become safer and more accessible than ever before. From booking tickets online to navigating through airport security, flying has been streamlined to provide a seamless experience for passengers. Despite occasional challenges such as delays and cancellations, air travel remains one of the most popular ways to explore new destinations and connect with loved ones."}
                text={"Your air travel experience?"}
                data={"19.03.2024"}
            />

            </div>

            <div className="reg_fons">



            <button className="inp_regs" onClick={faw}>Start</button>

            </div>

            <div className="reg_fon h">
                <input 
                    placeholder="Your nickname" 
                    type="text" 
                    className="inp_login h" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)} 
                    
                />
                <input 
                    placeholder="Your password" 
                    type="password" 
                    className="inp_password h" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button className="inp_reg h" onClick={handleLogin}>Sing in</button>
                
                {/*<button className="inp_up h" onClick={handleLogin}>Sing up</button>*/}

            </div>
        </>
    );
}

export default Settings;
