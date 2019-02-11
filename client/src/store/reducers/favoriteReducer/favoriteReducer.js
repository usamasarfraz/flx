import favoriteService from '../../../services/favoriteService/favoriteService';
var defaultState = {
    favoriteAds:[]
}


const favoriteAdsReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'SEND_FAV_ACTION':
        favoriteService.sendFavReq(action.id,state);
        return state;
        case 'RECIEVE_FAVORITE_ADS':
        return{
            favoriteAds:action.payload
        }

        default:
        return state;
    }
}

export default favoriteAdsReducer;