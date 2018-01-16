import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment'

import RedirectionService from '../../services/redirectionService';
import { communicationService } from '../../services/communication';
import './submitReport.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const candidateName = localStorage.getItem("candidateName");
const companyName = localStorage.getItem("companyName");

class SubmitReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportInfo: {},
            startDate: moment(),
            phase: "",
            status: "",
            notes: ""
        }

        this.redirection = new RedirectionService();
    }



    goBack = () => {
        this.redirection.redirect("selectCompany");
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        })
        this.enableButton();
    }

    handlePhaseChange = (phase) => {
        this.setState({
            phase: phase.target.value
        })
        this.enableButton();
    }

    handleStatusChange = (status) => {
        this.setState({
            status: status.target.value
        })
        this.enableButton();
    }

    handleNotesChange = (notes) => {
        this.setState({
            notes: notes.target.value
        })
        this.enableButton(notes.target.value);
    }

    enableButton = (notes) => {
        let date = this.state.startDate._d;
        let phase = this.state.phase;
        let status = this.state.status;
        const button = document.getElementById("next");
        if (date.length > 0) {

        }

        console.log(date.toString());
        if (date && phase && status && notes) {
            button.removeAttribute("class");
            button.setAttribute("class", "btn btn-primary")
        }
        if (!notes) {
            button.removeAttribute("class");
            button.setAttribute("class", "btn btn-primary disabled")
        }
    }

    redirectTo = () => {
        let interviewDate = this.state.startDate._d;
        let phase = this.state.phase;
        let status = this.state.status;
        let note = this.state.notes;
        let id = 1;
        const candidateName = localStorage.getItem("candidateName");
        const candidateId = localStorage.getItem("candidateID");
        const companyName = localStorage.getItem("companyName");
        const companyId = localStorage.getItem("companyID");

        let data ={
            candidateId:candidateId,
            candidateName:candidateName,
            companyId:companyId,
            companyName:companyName,
            interviewDate:interviewDate.toString(),
            phase:phase,
            status:status,
            note:note
        }

            console.log(data);
        if (!document.getElementById("next").classList.contains("disabled")) {
                communicationService.submitReport(data, (response)=>{
                    console.log(response);
                    id++;
                }, (error)=>{
                    console.log(error);
                })

            this.redirection.redirect("#");
        }
        else {
            alert("Please fill out all fields before submiting report");
        }
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
                    <div className="row reportInfo">
                        <div className="col-6">
                            <h4>Interview Date</h4>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                isClearable={true}
                                placeholderText="Date is cleared!"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={moment()}
                            />
                        </div>
                        <div className="col-3">
                            <h4>Phase</h4>
                            <select onChange={(e) => this.handlePhaseChange(e)} required>
                                <option>passed</option>
                                <option>declined</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <h4>Status</h4>
                            <select onChange={(e) => this.handleStatusChange(e)} required>
                                <option>cv</option>
                                <option>hr</option>
                                <option>tech</option>
                                <option>final</option>
                            </select>
                        </div>
                        <div className="col-12 notes">
                            <h4>Notes</h4>
                            <textarea onChange={(e) => this.handleNotesChange(e)} rows="10" cols="40" placeholder="Report notes..." required></textarea>
                        </div>
                        <div className="col-12">
                            <button onClick={this.redirectTo} type="button" id="next" className="btn btn-primary disabled">Next</button>
                            <button onClick={this.goBack} type="button" id="back" className="btn btn-info">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitReport;