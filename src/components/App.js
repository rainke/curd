import React, { Component } from 'react';
import {Link} from 'react-router';
class App extends Component {
  render() {
    return (
      <div>
        <h1> hello CURD</h1>
        <Link to="/user/add" >add user</Link>
      </div>
    );
  }
}

export default App;
