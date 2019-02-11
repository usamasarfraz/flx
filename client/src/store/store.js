import {createStore,combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import LoginReducer from './reducers/loginReducer/loginReducer';
import SignupReducer from './reducers/signupReducer/signupReducer';
import updatePasswordReducer from './reducers/updatePasswordReducer/updatePasswordReducer';
import AdReducer from './reducers/adReducer/adReducer';
import editAdReducer from './reducers/editAdReducer/editAdReducer';
import getAdsReducer from './reducers/getAdsReducer/getAdsReducer';
import favoriteAdReducer from './reducers/favoriteReducer/favoriteReducer';
import adDetailReducer from './reducers/adDetailReducer/adDetailReducer';
import chatReducer from './reducers/chatReducer/chatReducer';
import chatMessagesReducer from './reducers/chatMessagesReducer/chatMessagesReducer';


let AllReducers = combineReducers({LoginReducer,SignupReducer,updatePasswordReducer,AdReducer,editAdReducer,getAdsReducer,favoriteAdReducer,adDetailReducer,chatReducer,chatMessagesReducer});



const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, AllReducers);
   
    let store = createStore(persistedReducer);
    export default store;