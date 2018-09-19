import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  BrowserRouter,
} from 'react-router-dom';
import PersonalCapsule from './pages/PersonalCapsule';
import WelcomePage from './pages/Welcome';

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
      </div>
    );
  }
}

export default App;
