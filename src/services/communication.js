import axios from "axios";

const URL = "http://localhost:3333/api";

class CommunicationService {

    getData(subject, dataHandler, errorHandler) {
        axios({
            method: "GET",
            url: `${URL}/${subject}`,
        })
            .then((data) => {
                 dataHandler(data)
                })
            .catch((error) => {
                errorHandler(error);
            });
    }

    deleteReport(id, dataHandler, errorHandler) {
        axios({
            method: "DELETE",
            url: `${URL}/reports/${id}`,
        })
            .then((data) => {
                 dataHandler(data)
                })
            .catch((error) => {
                errorHandler(error);
            });
    }

    submitReport(data, dataHandler, errorHandler) {
        axios({
            method: "POST",
            url: `${URL}/reports`,
            data: data
        })
            .then((data) => {
                 dataHandler(data)
                })
            .catch((error) => {
                errorHandler(error);
            });
    }

}
export const communicationService = new CommunicationService();