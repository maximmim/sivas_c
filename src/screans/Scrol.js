import { useState,useEffect } from "react"
import Scrolbas from "../commponet/scrol"

import PostSkeleton from "../commponet/postskleton";
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

function Scrol() {
const [d,setd] = useState([])

const [loading, setLoading] = useState(true);
useEffect(() => {
get("https://654a46cae182221f8d52def1.mockapi.io/posts").then(data=>{
    setd(data);
setLoading(false);
})
},[])


return (
    <>
    
    {loading ? (
        // If loading is true, show skeletons
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (       
<div id="scrol">
<Scrolbas data={d}/>
</div>

)}
    </>
)
}
export default Scrol