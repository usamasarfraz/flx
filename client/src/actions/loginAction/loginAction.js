
function loginAction(username,password){
    return{
        type:'LOGIN_ACTION',
        username:username,
        password:password
    }
}
export default loginAction;