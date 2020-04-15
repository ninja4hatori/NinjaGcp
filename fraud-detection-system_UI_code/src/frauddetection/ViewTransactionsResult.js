import React,{Component} from 'react'
import {DataTable} from 'react-data-components'
import 'react-data-components/css/table-twbs.css';
import { Col,Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PieChartWithCustomization from '../views/Pie Chart with Customization'


class ViewTransactionsResult extends Component {

    render() {
        setTimeout(()=>{
            if(document.getElementById("freqTable") !== null) {
            var element = document.getElementById("freqTable").getElementsByTagName("caption")[0];
            element.innerHTML="Based on CC usage Fequency";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        if(document.getElementById("locationTable") !== null) {
            var element = document.getElementById("locationTable").getElementsByTagName("caption")[0];
            element.innerHTML="Based on CC usage Location";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        if(document.getElementById("overdraftTable") !== null) {
            var element = document.getElementById("overdraftTable").getElementsByTagName("caption")[0];
            element.innerHTML="Based on CC OverDraft";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        if(document.getElementById("balanceTable") !== null) {
            var element = document.getElementById("balanceTable").getElementsByTagName("caption")[0];
            element.innerHTML="Based on CC Book Balance";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        if(document.getElementById("dailySpendingTable") !== null) {
            var element = document.getElementById("dailySpendingTable").getElementsByTagName("caption")[0];
            element.innerHTML="Based on CC Average Daily Spending";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        if(document.getElementById("significantFraudsTable") !== null) {
            var element = document.getElementById("significantFraudsTable").getElementsByTagName("caption")[0];
            element.innerHTML="Significant fraud transactions";
            element.classList.remove("sr-only");
            element.classList.add("tableCaption");
        }

        },1000);

        setTimeout(()=>{

        },1000);


        let columns = [
            { title: 'Id', prop: 'id'  },
            { title: 'Transaction Id', prop: 'transaction_id' },
            { title: 'Card Id', prop: 'card_id' },
            { title: 'Transaction date', prop: 'transaction_date' },
            { title: 'Fraud threshold', prop: 'fraud_threshold'  }
          ];

          let significant_frauds_columns = [
            { title: 'Id', prop: 'id'  },
            { title: 'Card Id', prop: 'card_id' },
            { title: 'Transaction Id', prop: 'transaction_id' },     
            { title: 'Occurrence', prop: 'occurance' },
            { title: 'Fraud priority', prop: 'fraud_type' },
            { title: 'Transaction date', prop: 'transaction_date' },
            { title: 'Fraud threshold', prop: 'fraud_threshold' },
            { title: 'Customer remarks', prop: 'remark' }
          ];

          const significantFraudsTableResponse = (this.props.resultData.significantFrauds !== undefined && this.props.resultData.freqArr.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="significantFraudsTable"><DataTable
                    keys="id"
                    columns={significant_frauds_columns}
                    initialData={this.props.resultData.significantFrauds}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'fraud_type', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>;

          const freqTableResponse = (this.props.resultData.freqArr !== undefined && this.props.resultData.freqArr.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="freqTable"><DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.props.resultData.freqArr}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'card_id', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>;

          const locationTableResponse = 
          (this.props.resultData.locationArr !== undefined && this.props.resultData.locationArr.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="locationTable"><DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.props.resultData.locationArr}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'card_id', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>;

          const overdraftTableResponse = 
          (this.props.resultData.overDraftArr !== undefined && this.props.resultData.overDraftArr.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="overdraftTable"><DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.props.resultData.overDraftArr}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'card_id', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>

          const balanceTableResponse = 
          (this.props.resultData.balance !== undefined && this.props.resultData.balance.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="balanceTable"><DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.props.resultData.balance}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'card_id', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>;

          const dailySpendingTableResponse =
          (this.props.resultData.dailySpending !== undefined && this.props.resultData.dailySpending.length > 0) ?
          <FormGroup row>
            <Label sm={1}></Label>
            <Col sm={11}>
                <div id="dailySpendingTable"><DataTable
                    keys="id"
                    columns={columns}
                    initialData={this.props.resultData.dailySpending}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'card_id', order: 'ascending' }}
                    />
                </div>
            </Col>
          </FormGroup>:<div></div>;

          console.log(this.props.resultData);
          console.log(this.props.resultData.significantFrauds);
        return(
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