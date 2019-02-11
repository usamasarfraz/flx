
import store from '../store/store';
import io from 'socket.io-client';
const socket = io();

export default {
    sendMessage:(data)=>{
        socket.emit('send_message',data);
    },
    getPersonMessage:(data)=>{
        socket.emit('send_person_messages',data)
    }

}




socket.on('get_message',function(args){
    store.dispatch({
        type:'GET_MESSAGE',
        new_message:args
    })
    store.dispatch({
        type:'GET_PERSON_MESSAGE',
        message:args
    })
})


socket.on('get_person_messages',function(args){
    store.dispatch({
        type:'GET_SPECIFIC_MESSAGES',
        messages:args
    })
})



socket.on('err_message',function(args){
    alert('ad Deleted.');
})