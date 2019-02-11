import React from 'react';
import {Button,Menu,MenuItem} from '@material-ui/core';
import './accountDialog.css';
import {connect} from 'react-redux';
import history from '../../history';
import userService from '../../services/userService';
import chatService from '../../services/chatService/chatService';

  class AlertDialog extends React.Component {
    state = {
      anchorEl: null,
    };
  
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = (target) => {
      switch (target) {
        case 0:
          history.push('/dashboard');
          break;
        case 1:
          history.push('/favorite');
          break;
        case 2:
          chatService.requestToGetChats();
          break;
        case 3:
          history.push('/password');
          break;
        case 4:
        userService.logoutUser();
          break;
        default:
          break;
      }
      this.setState({ anchorEl: null });
    };
  

    loginFun(){
        history.push('/login');
    }

    render() {
      const { anchorEl } = this.state;
      return (
        <div>
          {this.props.login.signin?
          <div>
          <Button
            className="myAccountButton"
            color="primary"
            variant="contained"
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            My Account
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={()=>{this.handleClose(0)}}>My Ads</MenuItem>
            <MenuItem onClick={()=>{this.handleClose(1)}}>Favorite Ads</MenuItem>
            <MenuItem onClick={()=>{this.handleClose(2)}}>Chat</MenuItem>
            <MenuItem onClick={()=>{this.handleClose(3)}}>Change Password</MenuItem>
            <MenuItem onClick={()=>{this.handleClose(4)}}>Logout</MenuItem>
          </Menu>
          </div>:<Button
            className="myAccountButton"
            color="primary"
            variant="contained"
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.loginFun.bind(this)}
          >
            Login
          </Button>
          }
        </div>
      );
    }
  }
  

  function recieveData(store) {
    return {
      login: store.LoginReducer
    };
  }
  
  const newAlertDialog = connect(recieveData)(AlertDialog);
  export default newAlertDialog;