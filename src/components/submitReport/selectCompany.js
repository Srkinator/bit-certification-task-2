import React, { Component } from 'react';

import Search from '../common/search';
import { communicationService } from '../../services/communication';
import RedirectionService from '../../services/redirectionService';
import './selectCompany.css';

const candidateName = localStorage.getItem("candidateName");
let selectManyCompaniesBlocker = 0;

class SelectCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []
        }

        this.redirection = new RedirectionService();

    }


    loadCompanies = () => {
        communicationService.getData("companies", (data) => {
            this.setState({
                companies: data.data
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.loadCompanies();
    }

    renderCompanies = () => {
        return (
            this.state.companies.map((company) => {
                return (
                    <li onClick={(event) => this.selectCompany(company, event.currentTarget)} key={company.id} className="company-card">
                        {company.name}
                    </li>
                )
            })
        )
    }

    selectCompany = (info, event) => {
        let ifCompanySelected = document.getElementsByClassName("company-card");
        const makeButtonAvailable = document.getElementsByTagName("button")[0];

        for (var i = 0; i < ifCompanySelected.length; i++) {
            if (ifCompanySelected[i].hasAttribute("style")) {
                selectManyCompaniesBlocker = 1;
            }
        }

        if (selectManyCompaniesBlocker > 0) {
            console.log("if");

            selectManyCompaniesBlocker = 0;
            if (event.hasAttribute("style")) {
                makeButtonAvailable.removeAttribute("class");
                makeButtonAvailable.setAttribute("class", "btn btn-primary disabled");

            }
            else {
                makeButtonAvailable.removeAttribute("class");
                makeButtonAvailable.setAttribute("class", "btn btn-primary");
            }
            event.removeAttribute("style");
        }
        else {
            console.log("else");
            localStorage.setItem("companyID", info.id);
            localStorage.setItem("companyName", info.name);
            event.setAttribute("style", "background-color:orange");
            makeButtonAvailable.removeAttribute("class");
            makeButtonAvailable.setAttribute("class", "btn btn-primary");
            makeButtonAvailable.setAttribute("style", "x")
        }
    }

    redirectTo = () => {
        if (!document.getElementById("next").classList.contains("disabled")) {
            this.redirection.redirect("submitReport");
        }
        else {
            alert("Please Select Company before proceed");
        }
    }


    goBack = () => {
        this.redirection.redirect("selectCandidate");
    }

    render() {
        if (this.state.companies.length === 0) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className="row">
                    <div className="col-4 wizard-selector">
                        <ol>
                            <li>Select Candidate</li>
                            <li><b>Select Company</b></li>
                            <li>Fill Report Details</li>
                        </ol>
                        <hr></hr>
                        <h4>Candidate Name</h4>
                        <h2>{candidateName}</h2>
                    </div>
                    <div className="col-8">
                        <Search />
                        <h2>List Of Companies</h2>
                        <ul>
                            {this.renderCompanies()}
                        </ul>
                        <button onClick={this.redirectTo} type="button" id="next" className="btn btn-primary disabled">Next</button>
                        <button onClick={this.goBack} type="button" id="back" className="btn btn-info">Back</button>
                    </div>
                </div>
            );
        }
    }
}

export default SelectCompany;