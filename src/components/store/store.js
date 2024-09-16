import {combineReducers,configureStore} from "@reduxjs/toolkit"
import { userSlice } from "../redux/user/useSlice"

const reducer=combineReducers({
    userSlice:userSlice.reducer

})

export const store=configureStore({
    reducer:reducer
})