import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Grid,Checkbox,FormControlLabel,CardMedia,CardContent,CardActions,CardActionArea,Card,Typography} from '@material-ui/core';
import {FavoriteBorder,Favorite} from '@material-ui/icons';
import {connect} from 'react-redux';
import ProductServices from '../../services/productServices';
import FavoriteAction from '../../actions/favoriteAction/favoriteAction';
import adDetailAction from '../../actions/adDetailAction/adDetailAction';
import store from '../../store/store';
import history from '../../history';

const styles = {
  card: {
    maxWidth: `${24}%`,
    minWidth: 220,
    margin:6,
    display:'inline-block'
  },
  media: {
    marginTop:20,
    height: 200,
  },
  cards_div: {
    width: `${95}%`,
    margin: 'auto'
  },
  adDateTypography:{
    marginTop:20
}
};
class FavMediaCard extends Component{
    constructor(){
        super();
        ProductServices.reqForAllAds();
    }

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


    sendAdDetailFun(data){
        store.dispatch(adDetailAction(data));
        history.push('/item/'+data._id);
    }

    render(){
        if(!this.props.login.signin){
            history.push('/login');
        }
        const { classes } = this.props;
        return (
        <div className={classes.cards_div}>

            {
                this.props.AdData.ads.map((item)=>{
                    return this.props.favorite.favoriteAds.map((fav)=>{
                        if(item._id === fav){
                            return<Card key={item._id} className={classes.card}>
                            <CardActionArea onClick={()=>{this.sendAdDetailFun(item)}}>
                                <CardMedia
                                component="img"
                                className={classes.media}
                                image={item.images[0]}
                                title={item.adTitle}
                                alt="ad-image"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    RS {item.price}
                                </Typography>
                                <Typography variant="button" align="left" component="p">
                                    {item.adTitle}
                                </Typography>
                                <Typography noWrap={true} align="left" component="p">
                                    {item.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Grid container spacing={32}>
                        <Grid item xs={10}>
                            <Typography className={classes.adDateTypography} align="left" color="textSecondary" variant="caption">
                                {item.date}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        {this.checkChecked(item)?<FormControlLabel
                            control={
                                <Checkbox checked={true} onChange={(evt)=>{this.favFun(item)}} color="secondary" icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                            }
                        />:<FormControlLabel
                        control={
                            <Checkbox checked={false} onChange={(evt)=>{this.favFun(item)}} icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                        }
                    />}
                        </Grid> 
                        </Grid>
                                
                                
                            </CardActions>
                            </Card>
                        }
                    })
                })
            }
        </div>
        );
        }
}

function recieveData(store) {
    return {
      AdData: store.getAdsReducer,
      favorite:store.favoriteAdReducer,
      login:store.LoginReducer
    };
  }
  
const newFavMediaCard = connect(recieveData)(FavMediaCard);

export default withStyles(styles)(newFavMediaCard);