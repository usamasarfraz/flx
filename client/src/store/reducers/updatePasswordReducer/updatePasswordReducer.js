import userService from '../../../services/userService';

var defaultState = {
    signup:false
}


const updatePasswordReducer = (state = defaultState,action)=>{
    switch(action.type){

        case 'UPDATE_PASSWORD_ACTION':
        userService.updatePasswordUser({
            username:action.username,
            password:action.password
        })
        return state;
        
        case 'UPDATE_PASSWORD_RESPONSE':
        return{
            update:true,
            ...action.payload
        }

        case 'User_NOT_FOUND':
        return{
            userNotFound:true
        }

        default:
        return state;
    }
}

export default updatePasswordReducer;