
var defaultState = {
    getdata:false
}


const chatReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'GET_ALL_CHAT_DATA':
        return{
            getdata:true,
            selectedUserToChat:action.selectedUserToChat,
            messages:action.messages,
            user:action.user
        }

        case 'GET_MESSAGE':
            state.messages.push(action.new_message);
        return state;
        
        default:
        return state;
    }
}

export default chatReducer;