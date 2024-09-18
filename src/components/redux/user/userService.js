import axios from "axios"
import { useDispatch } from "react-redux"
import { setSingleuser, setUserdata } from "./useSlice"

export const addUser=(data)=>async dispatch=>{
    let some=await axios.post(`http://localhost:3001/users`,data)
    try{
        if(some)
        {
            // console.log(some,"data-----")
        }
        

    }
    catch(error)
    {
        console.log(error)
    }
}
// export const updateUser=(data)=>async dispatch=>{
//     let some=await axios.patch(`http://localhost:3001/users/${data.id}`,data)
//     try{
//         if(some)
//         {
//             console.log(some,"data-----")
//         }
        

//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// }


export const updateUser = (id) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      if (response.status === 200) {
        console.log(response.data, "Fetched user data");
        dispatch(setSingleuser(response.data));
      } else {
        console.log("Fetch failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user:", error.response ? error.response.data : error.message);
    }
  };
  
  

export const getalluser=()=>async dispatch=>{
    let some=await axios.get(`http://localhost:3001/users`)
    try{
        if(some)
        {
            dispatch(setUserdata(some?.data))
        }
        

    }
    catch(error)
    {
        console.log(error)
    }
}

export const deleteuser=(id)=>async dispatch=>{
    let some=await axios.delete(`http://localhost:3001/users/${id}`)
    try{
        if(some)
        {
            // dispatch(setUserdata(some?.data))
            console.log(some)
            dispatch(getalluser())
        }
        

    }
    catch(error)
    {
        console.log(error)
    }
}



