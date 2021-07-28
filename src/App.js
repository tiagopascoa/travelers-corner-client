import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import MyNavbar from './components/Navbar';
import FirstPage from './components/FirstPage'
import Signup from './components/Signup';
import Login from './components/Login';
import { MainPage } from './components/MainPage';
import { NewTravelPost } from './components/NewTravelPost';
import UserArea from './components/UserArea';
import UserProfile from './components/UserProfile';
import TravelPostPage from './components/TravelPostPage';
import { loggedIn } from "./api";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  setLoggedInUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  //In case the page is refreshed I check if there's
  //an active session on the backend
  async componentDidMount() {
    const response = await loggedIn();
    if (!this.state.loggedInUser) {
      if (response.data._id) {
        this.setLoggedInUser(response.data);
      }
    }
  }
  
  render(){
    return (
      <>
        <ToastContainer />
        <MyNavbar 
          loggedInUser={this.state.loggedInUser} // For Loggin
          setLoggedInUser={this.setLoggedInUser} // For Loggout
        />
        <Switch>
          <Route exact path={"/"} component={FirstPage}/>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/new-travel-post" render={(props)=> <NewTravelPost {...props} user={this.state.loggedInUser}/>}  />
          <Route exact path="/login" render={(props) => <Login {...props} setLoggedInUser={this.setLoggedInUser} />} />
          <Route exact path="/main" render={(props)=> <MainPage {...props} user={this.state.loggedInUser}/>} />
          <Route exact path="/user-area/:loggedUserId" render={(props)=> <UserArea {...props} loggedUser={this.state.loggedInUser}/>} />
          <Route exact path="/user-profile/:userId" render={(props)=> <UserProfile {...props} user={this.state.loggedInUser}/>} />
          <Route exact path="/travel-posts/:id" render={(props)=> <TravelPostPage {...props} user={this.state.loggedInUser}/>} />
        </Switch>
        
      </>
  );
  }
  
}

export default App;
