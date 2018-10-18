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

class App extends Component {  
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
                    component={Login}
                  />
                  <PrivateRoute
                    path="/currentCapsule"
                    component={CurrentCapsule}
                    
                  />
                  <Route
                    path="/registration"
                    component={RegistrationPage}
                  />
                  <Route
                    path="/myCapsules"
                    component={MyCapsulesPage}
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
