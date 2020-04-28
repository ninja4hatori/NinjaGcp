import React, { Component } from "react";
import "./ViewTransactions.css";
import RingLoader from "react-spinners/RingLoader";
import { Col, Input, FormGroup, Form, Label, NavLink } from "reactstrap";
import ViewTransactionsResult from "./ViewTransactionsResult";
import PieChartWithCustomization from "../views/Pie Chart with Customization";
import FraudDetectionApi from "../../api/apiHandler/FraudDetectionApi";
import Workbook from "react-excel-workbook";

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      transactionPeriodRadio: "td",
      tdDateFrom: "",
      tdDateTo: "",
      tpDuration: "",
      displayFormat: "",
      displayType: "table",
      isResultReady: false,
      isPdfReady: false,
      count: 0,
      tableToShow: "1",
    };
    this.handleGetTransactions = this.handleGetTransactions.bind(this);
    this.handleTransactionPeriodChange = this.handleTransactionPeriodChange.bind(
      this
    );
    this.handleTdDateFromChange = this.handleTdDateFromChange.bind(this);
    this.handleTdDateToChange = this.handleTdDateToChange.bind(this);
    this.handleTpDurationChange = this.handleTpDurationChange.bind(this);
    this.handleDisplayFormatDropdownChange = this.handleDisplayFormatDropdownChange.bind(
      this
    );
    this.resetState = this.resetState.bind(this);
    this.handleSearchAgain = this.handleSearchAgain.bind(this);
    this.handleDisplayTypeChange = this.handleDisplayTypeChange.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.handleTableToShowDropdownChange = this.handleTableToShowDropdownChange.bind(
      this
    );
  }

  handleTableToShowDropdownChange(event) {
    this.setState({ tableToShow: event.target.value });
  }

  handleDisplayTypeChange(event) {
    this.setState({ displayType: event.target.id });
  }

  handleFormReset(event) {
    event.preventDefault();
    this.resetState();
  }

  resetState() {
    this.setState({
      isLoading: false,
      transactionPeriodRadio: "td",
      viewTransactionsResultData: [],
      tdDateFrom: "",
      tdDateTo: "",
      tpDuration: "",
      displayFormat: "onScreen",
      displayType: "table",
      isResultReady: false,
      isPDFReady: false,
      tableToShow: "1",
    });
  }

  handleDisplayFormatDropdownChange(event) {
    this.setState({ displayFormat: event.target.value });
  }

  handleGetTransactions() {
    this.setState({ isLoading: true });
    const apiBaseUrl = "fraud-transactions?";
    let finalUrl = apiBaseUrl;
    if (
      this.state.transactionPeriodRadio === "tp" &&
      this.state.tpDuration !== ""
    ) {
      finalUrl = finalUrl + "fraudDuration=" + this.state.tpDuration;
    }
    if (
      this.state.transactionPeriodRadio === "td" &&
      this.state.tdDateFrom !== "" &&
      this.state.tdDateTo !== ""
    ) {
      finalUrl =
        finalUrl +
        "fraudDateFrom=" +
        this.state.tdDateFrom +
        "&fraudDateTo=" +
        this.state.tdDateTo;
    }
    FraudDetectionApi.searchFraudTransactions(finalUrl)
      .then((response) => {
        var data = response.data;
        let freqArr = [],
          locationArr = [],
          overDraftArr = [],
          balance = [],
          dailySpending = [];
        let finalObj = {};
        data.frauds.fraud_transactions.forEach((transactionObj) => {
          switch (transactionObj.fraud_critera) {
            case "FREQ":
              freqArr.push(transactionObj);
              break;
            case "LOCATION":
              locationArr.push(transactionObj);
              break;
            case "OVER_DRAFT":
              overDraftArr.push(transactionObj);
              break;
            case "BALANCE":
              balance.push(transactionObj);
              break;
            case "DAILY_SPENDING":
              dailySpending.push(transactionObj);
              break;
            default:
              console.log(
                "Invalid fraud criteria : " + transactionObj.fraud_criteria
              );
          }
        });
        finalObj["freqArr"] = freqArr;
        finalObj["locationArr"] = locationArr;
        finalObj["overDraftArr"] = overDraftArr;
        finalObj["balance"] = balance;
        finalObj["dailySpending"] = dailySpending;
        finalObj["significantFrauds"] = data.frauds.significant_transactions;

        this.state.displayFormat === "onScreen"
          ? this.setState({
              viewTransactionsResultData: finalObj,
              isResultReady: true,
              isLoading: false,
            })
          : this.setState({
              viewTransactionsResultData: finalObj,
              isPDFReady: true,
              count: 0,
              isLoading: false,
            });
      })
      .catch(console.log);
  }

  handleSearchAgain(event) {
    this.setState({ isResultReady: false });
  }

  handleTransactionPeriodChange(event) {
    this.setState({
      transactionPeriodRadio: event.target.id,
      tdDateFrom: "",
      tdDateTo: "",
      tpDuration: "",
    });
  }

  handleTdDateFromChange(event) {
    this.setState({ tdDateFrom: event.target.value });
  }

  handleTdDateToChange(event) {
    this.setState({ tdDateTo: event.target.value });
  }
  handleTpDurationChange(event) {
    this.setState({ tpDuration: event.target.value });
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    setTimeout(() => {
      if (this.state.isPDFReady && this.state.count < 1) {
        document.getElementById("clickToDownloadPdf").click();
        this.setState({ count: 1 });
      }
    }, 1000);

    const showTableChangeDropdown =
      this.state.viewTransactionsResultData !== undefined &&
      this.state.viewTransactionsResultData.significantFrauds !== undefined &&
      (this.state.viewTransactionsResultData.significantFrauds.length > 0 ||
        this.state.viewTransactionsResultData.freqArr.length > 0 ||
        this.state.viewTransactionsResultData.locationArr.length > 0 ||
        this.state.viewTransactionsResultData.overDraftArr.length > 0 ||
        this.state.viewTransactionsResultData.balance.length > 0 ||
        this.state.viewTransactionsResultData.dailySpending.length > 0);

    const webResponse = this.state.isLoading ? (
      <RingLoader
        css={{ marginTop: 25 + "vh", marginLeft: 45 + "vw" }}
        size={5 + "vw"}
        /*color={"#006A4B"}*/
        loading={this.state.isLoading}
      />
    ) : this.state.isResultReady ? (
      <div
        style={{
          marginLeft: 4 + "%",
          marginTop: 4 + "%",
          marginBottom: 31 + "px",
          marginRight: 4 + "%",
        }}
      >
        <div className="searchCriteria">
          <FormGroup row>
            <Col sm={8}>
              <Label style={{ padding: 0 }} sm={2}>
                Search criteria :{" "}
              </Label>

              {this.state.tpDuration && (
                <div>
                  {this.state.displayType === "table" &&
                  showTableChangeDropdown ? (
                    <Label style={{ padding: 0 }} sm={5}>
                      Transaction period : {this.state.tpDuration} month(s)
                      {" & "}
                      &nbsp;
                    </Label>
                  ) : (
                    <Label style={{ padding: 0 }} sm={5}>
                      Transaction period : {this.state.tpDuration} month(s)
                    </Label>
                  )}
                  {this.state.displayType === "table" &&
                    showTableChangeDropdown && (
                      <Label style={{ padding: 0 }} sm={5}>
                        <Input
                          type="select"
                          value={this.state.tableToShow}
                          onChange={this.handleTableToShowDropdownChange}
                          style={{ width: "auto" }}
                          className="tableDropdown"
                        >
                          {this.state.viewTransactionsResultData
                            .significantFrauds.length > 0 && (
                            <option className="optionCss" value="1">
                              Significant fraud transactions
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.freqArr
                            .length > 0 && (
                            <option className="optionCss" value="2">
                              Based on CC usage Fequency
                            </option>
                          )}

                          {this.state.viewTransactionsResultData.locationArr
                            .length > 0 && (
                            <option className="optionCss" value="3">
                              Based on CC usage Location
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.overDraftArr
                            .length > 0 && (
                            <option className="optionCss" value="4">
                              Based on CC OverDraft
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.balance
                            .length > 0 && (
                            <option className="optionCss" value="5">
                              Based on CC Book Balance
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.dailySpending
                            .length > 0 && (
                            <option className="optionCss" value="6">
                              Based on CC Avg Daily Spending
                            </option>
                          )}
                        </Input>
                      </Label>
                    )}
                </div>
              )}
              {this.state.tdDateFrom && (
                <div>
                  {this.state.displayType === "table" &&
                  showTableChangeDropdown ? (
                    <Label style={{ padding: 0 }} sm={6}>
                      Fraud transaction date range :{this.state.tdDateFrom} -{" "}
                      {this.state.tdDateTo}
                      {" & "}
                      &nbsp;
                    </Label>
                  ) : (
                    <Label style={{ padding: 0 }} sm={6}>
                      Fraud transaction date range :{this.state.tdDateFrom} -{" "}
                      {this.state.tdDateTo}
                    </Label>
                  )}
                  {this.state.displayType === "table" &&
                    showTableChangeDropdown && (
                      <Label style={{ padding: 0 }} sm={4}>
                        <Input
                          type="select"
                          value={this.state.tableToShow}
                          onChange={this.handleTableToShowDropdownChange}
                          style={{ width: "auto" }}
                          className="tableDropdown"
                        >
                          {this.state.viewTransactionsResultData
                            .significantFrauds.length > 0 && (
                            <option className="optionCss" value="1">
                              Significant fraud transactions
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.freqArr
                            .length > 0 && (
                            <option className="optionCss" value="2">
                              Based on CC usage Fequency
                            </option>
                          )}

                          {this.state.viewTransactionsResultData.locationArr
                            .length > 0 && (
                            <option className="optionCss" value="3">
                              Based on CC usage Location
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.overDraftArr
                            .length > 0 && (
                            <option className="optionCss" value="4">
                              Based on CC OverDraft
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.balance
                            .length > 0 && (
                            <option className="optionCss" value="5">
                              Based on CC Book Balance
                            </option>
                          )}
                          {this.state.viewTransactionsResultData.dailySpending
                            .length > 0 && (
                            <option className="optionCss" value="6">
                              Based on CC Avg Daily Spending
                            </option>
                          )}
                        </Input>
                      </Label>
                    )}
                </div>
              )}
            </Col>

            <Col sm={2}>
              <FormGroup check onClick={this.handleDisplayTypeChange}>
                <Label style={{ padding: 0 }} sm={6} for="table" check>
                  <Input
                    type="radio"
                    name="radio1"
                    id="table"
                    style={{ marginLeft: -15 + "px" }}
                    defaultChecked={this.state.displayType === "table"}
                  />
                  Table
                </Label>
                <Label style={{ padding: 0 }} sm={6} check>
                  <Input
                    type="radio"
                    name="radio1"
                    id="pieChart"
                    style={{ marginLeft: -15 + "px" }}
                    defaultChecked={this.state.displayType === "pieChart"}
                  />
                  Pie chart
                </Label>
              </FormGroup>
            </Col>

            <Col sm={2}>
              <NavLink
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.handleSearchAgain(event);
                }}
              >
                Search Again?
              </NavLink>
            </Col>
          </FormGroup>
        </div>
        {this.state.displayType === "pieChart" ? (
          showTableChangeDropdown ? (
            <PieChartWithCustomization
              resultData={this.state.viewTransactionsResultData}
            />
          ) : (
            <p
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontStyle: "italic",
                fontSize: "20px",
              }}
            >
              Transaction details are not present for provided search criteria.
              Please try again.
            </p>
          )
        ) : showTableChangeDropdown ? (
          <ViewTransactionsResult
            resultData={this.state.viewTransactionsResultData}
            refreshApiData={this.handleGetTransactions}
            tableToShow={this.state.tableToShow}
          />
        ) : (
          <p
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            Transaction details are not present for provided search criteria.
            Please try again.
          </p>
        )}
      </div>
    ) : (
      <div style={{ marginTop: 4 + "%", marginLeft: 4 + "%", width: 90 + "%" }}>
        <Form>
          <FormGroup row className="formGroupRow">
            <Label sm={2} className="bold">
              Filter by
            </Label>
            <Col sm={8} style={{ marginLeft: -90 }}>
              <FormGroup check>
                <Label sm={4} for="td" check>
                  <Input
                    style={{ marginLeft: -15 + "px" }}
                    type="radio"
                    name="radio1"
                    id="td"
                    checked={this.state.transactionPeriodRadio === "td"}
                    onChange={this.handleTransactionPeriodChange}
                  />
                  Transaction Date
                </Label>
                <Label sm={4} check>
                  <Input
                    style={{ marginLeft: -15 + "px" }}
                    type="radio"
                    name="radio1"
                    id="tp"
                    checked={this.state.transactionPeriodRadio === "tp"}
                    onChange={this.handleTransactionPeriodChange}
                  />
                  Transaction Period
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row className="formGroupRow">
            <Label sm={2}></Label>
            <Col sm={8} style={{ marginLeft: -90 }}>
              <FormGroup row className="formGroupRow">
                <Label sm={1}>From </Label>
                <Col sm={3}>
                  <Input
                    type="date"
                    value={this.state.tdDateFrom}
                    max={this.state.tdDateTo}
                    onChange={this.handleTdDateFromChange}
                    disabled={!(this.state.transactionPeriodRadio === "td")}
                  />
                </Col>
                <Label sm={1}>For </Label>
                <Col sm={3}>
                  <Input
                    type="select"
                    value={this.state.tpDuration}
                    onChange={this.handleTpDurationChange}
                    disabled={!(this.state.transactionPeriodRadio === "tp")}
                  >
                    <option value="pleaseSelect">Please select</option>
                    <option value="1">Last 1 month</option>
                    <option value="3">Last 3 month</option>
                    <option value="6">Last 6 month</option>
                  </Input>
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row className="formGroupRow">
            <Label sm={2}></Label>
            <Col sm={8} style={{ marginLeft: -90 }}>
              <FormGroup row>
                <Label sm={1}>To</Label>
                <Col sm={3}>
                  <Input
                    type="date"
                    value={this.state.tdDateTo}
                    min={this.state.tdDateFrom}
                    onChange={this.handleTdDateToChange}
                    disabled={!(this.state.transactionPeriodRadio === "td")}
                  />
                </Col>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row className="formGroupRow">
            <Label sm={2} className="bold">
              Display Format
            </Label>
            <Col sm={2} style={{ marginLeft: -90 }}>
              <Input
                type="select"
                onChange={this.handleDisplayFormatDropdownChange}
                value={this.state.displayFormat}
              >
                <option value="onScreen">On Screen</option>
                <option value="pdf">Excel Format</option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={2}></Col>
            <Col sm={4} style={{ marginLeft: -90 }}>
              <button
                className="primary-theme-button"
                disabled={
                  !(
                    this.state.tpDuration !== "" ||
                    (this.state.tdDateFrom !== "" && this.state.tdDateTo !== "")
                  )
                }
                style={{
                  marginBottom: 5 + "vh",
                  marginTop: 5 + "vh",
                  width: 142 + "px",
                  float: "right",
                }}
                onClick={this.handleGetTransactions}
              >
                Get Transactions
              </button>
            </Col>
            <Col sm={2}>
              <button
                className="secondary-theme-button"
                onClick={this.handleFormReset}
                style={{
                  marginBottom: 5 + "vh",
                  marginTop: 5 + "vh",
                }}
              >
                Reset
              </button>
            </Col>
          </FormGroup>
        </Form>
        {this.state.isPDFReady && (
          <div hidden={true}>
            <Workbook
              filename="fraud-transactions.xlsx"
              element={<button id="clickToDownloadPdf">Download</button>}
            >
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.significantFrauds}
                name="Significant fraud transactions"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Occurrence" value="occurance" />
                <Workbook.Column label="Fraud priority" value="fraud_type" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
                <Workbook.Column label="Remarks" value="remark" />
              </Workbook.Sheet>
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.freqArr}
                name="Based on CC usage Fequency"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
              </Workbook.Sheet>
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.locationArr}
                name="Based on CC usage Location"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
              </Workbook.Sheet>
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.overDraftArr}
                name="Based on CC OverDraft"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
              </Workbook.Sheet>
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.balance}
                name="Based on CC Book Balance"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
              </Workbook.Sheet>
              <Workbook.Sheet
                data={this.state.viewTransactionsResultData.dailySpending}
                name="Based on CC Avg Daily Spending"
              >
                <Workbook.Column label="Id" value="id" />
                <Workbook.Column
                  label="Transaction Id"
                  value="transaction_id"
                />
                <Workbook.Column label="Card Id" value="card_id" />
                <Workbook.Column
                  label="Transaction date"
                  value="transaction_date"
                />
                <Workbook.Column
                  label="Fraud threshold"
                  value="fraud_threshold"
                />
              </Workbook.Sheet>
            </Workbook>
          </div>
        )}
      </div>
    );
    return webResponse;
  }
}

export default ViewTransactions;
