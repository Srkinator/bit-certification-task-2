import React, { Component } from 'react';
import Modal from "react-modal";

import { communicationService } from '../../services/communication';
import './reportList.css';

const modalIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4cOH2hjbNUv5gu7qoMOxW9lZBF-cXE28wGS6KqVkIdI-mEnD";
const deleteIcon = "https://image.freepik.com/free-icon/letter-x_318-26692.jpg";

class ReportList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            showModal: false,
            info: []
        }

    }

    loadData = () => {
        communicationService.getData("reports", (data) => {
            this.setState({
                reports: data.data
            });
        }, (error) => {
            console.log(error);
        });
    }

    renderReports = () => {
        return (
            this.state.reports.map((report) => {
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
                            <img onClick={() => { this.setState({ showModal: true, info: report }) }} alt="viewIcon" src={modalIcon} />
                            <img alt="deleteIcon" src={deleteIcon} />
                        </td>
                    </tr>
                )
            })
        );
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
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
                            <h4 className="modal-title">{this.state.info.candidateName}</h4>
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
                                        <h4>{this.state.info.companyName}</h4>
                                    </div>
                                    <div className="modal-info">
                                        <h6>Interview date</h6>
                                        <h4>{new Date(this.state.info.interviewDate).toLocaleDateString()}</h4>
                                    </div>
                                    <div className="modal-info">
                                        <h6>Status</h6>
                                        <h4>{this.state.info.status}</h4>
                                    </div>
                                    <div className="modal-info">
                                        <h6>Phase</h6>
                                        <h4>{this.state.info.phase}</h4>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <h6>Notes</h6>
                                    {this.state.info.note}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ReportList;