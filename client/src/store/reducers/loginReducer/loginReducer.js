import userService from '../../../services/userService';

var defaultState = {
    signin:false
}


const loginReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'LOGIN_ACTION':
        userService.loginUser({
            username:action.username,
            password:action.password
        })
        return state
        
        case 'LOGIN_RESPONSE':
        return{
            signin:true,
            ...action.payload
        }

        case 'USER_LOGOUT_RESPONSE':
        return{
            signin:false
        }
        
        default:
        return state;
    }
}

export default loginReducer;