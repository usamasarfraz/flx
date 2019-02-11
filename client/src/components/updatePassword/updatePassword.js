import React,{Component} from 'react';
import {TextField,Button,Typography,Paper,Grid,Snackbar} from '@material-ui/core';
import UpdatePasswordAction from '../../actions/changePasswordAction/changePasswordAction';
import store from '../../store/store';
import './updatePassword.css';
class UpdatePassword extends Component{
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
        let repeatePasswordField = document.getElementById('updateRepeatePasswordField');
        repeatePasswordField.value && repeatePasswordField.value !== this.state.password?repeatePasswordField.style.background = 'red': repeatePasswordField.style.background = 'white';
    }
    
    UpdatePasswordFun(evt){
        evt.preventDefault();
        let repeatePasswordField = document.getElementById('updateRepeatePasswordField');
        if(repeatePasswordField.style.background === 'red'){
            this.setState({ alertMsg: true });
            repeatePasswordField.focus();
        }
        else{
            store.dispatch(UpdatePasswordAction(this.state));
        }
    }

    render(){
        return(
            <form onSubmit={this.UpdatePasswordFun.bind(this)}>
            <div className="updateFormMainDiv">
                    <Typography align="left" variant="title">
                        Update Password
                    </Typography>
                    <Paper className="update_paper">
                    {/* Email Grid */}
                    <Grid container={true} spacing={8}>
                        <Grid item xs={4}>
                            <Typography noWrap={true} align="right" className="updateInputsText" variant="h6">
                                Email*
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className="updateinputs"
                                onInput={this.handleChange.bind(this,'username')}
                                required={true}
                                margin="normal"
                                type="email"
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    {/* Email Grid */}


                    {/* New Password Grid */}
                    <Grid container={true} spacing={8}>
                        <Grid item xs={4}>
                            <Typography noWrap={true} align="right" className="updateInputsText" variant="h6">
                                New Password*
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className="updateinputs"
                                onInput={this.handleChange.bind(this,'password')}
                                required={true}
                                margin="normal"
                                type="password"
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    {/* New Password Grid */}





                    {/* Repeat Password Grid */}
                    <Grid container={true} spacing={8}>
                        <Grid item xs={4}>
                            <Typography noWrap={true} align="right" className="updateInputsText" variant="h6">
                                Repeat Password*
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                className="updateinputs"
                                onInput={this.handleChange.bind(this,'repeatePassword')}
                                required={true}
                                id="updateRepeatePasswordField"
                                margin="normal"
                                type="password"
                                variant="outlined"
                                />
                        </Grid>
                    </Grid>
                    {/* Repeat Password Grid */}




                    {/* Change Password Button */}
                        <div className="update_button_div">
                        <Button type="submit" variant="contained" color="primary" >
                            Change
                        </Button>
                        </div>
                    {/* Change Password Button */}


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

export default UpdatePassword;