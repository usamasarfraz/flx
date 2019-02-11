import history from '../history';
import store from '../store/store';
var userServices = {
    loginUser:(data)=>{
        fetch('/login_user',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp._id){
            store.dispatch({
                type:'LOGIN_RESPONSE',
                payload:resp
            })
            history.push('/Dashboard');
            }
        }).catch((err)=>{
            alert('Username or Password is Incorrect.');
            console.log(err);
        })
    },


    signupUser:(data)=>{
        fetch('/signup_user',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp._id){
            store.dispatch({
                type:'SIGNUP_RESPONSE',
                payload:resp
            });
            history.push('/login');
        }
            else{
                store.dispatch({
                    type:'ALREADY_REGISTERED',
                    
                });
                alert('Username Already Registered.')
            }
        }).catch((err)=>{
            console.log(err);
        })
    },



    updatePasswordUser:(data)=>{
        fetch('/update_user',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp._id){
            store.dispatch({
                type:'UPDATE_PASSWORD_RESPONSE',
                payload:resp
            });
            history.push('/login');
        }
            else{
                store.dispatch({
                    type:'User_NOT_FOUND',
                    
                });
                alert('Username Not Found !');
            }
        }).catch((err)=>{
            console.log(err);
        })
    },


    logoutUser:()=>{
        fetch('logout_user',{
        }).then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            if(resp.logout){
                store.dispatch({
                    type:'USER_LOGOUT_RESPONSE'
                })
                history.push('/login');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }


}

export default userServices;