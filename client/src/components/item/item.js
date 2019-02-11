import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Grid,Paper,Typography,Checkbox,FormControlLabel,Button,Divider} from '@material-ui/core';
import {FavoriteBorder,Favorite} from '@material-ui/icons';
import Carousel from '../carousel/carousel';
import './item.css';
import userIMG from './images/user.svg';
import FavoriteAction from '../../actions/favoriteAction/favoriteAction';
import chatService from '../../services/chatService/chatService';
import store from '../../store/store';
class Item extends Component {


    favFun(item){
        store.dispatch(FavoriteAction(item));
    }

    checkChecked(item){
        if(this.props.favorite.favoriteAds){
            var ad = this.props.favorite.favoriteAds.find((adID)=>{
                return adID === item._id
            })
            if(ad){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }


    requestForChat(data){
        chatService.requestToGetChats(data);

    }


    render() {
        return (
                <div className="item_main_div">
                {this.props.Ad.adRecieve?
                <Grid container spacing={16}>
                    <Grid item md={8}>
                        <Paper className="carouel-paper">
                            <Carousel images={this.props.Ad.ad.images}/>
                        </Paper>
                    </Grid>
                    <Grid item md={4}>
                            <Paper className="adInfoPaper">
                                <div className="adInfoDiv">
                                    <Grid container spacing={32}>
                                        <Grid item xs={10}>
                                            <Typography noWrap={true} align="left" variant="h4">
                                                <strong>RS {this.props.Ad.ad.price}</strong>
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                        {this.checkChecked(this.props.Ad.ad)?<FormControlLabel
                                                control={
                                                    <Checkbox checked={true} onChange={(evt)=>{this.favFun(this.props.Ad.ad)}} color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                                                }
                                            />:<FormControlLabel
                                            control={
                                                <Checkbox checked={false} onChange={(evt)=>{this.favFun(this.props.Ad.ad)}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                                            }
                                        />}
                                        </Grid>
                                    </Grid>
                                    </div>
                                    <div>
                                        <Typography noWrap={true} color="textSecondary" variant="headline" align="left">
                                            {this.props.Ad.ad.adTitle}
                                        </Typography>
                                    </div>
                                    <div className="adInfoDateDiv">
                                    <Typography noWrap={true} color="textSecondary" align="right">
                                        {this.props.Ad.ad.date}
                                    </Typography>
                                    </div>
                            </Paper>

                            <Paper className="sellerContactPaper">
                                <div>
                                    <Typography className="userInfoPaper" noWrap={true} align="left" variant="h5">
                                        Contact the seller
                                    </Typography>
                                </div>
                                <div className="userImgDiv">
                                    <img className="personImg" height="115px" src={userIMG} alt="user_img" />
                                    <span className="personNameSpan">{this.props.Ad.ad.user_name}</span>
                                </div>
                                <div className="chatButtonDiv">
                                    <Button onClick={()=>{this.requestForChat(this.props.Ad.ad)}} className="chatButton" fullWidth={true} variant="contained" color="primary">
                                        Chat
                                    </Button>
                                </div>
                            </Paper>

                        </Grid>
                </Grid>:null}

                {this.props.Ad.adRecieve?<Grid container spacing={16}>
                    <Grid item xs={8}>
                        <Paper className="itemDescriptionPaper">
                            <div>
                                <div>
                                    <Typography noWrap={true} variant="headline" align="left" >
                                        DETAILS
                                    </Typography>
                                </div>
                                <Grid container>
                                    <Grid item xs={7}>
                                        <Typography noWrap={true} variant="subheading" align="left">
                                            CATEGORY
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography color="textSecondary" noWrap={true} variant="subheading" align="left">
                                            {this.props.Ad.ad.category}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            <Divider/>
                            <div>
                                <Typography noWrap={true} variant="headline" align="left">
                                    DESCRIPTION
                                </Typography>
                                <div className="descriptionContent">
                                    <Typography variant="subheading" align="left">
                                        {this.props.Ad.ad.description}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>:null}
            </div>
            );
    }
};

function recieveData(store) {
    return {
      Ad: store.adDetailReducer,
      favorite:store.favoriteAdReducer,
      chat:store.chatReducer
    };
  }
  
const newItem = connect(recieveData)(Item);

export default newItem;