import productServices from '../../../services/productServices';
var defaultState = {
    adRecieveToUpdate:false
}


const editAdReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'EDIT_AD_ACTION':
        return{
            adRecieveToUpdate:true,
            data:action.data
        }
        
        case 'SEND_EDITED_AD_ACTION':
        productServices.adSubmit({
            ...action.data
        })
        return{
            adRecieveToUpdate:false,
        }

        default:
        return state;
    }
}

export default editAdReducer;