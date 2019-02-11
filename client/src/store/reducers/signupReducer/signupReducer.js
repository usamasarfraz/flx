import userService from '../../../services/userService';

var defaultState = {
    signup:false,
    userAlreadyRegistered:false
}


const signupReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'SIGNUP_ACTION':
        userService.signupUser({
            username:action.username,
            password:action.password
        })
        return state;
        
        case 'SIGNUP_RESPONSE':
        return{
            signup:true,
            ...action.payload
        }

        case 'ALREADY_REGISTERED':
        return{
            userAlreadyRegistered:true
        }

        default:
        return state;
    }
}

export default signupReducer;