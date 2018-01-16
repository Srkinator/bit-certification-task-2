import React, { Component } from 'react';

import RedirectionService from '../../services/redirectionService';
import './submitReport.css';

const candidateName = localStorage.getItem("candidateName");
const companyName = localStorage.getItem("companyName");

class SubmitReport extends Component {
    constructor(props) {
        super(props);

        this.state={
            reportInfo:{}
        }

        this.redirection = new RedirectionService();
    }



    goBack = () => {
        this.redirection.redirect("selectCompany");
    }

    render() {
        return (
            <div className="row">
                <div className="col-4 wizard-selector">
                    <ol>
                        <li>Select Candidate</li>
                        <li>Select Company</li>
                        <li><b>Fill Report Details</b></li>
                    </ol>
                    <h4>Candidate Name</h4>
                    <h2>{candidateName}</h2>
                    <h4>Company Name</h4>
                    <h2>{companyName}</h2>
                </div>
                <div className="col-8">
                    <button onClick={this.redirectTo} type="button" id="btn" className="btn btn-primary disabled">Next</button>
                    <button onClick={this.goBack} type="button" id="back" className="btn btn-info">Back</button>
                </div>
            </div>
        );
    }
}

export default SubmitReport;