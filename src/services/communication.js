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
}
export const communicationService = new CommunicationService();