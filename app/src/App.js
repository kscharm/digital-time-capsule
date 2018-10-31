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
    term: '',
    usercapsule: '',
  }
  changeUsername = (user) => {
    this.setState({username: user});
  }
  setUserCap = (capsule) => {
    this.setState({usercapsule: capsule});
  }
  changeCapsuleID = (id) => {
    this.setState({currentCapsuleID: id});
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
                      />}
                  />
                  <Route
                    path="/currentCapsule/:user/:capsuleID"
                    //component={CurrentCapsule}
                    render={(props) => <CurrentCapsule 
                      {...props} 
                      username={this.state.username} 
                      usercapsule={this.state.usercapsule}
                      currentCapsuleID={this.state.currentCapsuleID} 
                      changeUsername={this.changeUsername} 
                      getSearch={this.getSearch}
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
                      getSearch={this.getSearch}
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
                      getSearch={this.getSearch} 
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
                      term={this.state.term}
                      getSearch={this.getSearch}
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
