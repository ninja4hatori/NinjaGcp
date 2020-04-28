import axios from "axios";
import { BACKEND_URL } from "../constants/ApiConstants";

class FileUploadApi {
  uploadFile(file) {
    var data = new FormData();
    data.append("file", file);

    var config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("Pecent uploaded" + percentCompleted);
      },
    };
    return axios.post(`${BACKEND_URL}/uploadFile`, data, config);
  }
}

export default new FileUploadApi();
