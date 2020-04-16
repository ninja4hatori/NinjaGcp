import React, { Component } from "react";
import { DataTable } from "react-data-components";
import "react-data-components/css/table-twbs.css";
import { Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import SignificantTransactionDetailsModal from "../customerremarksmodal/SignificantTransactionDetailsModal";

class ViewTransactionsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWindowData: [],
      showModalWindow: false,
      inputCustomerRemarks: "",
    };
    this.closeTransactionDetailsModal = this.closeTransactionDetailsModal.bind(
      this
    );
    this.handleCustomerRemarkInput = this.handleCustomerRemarkInput.bind(this);
    this.handleCustomerRemarkSubmit = this.handleCustomerRemarkSubmit.bind(
      this
    );
  }

  handleCustomerRemarkSubmit() {
    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    var requestBody =
      '{"id":' +
      this.state.modalWindowData[0].innerText +
      ',"card_id":' +
      this.state.modalWindowData[1].innerText +
      ',"transaction_id":' +
      this.state.modalWindowData[2].innerText +
      ',"occurance":' +
      this.state.modalWindowData[3].innerText +
      ',"fraud_type": "' +
      this.state.modalWindowData[4].innerText +
      '","transaction_date": "' +
      this.state.modalWindowData[5].innerText +
      '","fraud_threshold":' +
      this.state.modalWindowData[6].innerText +
      ',"remark": "' +
      this.state.inputCustomerRemarks +
      '"}';
    console.log(requestBody);

    var theUrl = "http://localhost:9090/update-remarks";

    xmlhttp.open("POST", theUrl);

    xmlhttp.onload = () => {
      if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
        console.log("response", xmlhttp.responseText);
        this.setState({ showModalWindow: false });
      }
    };

    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(requestBody);
  }

  handleCustomerRemarkInput(event) {
    console.log("handleRemark", event.target.value);
    this.setState({ inputCustomerRemarks: event.target.value });
  }

  closeTransactionDetailsModal() {
    this.setState({ showModalWindow: false, modalWindowData: [] });
    this.props.refreshApiData();
  }
  componentDidMount() {
    if (document.getElementById("freqTable") !== null) {
      var para = document.createElement("p");
      var node = document.createTextNode("Based on CC usage Fequency");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("freqTable")
        .getElementsByTagName("caption")[0].style.display = "none";
      document
        .getElementById("freqTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);
    }

    if (document.getElementById("locationTable") !== null) {
      var para = document.createElement("p");
      var node = document.createTextNode("Based on CC usage Location");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("locationTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("locationTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);
    }

    if (document.getElementById("overdraftTable") !== null) {
      var para = document.createElement("p");
      var node = document.createTextNode("Based on CC OverDraft");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("overdraftTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("overdraftTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);
    }

    if (document.getElementById("balanceTable") !== null) {
      var para = document.createElement("p");
      var node = document.createTextNode("Based on CC Book Balance");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("balanceTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("balanceTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);
    }

    if (document.getElementById("dailySpendingTable") !== null) {
      var para = document.createElement("p");
      var node = document.createTextNode("Based on CC Average Daily Spending");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("dailySpendingTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("dailySpendingTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);
    }

    if (document.getElementById("significantFraudsTable") !== null) {
      MutationObserver =
        window.MutationObserver || window.WebKitMutationObserver;

      var observer = new MutationObserver(function (mutations, observer) {
        // fired when a mutation occurs
        var table1 = document
          .getElementById("significantFraudsTable")
          .getElementsByTagName("table")[0];

        var tableRows1 = table.getElementsByTagName("tr");

        for (var i = 0; i < tableRows1.length; i++) {
          var tableRowData1 = tableRows1[i].getElementsByTagName("td");
          if (tableRowData1[4] !== undefined && tableRowData1[4].innerText) {
            switch (tableRowData1[4].innerText) {
              case "CRITICAL":
                tableRowData1[4].classList.add("critical");
                break;
              case "ORDINARY":
                tableRowData1[4].classList.add("ordinary");
                break;
              case "MONITOR":
                tableRowData1[4].classList.add("monitor");
                break;
            }
          }

          tableRows1[i].addEventListener("click", (event) => {
            var details = event.target.parentNode.getElementsByTagName("td");
            var oldCustomerRemark = "";
            if (details[7] && details[7].innerText) {
              oldCustomerRemark = details[7].innerText;
            }
            console.log("eventlistner", oldCustomerRemark);
            this.setState({
              modalWindowData: event.target.parentNode.getElementsByTagName(
                "td"
              ),
              showModalWindow: true,
              inputCustomerRemarks: oldCustomerRemark,
            });
          });
        }
        // ...
      });

      // define what element should be observed by the observer
      // and what types of mutations trigger the callback
      observer.observe(
        document
          .getElementById("significantFraudsTable")
          .getElementsByTagName("table")[0],
        {
          subtree: true,
          childList: true,
        }
      );

      var para = document.createElement("p");
      var node = document.createTextNode("Significant fraud transactions");
      para.appendChild(node);
      para.classList.add("tableCaption");

      document
        .getElementById("significantFraudsTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("significantFraudsTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para);

      var table = document
        .getElementById("significantFraudsTable")
        .getElementsByTagName("table")[0];
      var tableRows = table.getElementsByTagName("tr");

      for (var i = 0; i < tableRows.length; i++) {
        var tableRowData = tableRows[i].getElementsByTagName("td");
        if (tableRowData[4] !== undefined && tableRowData[4].innerText) {
          switch (tableRowData[4].innerText) {
            case "CRITICAL":
              tableRowData[4].classList.add("critical");
              break;
            case "ORDINARY":
              tableRowData[4].classList.add("ordinary");
              break;
            case "MONITOR":
              tableRowData[4].classList.add("monitor");
              break;
          }
        }

        tableRows[i].addEventListener("click", (event) => {
          var details = event.target.parentNode.getElementsByTagName("td");
          var oldCustomerRemark = "";
          if (details[7] && details[7].innerText) {
            oldCustomerRemark = details[7].innerText;
          }
          console.log("eventlistner", oldCustomerRemark);
          this.setState({
            modalWindowData: event.target.parentNode.getElementsByTagName("td"),
            showModalWindow: true,
            inputCustomerRemarks: oldCustomerRemark,
          });
        });
      }
    }
  }
  render() {
    let columns = [
      { title: "Id", prop: "id" },
      { title: "Transaction Id", prop: "transaction_id" },
      { title: "Card Id", prop: "card_id" },
      { title: "Transaction date", prop: "transaction_date" },
      { title: "Fraud threshold", prop: "fraud_threshold" },
    ];

    let significant_frauds_columns = [
      { title: "Id", prop: "id" },
      { title: "Card Id", prop: "card_id" },
      { title: "Transaction Id", prop: "transaction_id" },
      { title: "Occurrence", prop: "occurance" },
      { title: "Fraud priority", prop: "fraud_type" },
      { title: "Transaction date", prop: "transaction_date" },
      { title: "Fraud threshold", prop: "fraud_threshold" },
      { title: "Customer remarks", prop: "remark" },
    ];

    const significantFraudsTableResponse =
      this.props.resultData.significantFrauds !== undefined &&
      this.props.resultData.significantFrauds.length > 0 ? (
        <div>
          <FormGroup row>
            <Col sm={12}>
              <div id="significantFraudsTable">
                <DataTable
                  keys="id"
                  columns={significant_frauds_columns}
                  initialData={this.props.resultData.significantFrauds}
                  initialPageLength={5}
                  initialSortBy={{ prop: "fraud_type", order: "ascending" }}
                />
              </div>
            </Col>
          </FormGroup>
          <SignificantTransactionDetailsModal
            closeModal={this.closeTransactionDetailsModal}
            showModal={this.state.showModalWindow}
            customerRemarks={this.state.inputCustomerRemarks}
            transactionDetails={this.state.modalWindowData}
            handleCustomerRemarkInput={this.handleCustomerRemarkInput}
            handleSubmit={this.handleCustomerRemarkSubmit}
          />
        </div>
      ) : (
        <div></div>
      );

    const freqTableResponse =
      this.props.resultData.freqArr !== undefined &&
      this.props.resultData.freqArr.length > 0 ? (
        <FormGroup row>
          <Col sm={12}>
            <div id="freqTable">
              <DataTable
                keys="id"
                columns={columns}
                initialData={this.props.resultData.freqArr}
                initialPageLength={5}
                initialSortBy={{ prop: "card_id", order: "ascending" }}
              />
            </div>
          </Col>
        </FormGroup>
      ) : (
        <div></div>
      );

    const locationTableResponse =
      this.props.resultData.locationArr !== undefined &&
      this.props.resultData.locationArr.length > 0 ? (
        <FormGroup row>
          <Col sm={12}>
            <div id="locationTable">
              <DataTable
                keys="id"
                columns={columns}
                initialData={this.props.resultData.locationArr}
                initialPageLength={5}
                initialSortBy={{ prop: "card_id", order: "ascending" }}
              />
            </div>
          </Col>
        </FormGroup>
      ) : (
        <div></div>
      );

    const overdraftTableResponse =
      this.props.resultData.overDraftArr !== undefined &&
      this.props.resultData.overDraftArr.length > 0 ? (
        <FormGroup row>
          <Col sm={12}>
            <div id="overdraftTable">
              <DataTable
                keys="id"
                columns={columns}
                initialData={this.props.resultData.overDraftArr}
                initialPageLength={5}
                initialSortBy={{ prop: "card_id", order: "ascending" }}
              />
            </div>
          </Col>
        </FormGroup>
      ) : (
        <div></div>
      );

    const balanceTableResponse =
      this.props.resultData.balance !== undefined &&
      this.props.resultData.balance.length > 0 ? (
        <FormGroup row>
          <Col sm={12}>
            <div id="balanceTable">
              <DataTable
                keys="id"
                columns={columns}
                initialData={this.props.resultData.balance}
                initialPageLength={5}
                initialSortBy={{ prop: "card_id", order: "ascending" }}
              />
            </div>
          </Col>
        </FormGroup>
      ) : (
        <div></div>
      );

    const dailySpendingTableResponse =
      this.props.resultData.dailySpending !== undefined &&
      this.props.resultData.dailySpending.length > 0 ? (
        <FormGroup row>
          <Col sm={12}>
            <div id="dailySpendingTable">
              <DataTable
                keys="id"
                columns={columns}
                initialData={this.props.resultData.dailySpending}
                initialPageLength={5}
                initialSortBy={{ prop: "card_id", order: "ascending" }}
              />
            </div>
          </Col>
        </FormGroup>
      ) : (
        <div></div>
      );

    console.log(this.props.resultData);
    console.log(this.props.resultData.significantFrauds);
    return (
      <div>
        {significantFraudsTableResponse}
        {freqTableResponse}
        {locationTableResponse}
        {overdraftTableResponse}
        {balanceTableResponse}
        {dailySpendingTableResponse}
      </div>
    );
  }
}

export default ViewTransactionsResult;
