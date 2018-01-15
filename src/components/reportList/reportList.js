/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/
import React, { Component } from 'react';
import Modal from "react-modal";

import { communicationService } from '../../services/communication';
import './reportList.css';
import Search from '../common/search';

const modalIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4cOH2hjbNUv5gu7qoMOxW9lZBF-cXE28wGS6KqVkIdI-mEnD";
const deleteIcon = "https://image.freepik.com/free-icon/letter-x_318-26692.jpg";

class ReportList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalInfo: [],
            filterCandidates: [],
            reports: []
        }

    }

    loadData = () => {
        communicationService.getData("reports", (data) => {
            this.setState({
                filterCandidates: data.data,
                reports: data.data
            });
        }, (error) => {
            console.log(error);
        });
    }

    renderReports = () => {
        return (
            this.state.filterCandidates.map((report) => {
                return (
                    <tr key={report.id}>
                        <td>
                            <h3>{report.companyName}</h3>
                        </td>
                        <td>
                            <h3>{report.candidateName}</h3>
                        </td>
                        <td>
                            <h3>{new Date(report.interviewDate).toLocaleDateString()}</h3>
                        </td>
                        <td>
                            <h3>{report.status}</h3>
                        </td>
                        <td>
                            <img onClick={() => this.openModal(report)} alt="viewIcon" src={modalIcon} />
                            <img onClick={() => this.deleteReport(report)} alt="deleteIcon" src={deleteIcon} />
                        </td>
                    </tr>
                )
            })
        );
    }

    openModal = (info) => {
        this.setState({
            showModal: true,
            modalInfo: info
        });
    }

    deleteReport = (reportInfo) => {
        console.log(reportInfo);
        let confirmDelete = confirm("Are you sure you want to delete this report?");

        if (confirmDelete == true){
            communicationService.deleteReport(reportInfo.id,(response)=>{
                console.log(response);
            }, (error)=>{
                console.log(error);
            });
            this.loadData();
        }
        else{
            this.loadData();
        }

    }

    componentDidMount() {
        this.loadData();
    }

    searchHandler = (searchTerm) => {
        let listOfCandidates = this.state.reports;
        if (searchTerm === "") {
            this.setState({
                filterCandidates: listOfCandidates
            });
        }
        else {
            let filteredList = listOfCandidates.filter(candidate => {
                return candidate.candidateName.toUpperCase().includes(searchTerm.toUpperCase());
            });
            this.setState({
                filterCandidates: filteredList
            });
        }
    }

    render() {
        return (
            <div>
                <Search searchHandler={this.searchHandler} />
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Company</th>
                                <th>Candidate</th>
                                <th>Interview Date</th>
                                <th>Status</th>
                                <th>View/Delete Report</th>
                            </tr>
                            {this.renderReports()}
                        </tbody>
                    </table>
                    <Modal
                        className="Modal__Bootstrap modal-dialog"
                        isOpen={this.state.showModal}
                        ariaHideApp={false}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6>Candidate</h6>
                                <h4 className="modal-title">{this.state.modalInfo.candidateName}</h4>
                                <button type="button" className="close" onClick={() => { this.setState({ showModal: false }) }}>
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="modal-body modalBox">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="modal-info">
                                            <h6>Company</h6>
                                            <h4>{this.state.modalInfo.companyName}</h4>
                                        </div>
                                        <div className="modal-info">
                                            <h6>Interview date</h6>
                                            <h4>{new Date(this.state.modalInfo.interviewDate).toLocaleDateString()}</h4>
                                        </div>
                                        <div className="modal-info">
                                            <h6>Status</h6>
                                            <h4>{this.state.modalInfo.status}</h4>
                                        </div>
                                        <div className="modal-info">
                                            <h6>Phase</h6>
                                            <h4>{this.state.modalInfo.phase}</h4>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <h6>Notes</h6>
                                        {this.state.modalInfo.note}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default ReportList;