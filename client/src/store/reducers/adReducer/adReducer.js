import productService from '../../../services/productServices';

var defaultState = {
    signin:false
}


const adReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'AD_ACTION':
        productService.adSubmit({
            ...action
        })
        return{
            ...state
        }
        
        case 'SUBMIT_AD_RESPONSE':
        return{
            submitted:true,
            ...action.payload
        }
        case 'GET_ADS_FROM_SERVER':
        return{
            adsRecieved:true,
            ads:[...action.payload]
        }
        case 'DELETE_AD_ACTION':
        productService.adDelete(action.adID,state);
        return state;

        default:
        return state;
    }
}

export default adReducer;