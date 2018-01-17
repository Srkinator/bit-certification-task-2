
import React, { Component } from 'react';

import { communicationService } from '../../services/communication';
import './selectCandidate.css';
import Search from '../common/search';
import RedirectionService from '../../services/redirectionService';

let selectManyCandidatesBlocker = 0;
const candidatePlaceholder = "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";

class SelectCandidate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            candidates: [],
            filterCandidates: []
        }

        this.redirection = new RedirectionService();
    }

    loadCandidates = () => {
        communicationService.getData("candidates", (data) => {
            this.setState({
                candidates: data.data,
                filterCandidates: data.data
            })
        }, (error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.loadCandidates();
    }

    renderCandidates = () => {
        return (
            this.state.filterCandidates.map((candidate) => {
                return (
                    <div id={candidate.id} onClick={(event) => this.selectCandidate(candidate, event.currentTarget)} key={candidate.id} className="col-5 candidate-card">
                        {candidate.avatar ? <img alt="candidate Avatar" src={candidate.avatar} /> : <img alt="candidate Avatar" src={candidatePlaceholder} />}
                        <h3>{candidate.name}</h3>
                        <p>{candidate.email}</p>
                    </div>
                )
            })
        )
    }

    selectCandidate = (info, event) => {
        let ifCandidateSelected = document.getElementsByClassName("candidate-card");
        const makeButtonAvailable = document.getElementsByTagName("button")[0];

        for (var i = 0; i < ifCandidateSelected.length; i++) {
            if (ifCandidateSelected[i].hasAttribute("style")) {
                selectManyCandidatesBlocker = 1;
            }
        }

        if (selectManyCandidatesBlocker > 0) {

            selectManyCandidatesBlocker = 0;
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
            localStorage.setItem("candidateID", info.id);
            localStorage.setItem("candidateName", info.name);
            event.setAttribute("style", "background-color:orange");
            makeButtonAvailable.removeAttribute("class");
            makeButtonAvailable.setAttribute("class", "btn btn-primary");
            makeButtonAvailable.setAttribute("style", "x")
        }
    }

    redirectTo = () => {
        if (!document.getElementById("btn").classList.contains("disabled")) {
            this.redirection.redirect("selectCompany");
        }
        else {
            alert("Please Select Candidate before proceed");
        }
    }

    searchHandler = (searchTerm) => {
        let listOfCandidates = this.state.candidates;
        if (searchTerm === "") {
            this.setState({
                filterCandidates: listOfCandidates
            });
        }
        else {
            let filteredList = listOfCandidates.filter(candidate => {
                return candidate.name.toUpperCase().includes(searchTerm.toUpperCase());
            });
            this.setState({
                filterCandidates: filteredList
            });
        }
    }

    goBack = () => {
        this.redirection.redirect("#");
    }

    render() {
        if (this.state.candidates.length === 0) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className="row">
                    <div className="col-4 wizard-selector">
                        <ol>
                            <li><b>Select Candidate</b></li>
                            <li>Select Company</li>
                            <li>Fill Report Details</li>
                        </ol>
                    </div>
                    <div className="col-8">
                        <Search searchHandler={this.searchHandler}/>
                        <h2>List Of Candidates</h2>
                        {this.renderCandidates()}
                        <button onClick={this.redirectTo} type="button" id="btn" className="btn btn-primary disabled">Next</button>
                        <button onClick={this.goBack} type="button" id="back" className="btn btn-info">Back</button>
                    </div>
                </div>
            );
        }
    }
}

export default SelectCandidate;