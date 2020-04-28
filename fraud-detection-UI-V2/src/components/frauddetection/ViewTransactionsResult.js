import React, { Component } from "react";
import { DataTable } from "react-data-components";
import "react-data-components/css/table-twbs.css";
import { Col, FormGroup } from "reactstrap";
import SignificantTransactionDetailsModal from "../customerremarksmodal/SignificantTransactionDetailsModal";
import ExportTableModal from "./ExportTableModal";
class ViewTransactionsResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWindowData: [],
      showModalWindow: false,
      inputCustomerRemarks: "",
      showExportTableModal: false,
      tableId: "",
    };
    this.closeTransactionDetailsModal = this.closeTransactionDetailsModal.bind(
      this
    );
    this.handleCustomerRemarkInput = this.handleCustomerRemarkInput.bind(this);
    this.handleCustomerRemarkSubmit = this.handleCustomerRemarkSubmit.bind(
      this
    );
    this.handleHiddenFieldChange = this.handleHiddenFieldChange.bind(this);
    this.handleExportButtonClick = this.handleExportButtonClick.bind(this);
    this.handleExportModalClose = this.handleExportModalClose.bind(this);
  }

  handleHiddenFieldChange(event) {
    this.setState({
      modalWindowData: document
        .getElementById("modalWindowData")
        .innerText.split(","),
      showModalWindow: true,
      inputCustomerRemarks: document.getElementById("inputCustomerRemarks")
        .innerText,
    });
  }

  handleExportButtonClick(event) {
    this.setState({ showExportTableModal: true, tableId: event.target.id });
  }

  handleExportModalClose() {
    this.setState({ showExportTableModal: false });
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

    var theUrl = "https://intense-pier-262517.uc.r.appspot.com/update-remarks";

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
      var exportButton1 = document.createElement("button");
      exportButton1.id = "freqTableExport";
      exportButton1.innerHTML = "Export as...";
      exportButton1.classList.add("secondary-theme-button-with-float");
      exportButton1.addEventListener("click", this.handleExportButtonClick);

      var para1 = document.createElement("p");
      var node1 = document.createTextNode("Based on CC usage Fequency");
      para1.appendChild(node1);
      para1.appendChild(exportButton1);
      para1.classList.add("tableCaption");

      document
        .getElementById("freqTable")
        .getElementsByTagName("caption")[0].style.display = "none";
      document
        .getElementById("freqTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para1);
    }

    if (document.getElementById("locationTable") !== null) {
      var exportButton2 = document.createElement("button");
      exportButton2.id = "locationTableExport";
      exportButton2.innerHTML = "Export as...";
      exportButton2.classList.add("secondary-theme-button-with-float");
      exportButton2.addEventListener("click", this.handleExportButtonClick);

      var para2 = document.createElement("p");
      var node2 = document.createTextNode("Based on CC usage Location");
      para2.appendChild(node2);
      para2.appendChild(exportButton2);
      para2.classList.add("tableCaption");

      document
        .getElementById("locationTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("locationTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para2);
    }

    if (document.getElementById("overdraftTable") !== null) {
      var exportButton3 = document.createElement("button");
      exportButton3.id = "overdraftTableExport";
      exportButton3.innerHTML = "Export as...";
      exportButton3.classList.add("secondary-theme-button-with-float");
      exportButton3.addEventListener("click", this.handleExportButtonClick);

      var para3 = document.createElement("p");
      var node3 = document.createTextNode("Based on CC OverDraft");
      para3.appendChild(node3);
      para3.appendChild(exportButton3);
      para3.classList.add("tableCaption");

      document
        .getElementById("overdraftTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("overdraftTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para3);
    }

    if (document.getElementById("balanceTable") !== null) {
      var exportButton4 = document.createElement("button");
      exportButton4.id = "balanceTableExport";
      exportButton4.innerHTML = "Export as...";
      exportButton4.classList.add("secondary-theme-button-with-float");
      exportButton4.addEventListener("click", this.handleExportButtonClick);

      var para4 = document.createElement("p");
      var node4 = document.createTextNode("Based on CC Book Balance");
      para4.appendChild(node4);
      para4.appendChild(exportButton4);
      para4.classList.add("tableCaption");

      document
        .getElementById("balanceTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("balanceTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para4);
    }

    if (document.getElementById("dailySpendingTable") !== null) {
      var exportButton5 = document.createElement("button");
      exportButton5.id = "dailySpendingTableExport";
      exportButton5.innerHTML = "Export as...";
      exportButton5.classList.add("secondary-theme-button-with-float");
      exportButton5.addEventListener("click", this.handleExportButtonClick);

      var para5 = document.createElement("p");
      var node5 = document.createTextNode("Based on CC Average Daily Spending");
      para5.appendChild(node5);
      para5.appendChild(exportButton5);
      para5.classList.add("tableCaption");

      document
        .getElementById("dailySpendingTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("dailySpendingTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para5);
    }

    if (document.getElementById("significantFraudsTable") !== null) {
      var exportButton6 = document.createElement("button");
      exportButton6.id = "significantFraudsTableExport";
      exportButton6.innerHTML = "Export as...";
      exportButton6.classList.add("secondary-theme-button-with-float");
      exportButton6.addEventListener("click", this.handleExportButtonClick);

      var para6 = document.createElement("p");
      var node6 = document.createTextNode("Significant fraud transactions");
      para6.appendChild(node6);
      para6.appendChild(exportButton6);
      para6.classList.add("tableCaption");

      document
        .getElementById("significantFraudsTable")
        .getElementsByTagName("caption")[0].style.display = "none";

      document
        .getElementById("significantFraudsTable")
        .getElementsByTagName("table")[0]
        .insertAdjacentElement("beforebegin", para6);

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
            default:
              console.log("Invalid case " + tableRowData[4].innerText);
              break;
          }
        }

        tableRows[i].addEventListener("click", (event) => {
          var details = event.target.parentNode.getElementsByTagName("td");
          if (details !== undefined && details[0] !== undefined) {
            var oldCustomerRemark = "";
            var detailsCsv =
              details[0].innerText +
              "," +
              details[1].innerText +
              "," +
              details[2].innerText +
              "," +
              details[3].innerText +
              "," +
              details[4].innerText +
              "," +
              details[5].innerText +
              "," +
              details[6].innerText +
              "," +
              details[7].innerText;
            if (details[7] && details[7].innerText) {
              oldCustomerRemark = details[7].innerText;
            }
            document.getElementById("modalWindowData").innerText = detailsCsv;
            document.getElementById(
              "inputCustomerRemarks"
            ).innerText = oldCustomerRemark;
            document.getElementById("showModalWindow").click();
          }
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
      { title: "Remarks", prop: "remark" },
    ];

    const significantFraudsTableResponse =
      this.props.resultData.significantFrauds !== undefined &&
      this.props.resultData.significantFrauds.length > 0 ? (
        <div hidden={!(this.props.tableToShow === "1")}>
          <FormGroup row>
            <Col sm={12}>
              <div id="significantFraudsTable">
                <DataTable
                  keys="id"
                  columns={significant_frauds_columns}
                  initialData={this.props.resultData.significantFrauds}
                  initialPageLength={20}
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
        <FormGroup row hidden={!(this.props.tableToShow === "2")}>
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
        <FormGroup row hidden={!(this.props.tableToShow === "3")}>
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
        <FormGroup row hidden={!(this.props.tableToShow === "4")}>
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
        <FormGroup row hidden={!(this.props.tableToShow === "5")}>
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
        <FormGroup row hidden={!(this.props.tableToShow === "6")}>
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

    return (
      <div>
        {significantFraudsTableResponse}
        {freqTableResponse}
        {locationTableResponse}
        {overdraftTableResponse}
        {balanceTableResponse}
        {dailySpendingTableResponse}
        <ExportTableModal
          showModal={this.state.showExportTableModal}
          closeModal={this.handleExportModalClose}
          tableId={this.state.tableId}
        />
        <div id="modalWindowData" hidden={true}></div>
        <button
          hidden={true}
          id="showModalWindow"
          onClick={this.handleHiddenFieldChange}
        >
          Click me
        </button>
        <div id="inputCustomerRemarks" hidden={true}></div>
      </div>
    );
  }
}

export default ViewTransactionsResult;
