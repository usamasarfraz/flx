import React,{ Component } from 'react';
import './header.css';
import flxPic from './images/flx.gif';
import history from '../../history';
import {List,ListItem,Button,Toolbar,Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountDialog from '../accountDialog/accountDialog';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      height:40,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });
  


class Header extends Component{
    goPostingForm(){
        history.push('/posting');
    }
    goToHome(){
        history.push('/');
    }
    render(){
        const { classes } = this.props;
        return(
                <div className="header">
                        <div className="imgDiv">
                            <List component="nav">
                                <ListItem>
                                    <img onClick={this.goToHome.bind(this)} src={flxPic} alt="olx-logo"/><Typography className="img_text">Pakistan's Largest Marketplace</Typography>
                                </ListItem>
                            </List>
                        </div>
                        <Toolbar className="qrAndButtonsDiv">
                            <List component="nav">
                                <ListItem>
                                    <div className="inner_qrAndButtonsDiv">
                                        <div>
                                            <AccountDialog/>
                                        </div>
                                        { history.location.pathname === "/posting"?null:<div>
                                            <Button onClick={this.goPostingForm.bind(this)} id="submitAdButton" variant="contained" className={classes.button}>
                                            <Typography noWrap={true} variant="button" color="inherit">Submit an Ad</Typography>
                                            </Button>
                                        </div>
                                        
                                        }
                                    </div>

                                </ListItem>
                            </List>
                        </Toolbar>
                    
                </div>
        )
    }
}
export default withStyles(styles)(Header);