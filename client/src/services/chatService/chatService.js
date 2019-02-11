import history from '../../history';
import store from '../../store/store';
import getPersonChatAction from '../../actions/getPersonChatAction/getPersonChatAction';
import socket from '../../socket/socket';
var chatService = {
    requestToGetChats:(data)=>{
        fetch('/request_for_chats',{
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if('login' in resp){
                alert('Please login');
                history.push('/login');
            }
            else{
                if(data){
                store.dispatch({
                    type:'GET_ALL_CHAT_DATA',
                    selectedUserToChat:data,
                    messages:resp.messages,
                    user:resp.user,
                })


                let chat = resp;
                chat.sender = chat.user._id;
                chat.ad = data;
                chat.adUser = data.user_name;
                chat.reciever = data.user;

                store.dispatch(getPersonChatAction(chat));
                socket.getPersonMessage(chat);
                }
                else{
                    store.dispatch({
                        type:'GET_ALL_CHAT_DATA',
                        messages:resp.messages,
                        user:resp.user,
                    })
                }


                history.push('/chat');
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
}
export default chatService;