import React, { useEffect, useState } from "react";
import { Post } from "../commponet/post";

  
function Settings() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    useEffect(()=>{

        faw()
   
    },[])
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
                            }, 1500);
                        
                
                                
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
