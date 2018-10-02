import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  BrowserRouter,
} from 'react-router-dom';
import CurrentCapsule from './pages/CurrentCapsule';
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
              return (
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={WelcomePage}
                  />
                  <Route
                    path="/currentCapsule"
                    component={CurrentCapsule}
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
