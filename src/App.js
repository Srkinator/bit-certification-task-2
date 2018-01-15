import React, { Component } from 'react';
import './App.css';

import Header from '../src/components/common/header';
import ReportList from '../src/components/reportList/reportList';

class App extends Component {
  render() {
    return (
      <div className="container-fluid main-container">
        <Header />
        <ReportList />
      </div>
    );
  }
}

export default App;
