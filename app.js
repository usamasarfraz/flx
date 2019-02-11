const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');
const userRouter = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const favoriteRoute = require('./routes/favoriteAdRoute');
const chatRoute = require('./routes/chatRoute');
const db = require('./db/db');
const server = express();
const User = require('./models/userModel/userModel');
const Ad = require('./models/productModel/productModel');
const Chat = require('./models/chatModel/chatModel');
let port = process.env.PORT || 6249;



const http = require('http').Server(server);
const io = require('socket.io')(http);





server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

passport.serializeUser(function(user,next){
    next(null,user._id.toHexString())
});

passport.deserializeUser(function(userID,next){
    User.findOne({_id:userID},function(err,user){
        next(null,user);
    });
});


server.use(cookieParser());
server.use(expressSession({secret:'myFlx'}));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static('./'));
server.use('/',userRouter);
server.use('/',productRoute);
server.use('/',favoriteRoute);
server.use('/',chatRoute);







io.on('connection',function(socket){
    socket.on('send_message',function(args){
        args.date = new Date().toLocaleTimeString() +'  '+new Date().toDateString();
        User.findById(args.reciever.user,function(err,data){
            if(!err && data){
                args.adUser = data.username.slice(0,data.username.indexOf('@'));
                args.ad = args.reciever._id;
                args.reciever = data._id;
                var chat = new Chat(args);
                chat.save(function(err,data){
                    if(!err){
                    Ad.findById(data.ad,function(err,adData){
                        if(!err){
                        data.ad = adData;
                        socket.emit('get_message',data);
                        }
                    })
                    }
                });
            }
            else{
                socket.emit('err_message',data);
            }
        })
        
    })

    socket.on('send_person_messages',function(args){
        Chat.find({$or:[{sender:args.sender,reciever:args.reciever},{reciever:args.sender,sender:args.reciever}]}).sort({_id:1}).exec(function(err,data){
            if(!err){
                socket.emit('get_person_messages',data);
            }
        })
    })

})








http.listen(port);