function favoriteAdAction(data){
    return{
        type:'SEND_FAV_ACTION',
        id:data._id
    }
}
export default favoriteAdAction;