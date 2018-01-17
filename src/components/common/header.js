import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./header.css";

class Header extends Component {
    render() {
        return (
            <div className="container header">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <h1>Reports Administration</h1>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <ul>
                        <Link to="/"><li className={window.location.hash.indexOf("/selectCandidate") === 1 || window.location.hash.indexOf("/selectCompany") === 1 ||window.location.hash.indexOf("/submitReport") === 1 ? "" : "selected"}>Reports</li></Link>
                        <Link to="/selectCandidate"><li className={window.location.hash.indexOf("/selectCandidate") === 1 || window.location.hash.indexOf("/selectCompany") === 1 ||window.location.hash.indexOf("/submitReport") === 1 ? "selected" : ""}>New Report</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;