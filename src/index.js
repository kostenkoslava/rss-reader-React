import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';

const renderTree = (state) => {
  return ReactDOM.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)}
      setSelectedFeed={store.setSelectedFeed.bind(store)}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

store.subscribe(renderTree)
renderTree(store.state);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
