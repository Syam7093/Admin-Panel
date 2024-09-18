import {combineReducers,configureStore} from "@reduxjs/toolkit"
import { userSlice } from "../redux/user/useSlice"
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//     key: 'root', // key for localStorage
//     storage,     // localStorage as the storage method
//   };

const reducer=combineReducers({
    userSlice:userSlice.reducer

})
// const persistedReducer = persistReducer(persistConfig, reducer);

export const store=configureStore({
    reducer:reducer
})

// export const persistor = persistStore(store);