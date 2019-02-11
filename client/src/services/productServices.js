import history from '../history';
import store from '../store/store';
var productServices = {
    adSubmit:(actionData)=>{
        var formData = new FormData();
        formData.append('adTitle',actionData.adTitle);
        formData.append('category',actionData.category);
        formData.append('description',actionData.description);
        formData.append('price',actionData.price);
        formData.append('image',actionData.image1);
        formData.append('image',actionData.image2);
        formData.append('image',actionData.image3);
        formData.append('image',actionData.image4);
        formData.append('image',actionData.image5);
        formData.append('image',actionData.image6);
        formData.append('image',actionData.image7);
        formData.append('image',actionData.image8);
        formData.append('image',actionData.image9);
        formData.append('image',actionData.image10);
        formData.append('image',actionData.image11);
        formData.append('image',actionData.image12);
        formData.append('user_name',actionData.user_name);
        formData.append('phone',actionData.phone);
        formData.append('province',actionData.province);
        if(actionData._id){
            formData.append('_id',actionData._id);
        }
        fetch('/submitAd', {
            method: 'POST',
            body: formData
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp._id){
                store.dispatch({
                    type:'SUBMIT_AD_RESPONSE',
                    payload:resp
                })
                alert('Ad Submitted Succesfully.')
                history.push('/dashboard');
            }
            else{
                alert('Login your Account to Submit Ad.');
                history.push('/login');
            }
        }).catch((err)=>{
            console.log(err);
        });
    },


    adDelete:function(id,state){
        fetch('/delete_ad?id='+id,{
            method:'delete'
        }).then((resp)=>{
          return resp.json();
        }).then((resp)=>{
            if(resp._id){
                let ads = state.ads.filter((item)=>{
                    return item._id !== resp._id;
                })

                store.dispatch({
                    type:'GET_ADS_FROM_SERVER',
                    payload:ads
                });

                history.push('/dashboard');
            }
        }).catch((err)=>{
          console.log(err);
        })
    },

    reqForAllAds:function(){
        fetch('/get_all_ads',{

        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.ads){
                if(resp.ads.length){
                    store.dispatch({
                        type:'GET_ALL_ADS',
                        payload:resp.ads
                    })
                    store.dispatch({
                        type:'RECIEVE_FAVORITE_ADS',
                        payload:resp.fav.map((item)=>{
                            return item.ad
                        })
                    })
                }
            }
            else{
                store.dispatch({
                    type:'GET_ALL_ADS',
                    payload:resp
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

}
export default productServices;