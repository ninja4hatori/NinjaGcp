import axios from "axios";
import { BACKEND_URL } from "../constants/ApiConstants";

class FraudDetectionApi {
  searchTransactions(inputCardId, inputDateFrom, inputDateTo) {
    const apiBaseUrl = BACKEND_URL + "transactions?";
    let finalUrl = apiBaseUrl;
    if (inputCardId !== "") {
      finalUrl = finalUrl + "cardId=" + inputCardId;
    }
    if (inputDateFrom !== "" && inputDateTo !== "") {
      if (inputCardId !== "") {
        finalUrl = finalUrl + "&";
      }
      finalUrl =
        finalUrl +
        "transactionDateFrom=" +
        inputDateFrom +
        "&transactionDateTo=" +
        inputDateTo;
    }
    return axios.get(finalUrl);
  }

  searchFraudTransactions(apiEndpoint) {
    return axios.get(BACKEND_URL + apiEndpoint);
  }
}

export default new FraudDetectionApi();
