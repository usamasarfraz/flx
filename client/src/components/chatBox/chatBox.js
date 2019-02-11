import React,{Component} from 'react';
import {Grid,Typography,TextField} from '@material-ui/core';
import Icon from '@material-ui/icons/Send';
import chatImg from './images/speech-bubble.svg';
import personImg from './images/man.svg';
import './chatbox.css';
import socket from '../../socket/socket';
import {connect} from 'react-redux';
import store from '../../store/store';
import history from '../../history';
import getPersonChatAction from '../../actions/getPersonChatAction/getPersonChatAction';
class ChatBox extends Component{
    constructor(){
        super();
        this.state = {
            messageValue:''
        }
    }

    handleMessageValue(evt){
        this.setState({messageValue:evt.target.value});
    }


    sendMessage(){
        if(this.state.messageValue){
            if(this.props.chatData.user._id === this.props.chatData.selectedUserToChat.user){
                let reciever = this.props.chatData.selectedUserToChat;
                reciever.user = this.props.chatData.user.newUser._id;
                socket.sendMessage({message:this.state.messageValue,sender:this.props.chatData.user,reciever:reciever});
            }
            else{
                socket.sendMessage({message:this.state.messageValue,sender:this.props.chatData.user,reciever:this.props.chatData.selectedUserToChat});
            }
        this.setState({messageValue:''});
        }
    }


    getPersonChat(data){
        data.messages = this.props.chatData.messages;
        if(this.props.chatData.user._id === data.ad.user){
            this.props.chatData.user.newUser = {_id:data.user};
            data.user = this.props.chatData.user;
        }
        else{
        data.user = this.props.chatData.user;
        }
        store.dispatch(getPersonChatAction(data));
        socket.getPersonMessage(data);
        
    }
    

    render(){
        let arr = [];
            if(this.props.login.signin){
            let messages = this.props.chatData.messages;
            for(let i = messages.length-1; i >= 0; i--){
                let check = arr.find((item)=>{
                    return messages[i].reciever === item.user || messages[i].sender === item.user;
                })
                if(!check){
                    if(messages[i].sender === this.props.chatData.user._id){
                        arr.push({user:messages[i].reciever,...messages[i]});
                    }
                    else{
                        arr.push({user:messages[i].sender,...messages[i]});
                    }
                }
        
            }
        }
        else{
            history.push('/login');
        }
        return(
            <div className="chatBoxMainDiv">
                <Grid container>
                    <Grid item xs={5}>
                        <div className="chatSideBar">
                            {arr.map((value,index)=>{

                            return <div onClick={()=>{
                                this.getPersonChat(value);
                            }} key={index} className="person-chat">
                                <Grid container>
                                    <Grid item xs={3}>
                                        <div className="person-chat-inner-div">
                                            <img height="45px" src={personImg} alt="person_img" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="person-chat-inner-div">
                                            <Typography align="left" variant="subheading">
                                                <strong>{value.adUser}</strong>
                                            </Typography>
                                            <Typography align="left">
                                                {}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className="person-chat-date-div">
                                            <Typography>
                                            {value.date.slice(0,value.date.indexOf(' '))}
                                            </Typography>
                                            <Typography>
                                            {value.date.slice(value.date.indexOf(' ')+2)}
                                            </Typography>
                                        </div>

                                    </Grid>
                                </Grid>
                            </div>
                            })
                        }
                            
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div className="chatMessageBox">
                        {   this.props.chatMessages.getMessages?
                            <div className="chatMessagesMainDiv">
                                {
                                    this.props.chatMessages.messages.map((item,index)=>{
                                        if(item.sender === this.props.chatData.user._id){
                                            return <div key={index} className="sender"><div className="senderInnerDiv">{item.message}</div></div>
                                        }
                                        else{
                                            return <div key={index} className="reciever"><div className="recieverInnerDiv">{item.message}</div></div>
                                        }
                                    })
                                }
                            </div>:
                            <div className="chatImgDiv">
                                <img src={chatImg} alt="chat_img" />
                                <Typography variant="subheading">
                                    Select a chat to view conversation
                                </Typography>
                            </div>
                        }

                            <div className="chat_inputField_div">
                            <TextField
                            className="chat_inputField"
                            id="outlined-chat"
                            value={this.state.messageValue}
                            onChange={this.handleMessageValue.bind(this)}
                            margin="normal"
                            variant="outlined"
                            />
                            </div>
                            <div onClick={this.sendMessage.bind(this)} className="sendIconDiv">
                                <Icon color="primary"/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


function recieveData(store) {
    return {
      chatData: store.chatReducer,
      chatMessages: store.chatMessagesReducer,
      login: store.LoginReducer
    };
  }
  
const newChatBox = connect(recieveData)(ChatBox);
export default newChatBox;