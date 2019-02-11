
var defaultState = {
    adRecieve:false
}


const adDetailReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'AD_DETAIL_ACTION':
        return{
            adRecieve:true,
            ad:action
        }
        default:
        return state;
    }
}

export default adDetailReducer;