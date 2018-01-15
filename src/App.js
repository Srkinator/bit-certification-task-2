import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Header from '../src/components/common/header';
import ReportList from '../src/components/reportList/reportList';
import SelectCandidate from '../src/components/submitReport/selectCandidate';
import SelectCompany from '../src/components/submitReport/selectCompany';

class App extends Component {
  render() {
    return (
      <div className="container-fluid main-container">
        <Header />
        <Switch>
          <Route exact path="/" component={ReportList} />
          <Route path="/selectCandidate" component={SelectCandidate} />
          <Route path="/selectCompany" component={SelectCompany} />
        </Switch>
      </div>
    );
  }
}

export default App;
