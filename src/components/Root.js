import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import UserAdd from './UserAdd';
const Root = () => (
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/user/add" component={UserAdd}/>
    </Router>
  
);

export default Root;