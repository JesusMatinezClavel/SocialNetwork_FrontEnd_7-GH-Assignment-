//Redux
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";

//Redux Slices
import userSlice from "./slices/userSlice";
import detailSlice from "./slices/detailSlice";

const reducers = combineReducers(
    {
        user: userSlice,
        detail: detailSlice
    }
)

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'princess',
            onError: function (error) {
                console.log(error.message);
            }
        })
    ]
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(thunk)
})