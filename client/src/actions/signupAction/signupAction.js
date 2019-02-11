function signupAction(data){
    return{
        type:'SIGNUP_ACTION',
        ...data
    }
}
export default signupAction;