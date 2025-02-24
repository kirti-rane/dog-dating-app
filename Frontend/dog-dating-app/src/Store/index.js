import {configureStore} from '@reduxjs/toolkit'
import useReducer from './userSlice'
import storage from 'redux-persist/lib/storage/session'; // session
import { persistStore, persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage, // session storage
  };

const persistedReducer = persistReducer(persistConfig, useReducer);

const store = configureStore({

    //add the reducers 
    reducer:{
        
        user: persistedReducer,
    }

})

export const persistor = persistStore(store);

export default store
