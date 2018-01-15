import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./header.css";

class Header extends Component {
    render() {
        return (
            <div className="container header">
                <div className="row">
                    <div className="col-6">
                        <h1>Reports Administration</h1>
                    </div>
                    <div className="col-6">
                        <ul>
                            <Link to="/"><li>Reports</li></Link>
                            <Link to="/create"><li>New Report</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;