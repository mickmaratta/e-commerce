import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

  const persistConfig = {
    key: "root",
    storage,
  };

  const rootReducer = combineReducers({ user: userReducer, product: productReducer });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);