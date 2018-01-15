
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { communicationService } from '../../services/communication';
import './selectCandidate.css';
import Search from '../common/search';

var candidatePlaceholder = "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";

class SelectCandidate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            candidates: []
        }
    }

    loadCandidates = () => {
        communicationService.getData("candidates", (data) => {
            this.setState({
                candidates: data.data
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
            this.state.candidates.map((candidate) => {
                return (
                    <div id={candidate.id} onClick={(event) => this.selectCandidate(candidate, event.currentTarget)} key={candidate.id} className="col-5 candidate-card">
                        {candidate.avatar ? <img src={candidate.avatar} /> : <img src={candidatePlaceholder} />}
                        <h3>{candidate.name}</h3>
                        <p>{candidate.email}</p>
                    </div>
                )
            })
        )
    }

    selectCandidate = (info, event) => {
        if (event.hasAttribute("style")) {
            event.removeAttribute("style")
        }
        else {
            event.setAttribute("style", "background-color:orange");
        }
        const makeButtonAvailable = document.getElementsByTagName("button")[0];
        makeButtonAvailable.removeAttribute("class");
        makeButtonAvailable.setAttribute("class", "btn btn-primary");
        
        localStorage.setItem("candidateID", info.id);
        
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
                        <Search />
                        {this.renderCandidates()}
                        <Link to='/selectCompany'>
                            <button type="button" className="btn btn-primary disabled">Next</button>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}

export default SelectCandidate;