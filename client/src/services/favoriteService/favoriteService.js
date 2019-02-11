import history from '../../history';
import store from '../../store/store';
var favoriteService = {
    sendFavReq:function(id,state){
        fetch('/add_remove_favorite',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ad:id
            })
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp._id){
                var fav = state.favoriteAds.find((item)=>{
                    return item === resp.ad
                })
                if(fav){
                    state.favoriteAds.splice(state.favoriteAds.indexOf(fav),1)
                    store.dispatch({
                        type:'RECIEVE_FAVORITE_ADS',
                        payload:state.favoriteAds
                    })
                }
                else{
                    state.favoriteAds.push(resp.ad);
                    store.dispatch({
                        type:'RECIEVE_FAVORITE_ADS',
                        payload:state.favoriteAds
                    })
                }
            }
            else{
                alert('Please Login.');
                history.push('/login');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}

export default favoriteService;