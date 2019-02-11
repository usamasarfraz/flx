import React, { Component } from 'react';
import {Router,Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Login from './components/login/login';
import UpdatePassword from './components/updatePassword/updatePassword';
import Ad from './components/Ad/Ad';
import Signup from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';
import AdCard from './components/adCards/adCard';
import FavAdCard from './components/favAdCards/favAdCards';
import history from './history';
import store from './store/store';
import persistor from './store/persistStore';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Carousel from './components/carousel/carousel';
import Item from './components/item/item';
import ChatBox from './components/chatBox/chatBox';
// import Modal from './components/AdModal/AdModal';
class App extends Component {
  constructor(){
    super();
    fetch('/is_authenticated', {

    }).then(function (resp) {

      resp.json().then(function (resp) {
        if (resp._id) {
          store.dispatch({
            type: 'LOGIN_RESPONSE',
            payload: resp
          });

          // history.push('/dashboard');
        }

      });

    });

  }
  render() {
    return (
          <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              <div className="App">
                <Header/>
                {/* <Route exact path="/" render={()=>{
                    return <div>
                        <Link to="/login">Login Here</Link><br/>
                        <Link to="/signup"> Signup Here</Link>
                    </div>
                }}/> */}
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/password" component={UpdatePassword}/>
                <Route path="/posting" component={Ad}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route exact path="/" component={AdCard}/>
                <Route path="/favorite" component={FavAdCard}/>
                <Route path="/carousel" component={Carousel}/>
                <Route path="/item/:id" component={Item}/>
                <Route path="/chat" component={ChatBox}/>
                <Footer />
              </div>
            </Router>
            </PersistGate>
          </Provider>
    );
  }
}

export default App;
