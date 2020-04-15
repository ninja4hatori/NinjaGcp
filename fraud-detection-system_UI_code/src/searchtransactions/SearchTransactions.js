import React,{Component} from  'react';
import './SearchTransactions.css';
import { Col,Form, FormGroup, Label, Input, Button } from 'reactstrap';
import SearchTransactionsResult from './SearchTransactionsResult';

class SearchTransactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputCardId : "",
            basicSearch : true,
            inputDateFrom : "",
            inputDateTo : "",
            inputFraudType : "",

            searchResultData : [],

            dropdownChanged : false,
            fraudTypeDropdownChanged : false,
            validInputCardId : false,
            validDateFrom : false,
            validDateTo : false,
            validFraudType : false,
            showSearchResult : false
        };

        this.handleCardIdInput = this.handleCardIdInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleTransactionDateFromInput = this.handleTransactionDateFromInput.bind(this);
        this.handleTransactionDateToInput = this.handleTransactionDateToInput.bind(this);
        this.handleFraudTypeDropdownChange = this.handleFraudTypeDropdownChange.bind(this);
        this.resetState = this.resetState.bind(this);
        this.handleSearchAgain = this.handleSearchAgain.bind(this);
    }

    resetState() {
        this.setState({
        inputCardId : "",
        basicSearch : true,
        inputDateFrom : "",
        inputDateTo : "",
        inputFraudType : "",

        searchResultData:[],

        dropdownChanged : false,
        dropdownValue : "",
        fraudTypeDropdownChanged : false,
        validInputCardId : false,
        validDateFrom : false,
        validDateTo : false,
        validFraudType : false,
        showSearchResult: false});
    }

    handleSearchAgain(event) {
        this.setState({showSearchResult:false});
    }

    handleCardIdInput(event) {
        if(event.target.value.length<6){
            this.setState({inputCardId : event.target.value, validInputCardId:!(event.target.value.length < 5)});
        }
    }

    handleTransactionDateFromInput(event) {
        let validDate = event.target.value.length === 10; 
        this.setState({inputDateFrom:event.target.value,validDateFrom:validDate});
    }
    
    handleTransactionDateToInput(event) {
        let validDate = event.target.value.length === 10; 
        this.setState({inputDateTo:event.target.value, validDateTo:validDate});
    }

    handleFraudTypeDropdownChange(event) {
        if(!this.state.fraudTypeDropdownChanged) {
            this.setState({fraudTypeDropdownChanged:true, validFraudType:true });
        }
        this.setState({inputFraudType:event.target.value});
    }

    handleSearchSubmit(event) {
        const apiBaseUrl = "http://localhost:9090/transactions?";
        let finalUrl = apiBaseUrl;
        if(this.state.inputCardId !== "") {
            finalUrl = finalUrl+"cardId="+this.state.inputCardId;
        }
        if(this.state.inputDateFrom !== "" && this.state.inputDateTo !== "") {
            if(this.state.inputCardId !== "") {
                finalUrl = finalUrl+"&"
            }
            finalUrl = finalUrl+"transactionDateFrom="+this.state.inputDateFrom+"&transactionDateTo="+this.state.inputDateTo; 
        }
        fetch(finalUrl)
        .then(res => res.json())
        .then((data) => {
          this.setState({ searchResultData: data,showSearchResult:true })
        })
        .catch(console.log)
    }

    handleDropdownChange(event) {
        if(!this.dropdownChanged) {
            this.setState({dropdownChanged : true});
        }
        if(event.target.value === "cardId") {
            this.setState({basicSearch : true,fraudTypeDropdownChanged : false,
                dropdownValue:event.target.value,
                validInputCardId : false,
                validDateFrom : false,
                validDateTo : false,
                validFraudType : false,
                inputCardId : "",
                inputDateFrom : "",
                inputDateTo : "",
                inputFraudType : ""})
        } else if(event.target.value === "specificField") {
            this.setState({basicSearch : false,fraudTypeDropdownChanged : false,
                dropdownValue:event.target.value,
                validInputCardId : false,
                validDateFrom : false,
                validDateTo : false,
                validFraudType : false,
                inputCardId : "",
                inputDateFrom : "",
                inputDateTo : "",
                inputFraudType : "",})
        }
    }

    renderForm() {
        let inputForm;
        if(this.state.basicSearch) {
            inputForm = <Form>
            <FormGroup row>
                <Label sm={4}>Card Id     :</Label>
                <Col sm={4}>
                <Input valid={this.state.validInputCardId} type="number" min="10000" max="99999"  maxLength="5"
    value={this.state.inputCardId} onChange={this.handleCardIdInput} />
                </Col>            
            </FormGroup>
            <Button color="primary" className={"Submit-Button"} disabled={!this.state.validInputCardId} onClick={this.handleSearchSubmit}>Submit</Button>
        </Form>
        } else {
            inputForm = <Form>
            <FormGroup row>
                <Label sm={4}>Card Id     :</Label>
                <Col sm={4}>
                <Input valid={this.state.validInputCardId} type="number" min="10000" max="99999" maxLength="5" value={this.state.inputCardId} onChange={this.handleCardIdInput} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={4}>Transaction Date From :</Label>
                <Col sm={4}>
                <Input valid={this.state.validDateFrom } type="date" max={this.state.inputDateTo} value={this.state.inputDateFrom} onChange={this.handleTransactionDateFromInput} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={4}>Transaction Date To:</Label>
                <Col sm={4}>
                <Input valid={this.state.validDateTo} type="date" min={this.state.inputDateFrom} value={this.state.inputDateTo} onChange={this.handleTransactionDateToInput} />
                </Col>
            </FormGroup>

            <Button color="primary" className={"Submit-Button"} disabled={!(this.state.validInputCardId || (this.state.validDateFrom && this.state.validDateTo)|| this.state.validFraudType)} onClick={this.handleSearchSubmit}>Submit</Button>
        </Form>
        }
            return (
            inputForm
            );
    }

    renderDropdown() {
        let dropdownForm;
        
            dropdownForm =  <Form>
                <FormGroup row>
                    <Label sm={4}>Search transactions by :</Label>
                    <Col sm={4}>
                    <Input valid={this.state.dropdownChanged} type="select" value={this.state.dropdownValue} onChange = {this.handleDropdownChange}>
                        <option value="cardId">Card Id</option>
                        <option value="specificField">Specific fields</option>
                    </Input>
                    </Col>
                </FormGroup>
            </Form> 
        return (
            dropdownForm
            );
    }

    render() {
    let showCardId = <Label sm={3}><p><b>Card Id : </b>{this.state.inputCardId}</p></Label>
    let showTransactionDateRange = <Label sm={7}><p><b>Transaction date range : </b>{this.state.inputDateFrom} - {this.state.inputDateTo}</p></Label>
    let finalResponse = this.state.showSearchResult?
    <div style={{marginLeft:4+'%',marginTop:4+'%',marginBottom:31+'px'}}>
        <div className="searchCriteria">
                <FormGroup row>
                <Label sm={1}></Label>
                <Label sm={2}>Search criteria : </Label>
                <Label sm={7}>
                    {this.state.inputCardId && showCardId}
                    {this.state.inputDateFrom && showTransactionDateRange}
                </Label>
                <Col sm={2}>
                    <div className="searchAgain"><a role="button" href="#" onClick={(event)=>{event.preventDefault();this.handleSearchAgain(event)}}>Search Again?</a>
                        </div>
                </Col>
                </FormGroup>

        </div> 
        <SearchTransactionsResult resultData={this.state.searchResultData
    }/> </div>
    
    : <div className="Search-Transactions">
        {this.renderDropdown()}
        {this.renderForm()}
    </div>
        return(
            finalResponse
        );
    }
}

export default SearchTransactions;