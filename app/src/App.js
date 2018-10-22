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

class App extends Component {
  state = {
    username: '',
    currentCapsuleID: '',
  }
  changeUsername = (user) => {
    this.setState({username: user});
  }
  changeCapsuleID = (id) => {
    this.setState({currentCapsuleID: id});
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
                    render={(props) => <Login {...props} changeUsername={this.changeUsername} changeCapsuleID={this.changeCapsuleID} />}
                  />
                  <Route
                    path="/currentCapsule"
                    //component={CurrentCapsule}
                    render={(props) => <CurrentCapsule {...props} username={this.state.username} currentCapsuleID={this.state.currentCapsuleID} changeUsername={this.changeUsername} />}
                  />
                  <Route
                    path="/registration"
                    component={RegistrationPage}
                  />
                  <Route
                    path="/myCapsules"
                    render={(props) => <MyCapsulesPage {...props} username={this.state.username} currentCapsuleID={this.state.currentCapsuleID} changeUsername={this.changeUsername} />}
                  />
                  <Route
                    path="/myFriends"
                    render={(props) => <MyFriends {...props} username={this.state.username} currentCapsuleID={this.state.currentCapsuleID} changeUsername={this.changeUsername} />}
                  />
                  <Route
                    path="/searchresult"
                    render={(props) => <Search {...props} username={this.state.username} currentCapsuleID={this.state.currentCapsuleID} changeUsername={this.changeUsername} />}
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
