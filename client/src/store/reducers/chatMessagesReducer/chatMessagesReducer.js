var defaultState = {
    getMessages:false,
    messages:[]
}


const chatMessagesReducer = (state = defaultState,action)=>{
    switch(action.type){
        case 'GET_PERSON_MESSAGE':
        let getState = state.messages;
        getState.push(action.message);
        return {
            getMessages:true,
            messages:getState
        }
        case 'GET_SPECIFIC_MESSAGES':
        return {
            getMessages:true,
            messages:action.messages
        }
        default:
        return state;
    }
}

export default chatMessagesReducer;