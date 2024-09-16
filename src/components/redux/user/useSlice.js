import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userdata:[],
    singleUser:{}
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserdata:(state,action)=>{
            state.userdata=action.payload

        },
        setSingleuser:(state,action)=>{
            state.singleUser=action.payload

        }
    }
})

export const {setUserdata,setSingleuser}=userSlice.actions