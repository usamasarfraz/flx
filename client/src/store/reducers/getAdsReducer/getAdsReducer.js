
var defaultState = {
    adRecieve:false,
    ads:[]
}


const getAdsReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'GET_ALL_ADS':
        return{
            adRecieve:true,
            ads:action.payload
        }

        default:
        return state;
    }
}

export default getAdsReducer;