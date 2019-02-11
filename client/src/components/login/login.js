import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Paper,Button,TextField,Typography,Grid,Checkbox,FormControlLabel } from '@material-ui/core';
import './login.css';
import LoginAction from '../../actions/loginAction/loginAction';
import store from '../../store/store';
import history from '../../history';
import { connect } from 'react-redux';

class Login extends Component{

    sendLoginData(){
        store.dispatch(LoginAction(document.getElementById('emailInputLoginForm').value,document.getElementById('passwordInputLoginForm').value));
    }
    render(){
            if(this.props.login.signin){
                history.push('/dashboard');
            }
        return(
                <div className="loginFormMainDiv">
                    <Typography align="left" variant="title">
                        Login
                    </Typography>
                    <Paper className="login_paper">
                    {/* Email Grid */}
                    <Grid container={true} spacing={8}>
                        <Grid item xs={3}>
                            <Typography noWrap={true} align="right" className="loginInputsText" variant="h6">
                                Your Email
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className="logininputs"
                                id="emailInputLoginForm"
                                margin="normal"
                                type="email"
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    {/* Email Grid */}


                    {/* Password Grid */}
                    <Grid container={true} spacing={8}>
                        <Grid item xs={3}>
                            <Typography noWrap={true} align="right" className="loginInputsText" variant="h6">
                                Password
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className="logininputs"
                                id="passwordInputLoginForm"
                                margin="normal"
                                type="password"
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    {/* Password Grid */}



                    {/* Remember me Checkbox */}
                    <FormControlLabel
                    control={
                    <Checkbox defaultChecked color="default" value="checkedG" />
                    }
                    label="Remember me"
                    />
                    {/* Remember me Checkbox */}

                    {/* Login Button Paper */}
                    <Paper className="login_inner_paper">
                        <Button onClick={this.sendLoginData.bind(this)} variant="contained" color="primary" className="login_button">
                            Log in
                        </Button>
                    </Paper>
                    {/* Login Button Paper */}

                    {/* Links Grid */}
                    <Grid container>
                        <Grid item xs={6}>
                            <Link className="linkText" to="/password">
                                <Typography noWrap={true} color="primary">
                                Forgot Password?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link className="linkText" to="/signup">
                                <Typography noWrap={true} color="primary">
                                    New user? Register here
                                </Typography>
                            </Link>
                        </Grid>

                    </Grid>
                    {/* Links Grid */}

                    </Paper>
                </div>

        )
    }
}

function recieveData(store) {
    return {
      login: store.LoginReducer
    };
  }
  
const newLogin = connect(recieveData)(Login);
export default newLogin;