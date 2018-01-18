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
            companies: [],
            filterCompanies: [],
            showError: false,
            showServerError: false
        }

        this.redirection = new RedirectionService();

    }


    loadCompanies = () => {
        communicationService.getData("companies", (data) => {
            this.setState({
                companies: data.data,
                filterCompanies: data.data
            })
        }, (error) => {
            this.setState({
                showServerError:true
            })
        })
    }

    componentDidMount() {
        this.loadCompanies();
    }

    renderCompanies = () => {
        return (
            this.state.filterCompanies.map((company) => {
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
            localStorage.setItem("companyID", info.id);
            localStorage.setItem("companyName", info.name);
            event.setAttribute("style", "border:#b4cac9 solid 20px; background-color:#b4cac9 ");
            makeButtonAvailable.removeAttribute("class");
            makeButtonAvailable.setAttribute("class", "btn btn-primary");
            makeButtonAvailable.setAttribute("style", "x")

            this.setState({
                showError: false
            });
        }
    }

    redirectTo = () => {
        if (!document.getElementById("next").classList.contains("disabled")) {
            this.redirection.redirect("submitReport");
        }
        else {
            this.setState({
                showError: true
            })
        }
    }


    goBack = () => {
        this.redirection.redirect("selectCandidate");
    }

    searchHandler = (searchTerm) => {
        let listOfCompanies = this.state.companies;
        if (searchTerm === "") {
            this.setState({
                filterCompanies: listOfCompanies
            });
        }
        else {
            let filteredList = listOfCompanies.filter(company => {
                return company.name.toUpperCase().includes(searchTerm.toUpperCase());
            });
            this.setState({
                filterCompanies: filteredList
            });
        }
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
                        <h2>List Of Companies</h2>
                        <Search searchHandler={this.searchHandler} />
                        <ul>
                            {this.renderCompanies()}
                        </ul>
                        <button onClick={this.redirectTo} type="button" id="next" className="btn btn-primary disabled">Next</button>
                        <button onClick={this.goBack} type="button" id="back" className="btn btn-info">Back</button>
                        {this.state.showError ? <h4 style={{color:"red"}}>Please select company before proceed!</h4> : ""}
                        {this.state.showServerError ? <h4 style={{color:"red"}}>Server problem, we'll be looking into it as soon as possible!</h4> : ""}
                    </div>
                </div>
            );
        }
    }
}

export default SelectCompany;