import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Control for redering the app
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();