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
get(global.url+"/get_data").then(data=>{
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