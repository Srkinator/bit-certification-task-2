import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Header from '../src/components/common/header';
// import Footer from '../src/components/common/footer';
import ReportList from '../src/components/reportList/reportList';
import SelectCandidate from '../src/components/submitReport/selectCandidate';
import SelectCompany from '../src/components/submitReport/selectCompany';
import SubmitReport from '../src/components/submitReport/submitReport';

class App extends Component {
  render() {
    return (
      <div className="container-fluid main-container">
      <div id="img-background"></div>
        <Header />
        <Switch>
          <Route exact path="/" component={ReportList} />
          <Route path="/selectCandidate" component={SelectCandidate} />
          <Route path="/selectCompany" component={SelectCompany} />
          <Route path="/submitReport" component={SubmitReport} />
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
