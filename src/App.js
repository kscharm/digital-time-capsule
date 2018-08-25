import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  BrowserRouter,
} from 'react-router-dom';
import PersonalCapsule from './pages/PersonalCapsule';
import WelcomePage from './pages/Welcome';
import BottomBar from './components/BottomBar';

class App extends Component {

  render() {
    // Check for browser compatibility
    const supportsHistory = 'pushState' in window.history;

    return (
      <div className="App">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Route
            render={({ location }) => {
              const { pathname } = location;
              return (
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={WelcomePage}
                  />
                  <Route
                    path="/personalCapsule"
                    component={PersonalCapsule}
                  />
                </Switch>
              );
            }
          }
          />
        </BrowserRouter>
        <BottomBar/>
      </div>
    );
  }
}

export default App;
