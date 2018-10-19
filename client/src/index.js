import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

ReactDOM.render(<App />, document.getElementById('root'));


