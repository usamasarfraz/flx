import React,{Component} from 'react';
import {Typography,Paper,Grid, Divider,IconButton,Button,Table,TableHead,TableBody,TableRow,TableCell}from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import history from '../../history';
import DeleteDialogue from '../deleteDialogue/deleteDialogue';
import store from '../../store/store';
import EditAdAction from '../../actions/EditAdAction/EditAdAction';
import {connect} from 'react-redux';
import './dashboard.css';


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    }
})




class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            dialogueOpen:false,
            adID:''
        }
        fetch('/load_ads', {

        }).then(function (resp) {
    
          resp.json().then(function (resp) {

            if (resp[0]) {
              store.dispatch({
                type: 'GET_ADS_FROM_SERVER',
                payload: resp
              });
    
              history.push('/dashboard');
            }
    
          });
    
        });

    }
    showDialogueToConfirm(getID){
        this.setState({dialogueOpen:true,adID:getID});
        
    }
    sendFunctionToRecieveInfo(){
        this.setState({dialogueOpen:false});
    }

    updateDataFun(getData){
        store.dispatch(EditAdAction(getData));
        localStorage.setItem('product_data',JSON.stringify(getData));
        history.push('/posting');
    }

    render(){
        if(!this.props.login.signin){
            history.push('/login');
        }
        return(
            <div className="dashboardMainDiv">
                    <Typography align="left" variant="title">
                        Your FLX Ads
                    </Typography>
                    <Paper className="dashboard_paper">
                            <Button onClick={()=>{history.push('/favorite')}} className="fav_ads_Button" variant="contained" color="secondary">
                                Favorite ads
                                <FavoriteIcon />
                            </Button>
                        <Typography className="bottom_activeAd_typography" align="left" variant="title">
                            Active Ads 
                        </Typography>
                        <Divider/>
                        {
                            this.props.AdData.ads?<Table className="tableToShowAds">
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell>Date</CustomTableCell>
                                    <CustomTableCell>Ad Title</CustomTableCell>
                                    <CustomTableCell numeric>Price</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.AdData.ads.map((item)=>{
                                    return<TableRow key={item._id} hover={true}>
                                    <CustomTableCell>{item.date}</CustomTableCell>
                                    <CustomTableCell>
                                        <Grid container>
                                            <Grid className="adTitleShowMiddle" item>
                                            <Typography>
                                            {
                                                item.adTitle
                                            }
                                            </Typography>
                                            </Grid>
                                            <Grid item>
                                                <img width="130px" height="130px" alt="mobile-img" src={
                                                item.images[0]
                                                }/>
                                            </Grid>
                                            <Grid className="adTitleShowMiddle">
                                            <IconButton onClick={()=>{
                                                this.updateDataFun(item);
                                            }} color="primary" aria-label="Edit">
                                            <EditIcon fontSize="small" />
                                            </IconButton>

                                            <IconButton onClick={()=>{
                                                this.showDialogueToConfirm(item._id);
                                            }} color="secondary">
                                            <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            </Grid>
                                        </Grid>

                                    </CustomTableCell>
                                    <CustomTableCell numeric>{item.price}</CustomTableCell>
                                </TableRow>
                                })
                                
                                }
                            </TableBody>
                        </Table>:null
                        }
                    </Paper>
                {
                    this.state.dialogueOpen?<DeleteDialogue controlClose={this.sendFunctionToRecieveInfo.bind(this)} adID={this.state.adID}/>:null
                }
            </div>
        )
    }
}

function recieveData(store){
    return{
        AdData:store.AdReducer,
        login:store.LoginReducer
    }
}

const newDashboard = connect(recieveData)(Dashboard);


export default withStyles(styles)(newDashboard);