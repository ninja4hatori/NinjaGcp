import React, { Component } from "react";
import "./ViewTransactions.css";
import RingLoader from "react-spinners/RingLoader";
import {Col,Input,FormGroup,Button,Form,Label,CustomInput} from 'reactstrap';
import ViewTransactionsResult from './ViewTransactionsResult';
import PieChartWithCustomization from '../views/Pie Chart with Customization'

class ViewTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        transactionPeriodRadio:"td",
        tdDateFrom : "",
        tdDateTo : "",
        tpDuration : "",
        displayFormat : "",
        displayType : "table",
        isResultReady : false
      };
      this.handleGetTransactions = this.handleGetTransactions.bind(this);
      this.handleTransactionPeriodChange = this.handleTransactionPeriodChange.bind(this);
      this.handleTdDateFromChange = this.handleTdDateFromChange.bind(this);
      this.handleTdDateToChange = this.handleTdDateToChange.bind(this);
      this.handleTpDurationChange = this.handleTpDurationChange.bind(this);
      this.handleDisplayFormatDropdownChange = this.handleDisplayFormatDropdownChange.bind(this);
      this.resetState = this.resetState.bind(this);
      this.handleSearchAgain = this.handleSearchAgain.bind(this); 
      this.handleDisplayTypeChange = this.handleDisplayTypeChange.bind(this);   
  }

  handleDisplayTypeChange(event) {
    this.setState({displayType:event.target.id});
  }

  resetState() {
    this.setState({isLoading:false,
      transactionPeriodRadio:"td",
      viewTransactionsResultData:[],
      tdDateFrom : "",
      tdDateTo : "",
      tpDuration : "",
      displayFormat : "onScreen",
      displayType : "table",
      isResultReady : false})
  }

  handleDisplayFormatDropdownChange(event) {
    this.setState({displayFormat:event.target.value})
  }

  handleGetTransactions() {
    this.setState({isLoading:true});
    const apiBaseUrl = "http://localhost:9090/fraud-transactions?";
        let finalUrl = apiBaseUrl;
        if(this.state.transactionPeriodRadio === "tp" && this.state.tpDuration !== "") {
          finalUrl = finalUrl+"fraudDuration="+this.state.tpDuration;
        }
        if(this.state.transactionPeriodRadio === "td" && this.state.tdDateFrom !== "" && this.state.tdDateTo !== "") {
            finalUrl = finalUrl+"fraudDateFrom="+this.state.tdDateFrom+"&fraudDateTo="+this.state.tdDateTo; 
        }
        fetch(finalUrl)
        .then(res => res.json())
        .then((data) => {
          let freqArr = [],locationArr = [], overDraftArr=[],balance=[],dailySpending=[];
          let finalObj = {};
          data.frauds.fraud_transactions.map(function(transactionObj){
            switch(transactionObj.fraud_critera){
              case 'FREQ': freqArr.push(transactionObj);break;
              case 'LOCATION' : locationArr.push(transactionObj);break;
              case 'OVER_DRAFT' : overDraftArr.push(transactionObj);break;
              case 'BALANCE' : balance.push(transactionObj);break;
              case 'DAILY_SPENDING' : dailySpending.push(transactionObj);break;
              default : console.log("Invalid fraud criteria : "+transactionObj.fraud_criteria)

            }
          });
          finalObj['freqArr'] = freqArr;
          finalObj['locationArr'] = locationArr;
          finalObj['overDraftArr'] = overDraftArr;
          finalObj['balance'] = balance;
          finalObj['dailySpending'] = dailySpending;
          finalObj['significantFrauds'] = data.frauds.significant_transactions;
          this.setState({ viewTransactionsResultData: finalObj,isResultReady:true,isLoading :false })
        })
        .catch(console.log)
  }

  handleSearchAgain(event) {
    this.setState({isResultReady:false});
}


  handleTransactionPeriodChange(event) {
    this.setState({transactionPeriodRadio:event.target.id,tdDateFrom : "",tdDateTo : "",tpDuration : ""});    
  }

  handleTdDateFromChange(event) {
    this.setState({tdDateFrom:event.target.value});
  }
  
  handleTdDateToChange(event) {
    this.setState({tdDateTo:event.target.value});
  }
  handleTpDurationChange(event) {
    this.setState({tpDuration:event.target.value});
  }


  componentDidMount() {
    this.setState({isLoading:false})
  }

  render() {
    let showPiechart = this.state.displayType === "pieChart" ? <PieChartWithCustomization resultData={this.state.viewTransactionsResultData}/>:<ViewTransactionsResult resultData={this.state.viewTransactionsResultData}/>;
    let showTransactionPeriod = <Label sm={5}><p>Transaction period : {this.state.tpDuration} month(s)</p></Label>
    let showTransactionDateRange = <Label sm={5}><p><b>Fraud transaction date range : </b>{this.state.tdDateFrom} - {this.state.tdDateTo}</p></Label> 
    const webResponse = this.state.isLoading?<RingLoader
    css={{marginTop:25+'vh',marginLeft:45+'vw'}}
    size={10+'vw'}
    color={"#006A4B"}
  loading={this.state.isLoading}/>:this.state.isResultReady?<div style={{marginLeft:4+'%',marginTop:4+'%',marginBottom:31+'px'}}>
  <div className="searchCriteria">
          <FormGroup row>
            <Label sm={1}></Label>
            <Label sm={2}>Search criteria : </Label>
              {this.state.tpDuration && showTransactionPeriod}
              {this.state.tdDateFrom && showTransactionDateRange}
              <Col sm={4}>
              <FormGroup check onClick={this.handleDisplayTypeChange}>
                  <Label sm={3} for="table" check>
                    <Input style={{marginLeft:-20+'px'}} type="radio" name="radio1" id="table" defaultChecked={this.state.displayType==="table"}/>Table
                  </Label>
                  <Label sm={3} check>
                  <Input style={{marginLeft:-20+'px'}} type="radio" name="radio1" id="pieChart" defaultChecked={this.state.displayType==="pieChart"}/>Pie chart
                  </Label>
          
              <div className="searchAgain"><a role="button" href="#" onClick={(event)=>{event.preventDefault();this.handleSearchAgain(event)}}>Search Again?</a></div>
              </FormGroup>
              </Col>
          </FormGroup>

  </div>

  {showPiechart}
 </div>:
  <div style={{marginTop:4+'%',marginLeft:4+'%'}}>

        <Form>
            <FormGroup row className="formGroupRow" >
                <Label sm={1} className="bold">Filter by </Label>
                <Col sm={8}>
                <FormGroup check onClick={this.handleTransactionPeriodChange}>
                  <Label sm={4} for="td"check>
                    <Input style={{marginLeft:-15+'px'}} type="radio" name="radio1" id="td" defaultChecked={this.state.transactionPeriodRadio==="td"}/>Transaction Date
                  </Label>
                  <Label sm={4} check>
                  <Input style={{marginLeft:-15+'px'}} type="radio" name="radio1" id="tp" defaultChecked={this.state.transactionPeriodRadio==="tp"}/>Transaction Period
                  </Label>
                </FormGroup>
                </Col>            
            </FormGroup>
            <FormGroup row className="formGroupRow">
                <Label sm={1}></Label>
                <Col sm={8}>
                <FormGroup row className="formGroupRow">
                  <Label sm={1}>
                  From </Label>
                  <Col sm={3}>
                    <Input type="date" value={this.state.tdDateFrom} max={this.state.tdDateTo} onChange={this.handleTdDateFromChange} disabled={!(this.state.transactionPeriodRadio==="td")}/>
                    </Col>
                    <Label sm={1}>
                  For </Label>
                  <Col sm={3}>
                  <Input type="select" value={this.state.tpDuration} onChange={this.handleTpDurationChange} disabled={!(this.state.transactionPeriodRadio==="tp")}>
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
                <Label sm={1}></Label>
                <Col sm={8}>
                <FormGroup row>
                  <Label sm={1}>
                  To</Label>
                  <Col sm={3}>
                    <Input type="date" value={this.state.tdDateTo} min={this.state.tdDateFrom} onChange={this.handleTdDateToChange} disabled={!(this.state.transactionPeriodRadio==="td")}/>
                    </Col>
                  
                </FormGroup>
                </Col>            
            </FormGroup>

            
            
            <FormGroup row className="formGroupRow">
                <Label sm={1} className="bold">Display Format</Label>
                <Col sm={2}>
                <Input type="select" onChange = {this.handleDisplayFormatDropdownChange}>
                        <option value="onScreen">On Screen</option>
                        <option value="pdf">PDF Format</option>
                </Input>
                </Col>            
            </FormGroup>

            <FormGroup row>
                <Col sm={5} >
                </Col>
                <Col sm={3} >
                <Button color="primary" className={"Submit-Button"} disabled={!(this.state.tpDuration !=="" || (this.state.tdDateFrom!=="" && this.state.tdDateTo!==""))} style={{marginBottom:5+'vh',marginTop:5+'vh',width:142+"px"}} onClick={this.handleGetTransactions}>Get Transactions</Button>
                </Col>            
            </FormGroup>
        </Form>
  </div>
    return (
      webResponse
    );
  }
}

export default ViewTransactions;
