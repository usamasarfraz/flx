import React,{Component} from 'react';
import {TextField,Button,Typography,Paper,Grid,Snackbar} from '@material-ui/core';
import signupAction from '../../actions/signupAction/signupAction';
import store from '../../store/store';
import history from '../../history';
import {connect} from 'react-redux';
import './signup.css';
class Signup extends Component{
    constructor(){
        super();
        this.state = {
            username:'',
            password:'',
            repeatePassword:'',
            alertMsg: false,
        }
    }
    
      handleClose = () => {
        this.setState({ alertMsg: false });
    };

    handleChange=(value,evt)=>{
        this.setState({[value]:evt.target.value})
        let repeatePasswordField = document.getElementById('signupRepeatePasswordField');
        repeatePasswordField.value && repeatePasswordField.value !== this.state.password?repeatePasswordField.style.background = 'red': repeatePasswordField.style.background = 'white';
    }
    
    signupFun(evt){
        evt.preventDefault();
        let repeatePasswordField = document.getElementById('signupRepeatePasswordField');
        if(repeatePasswordField.style.background === 'red'){
            this.setState({ alertMsg: true });
            repeatePasswordField.focus();
        }
        else{
            store.dispatch(signupAction(this.state));
        }
    }

    render(){
            if(this.props.login.signin){
                history.push('/dashboard');
            }
        return(
            <form onSubmit={this.signupFun.bind(this)}>
            <div className="signupFormMainDiv">
                    <Typography align="left" variant="title">
                        Create an account
                    </Typography>
                    <Paper className="signup_paper">
                        {/* Main Grid */}
                        <Grid container spacing={16}>
                            <Grid item xs={8}>
                                {/* Email Grid */}
                                <Grid container={true} spacing={8}>
                                    <Grid item xs={4}>
                                        <Typography noWrap={true} align="right" className="signupInputsText" variant="h6">
                                            Email*
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className="signupInputs"
                                            required={true}
                                            onInput={this.handleChange.bind(this,'username')}
                                            margin="normal"
                                            type="email"
                                            variant="outlined"
                                            />
                                    </Grid>
                                </Grid>
                                {/* Email Grid */}


                                {/* Password Grid */}
                                <Grid container={true} spacing={8}>
                                    <Grid item xs={4}>
                                        <Typography noWrap={true} align="right" className="signupInputsText" variant="h6">
                                            Password*
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className="signupInputs"
                                            required={true}
                                            onInput={this.handleChange.bind(this,'password')}
                                            margin="normal"
                                            type="password"
                                            variant="outlined"
                                            />
                                    </Grid>
                                </Grid>
                                {/* Password Grid */}





                                {/* Repeat Password Grid */}
                                <Grid container={true} spacing={8}>
                                    <Grid item xs={4}>
                                        <Typography noWrap={true} align="right" className="signupInputsText" variant="h6">
                                            Repeat Password*
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className="signupInputs"
                                            required={true}
                                            onInput={this.handleChange.bind(this,'repeatePassword')}
                                            id="signupRepeatePasswordField"
                                            margin="normal"
                                            type="password"
                                            variant="outlined"
                                            />
                                    </Grid>
                                </Grid>
                                {/* Repeat Password Grid */}




                                {/* Change Password Button */}
                                    <div className="create_account_button_div">
                                    <Button type="submit" variant="contained" color="primary" >
                                        Create
                                    </Button>
                                    </div>
                                {/* Change Password Button */}
                            </Grid>


                            {/* Text Grid */}
                            <Grid item xs={3}>
                                <div className="signup_text_grid">
                                    <div>
                                    <Typography variant="caption">By having a password you will have access to <b>My ads</b> where you can:</Typography>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                            <Typography variant="caption">Edit or Delete your Ads</Typography>
                                            </li>
                                            <li>
                                            <Typography variant="caption">Check responses for your Ads</Typography>
                                            </li>
                                            <li>
                                            <Typography variant="caption">See saved Ads</Typography>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                    <Typography variant="caption">Provide your e-mail address &amp; password and click confirm link in e-mail which will be sent to you..</Typography>
                                    </div>
                                </div>
                            </Grid>
                            {/* Text Grid */}


                        </Grid>
                        {/* Main Grid */}
                    </Paper>
                </div>


                <Snackbar
                    anchorOrigin={ {vertical: 'top', horizontal: 'center'} }
                    open={this.state.alertMsg}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    
                    message={<span id="message-id" style={{color:'red'}}>Password Not Match !</span>}
                />


                </form>
        )
    }
}

function recieveData(store){
    return{
        signupData:store.signupReducer,
        login:store.LoginReducer
    }
}

const newSignup = connect(recieveData)(Signup);
export default newSignup;