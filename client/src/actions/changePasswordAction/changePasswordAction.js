function updatePasswordAction(data){
    return{
        type:'UPDATE_PASSWORD_ACTION',
        ...data
    }
}
export default updatePasswordAction;