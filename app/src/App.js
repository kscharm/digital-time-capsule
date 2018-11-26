import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  BrowserRouter,
  Redirect,
  // Link,
} from 'react-router-dom';
import CurrentCapsule from './pages/CurrentCapsule';
import Login, {fakeAuth} from './pages/Welcome';
import RegistrationPage from './pages/Registration';
import MyCapsulesPage from './pages/MyCapsules';
import MyFriends from './pages/Friends';
import Search from './pages/SearchResult';
import Profile from './pages/Profile';
import Setting from './pages/Settings';
import Background from '../src/images/cork.jpg';

class App extends Component {
  state = {
    username: '',
    currentCapsuleID: '',
    term: '',
    usercapsule: '',
    userID: '',
    userSiteColor: '',
    userBackgroundImage: '',
    userPhoto: '',
  }
  changeUsername = (user) => {
    this.setState({username: user});
  }
  changeUserID = (id) => {
    this.setState({userID: id});
  }
  setUserCap = (capsule) => {
    this.setState({usercapsule: capsule});
  }
  setUserPhoto = (photo) => {
    this.setState({userPhoto: photo});
  }
  changeCapsuleID = (id) => {
    this.setState({currentCapsuleID: id});
  }
  changeUserSiteColor = (color) => {
    this.setState({userSiteColor: color});
  }
  changeUserBackgroundImage = (image) => {
    this.setState({userBackgroundImage: image});
  }
  getSearch = (term) => {
    this.setState({term: term});
  }

  render() {
    // Check for browser compatibility
    const supportsHistory = 'pushState' in window.history;
    // Render each page based on the path
    return (
      <div className="App">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Route
            render={({ location }) => {
              return (
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => <Login 
                      {...props} 
                      changeUsername={this.changeUsername}
                      setUserCap={this.setUserCap}
                      changeCapsuleID={this.changeCapsuleID}
                      changeUserID={this.changeUserID}
                      changeUserBackgroundImage={this.changeUserBackgroundImage}
                      changeUserSiteColor={this.changeUserSiteColor} 
                      setUserPhoto={this.setUserPhoto}
                      />}
                  />
                  <Route
                    path={`/currentCapsule/:user/${this.state.currentCapsuleID}`}
                    //component={CurrentCapsule}
                    render={(props) => <CurrentCapsule 
                      {...props} 
                      username={this.state.username}
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID}
                      getSearch={this.getSearch}
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      />}
                  />
                  <Route
                    path="/registration"
                    component={RegistrationPage}
                  />
                  <Route
                    path="/myCapsules/:user"
                    render={(props) => <MyCapsulesPage 
                      {...props} 
                      username={this.state.username}
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID} 
                      getSearch={this.getSearch}
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      />}
                  />
                  <Route
                    path="/myFriends/:user"
                    render={(props) => <MyFriends 
                      {...props} 
                      username={this.state.username} 
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID}
                      getSearch={this.getSearch} 
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      userPhoto={this.state.userPhoto}
                      />}
                  />
                  <Route
                    path={`/searchresult/:term`}
                    render={(props) => <Search 
                      {...props} 
                      username={this.state.username}
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID} 
                      term={this.state.term}
                      getSearch={this.getSearch}
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      userPhoto={this.state.userPhoto}
                      />}
                  />
                  <Route
                    path="/profile/:user/:userID"
                    render={(props) => <Profile 
                      {...props} 
                      username={this.state.username} 
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID}
                      getSearch={this.getSearch} 
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      userPhoto={this.state.userPhoto}
                      />}
                  />
                  <Route
                    path="/settings/:user/:userID"
                    render={(props) => <Setting 
                      {...props} 
                      username={this.state.username} 
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername}
                      userID={this.state.userID} 
                      changeUserID={this.changeUserID}
                      getSearch={this.getSearch} 
                      changeCapsuleID={this.changeCapsuleID}
                      userSiteColor={this.state.userSiteColor}
                      userBackgroundImage={this.state.userBackgroundImage}
                      changeUserSiteColor={this.changeUserSiteColor}
                      changeUserBackgroundImage={this.changeUserBackgroundImage}
                      />}
                  />
                </Switch>
              );
            }
          }
          />
        </BrowserRouter>
      </div>
    );
  }
}

//Private router function
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )}
    />
  );
};

export default App;
