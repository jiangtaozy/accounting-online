import React, { Component } from 'react';
import './App.css';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AccountTable />
        <AccountForm />
      </div>
    );
  }
}

export default App;
