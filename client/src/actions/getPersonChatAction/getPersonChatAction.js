function getPersonChatAction(data){
    return{
        type:'GET_ALL_CHAT_DATA',
        selectedUserToChat:data.ad,
        messages:data.messages,
        user:data.user
    }
}
export default getPersonChatAction;