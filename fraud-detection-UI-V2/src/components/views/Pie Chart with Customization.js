import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import "./PieChart.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartWithCustomization extends Component {
  render() {
    const criticalRecordCount = this.props.resultData.significantFrauds.filter(
      (transactionObj) => transactionObj.fraud_type.toUpperCase() === "CRITICAL"
    ).length;
    const ordinaryRecordCount = this.props.resultData.significantFrauds.filter(
      (transactionObj) => transactionObj.fraud_type.toUpperCase() === "ORDINARY"
    ).length;
    const monitorRecordCount = this.props.resultData.significantFrauds.filter(
      (transactionObj) => transactionObj.fraud_type.toUpperCase() === "MONITOR"
    ).length;

    setTimeout(() => {
      document.getElementsByClassName("canvasjs-chart-credit")[0].innerHTML =
        "";
      document.getElementsByClassName("canvasjs-chart-credit")[1].innerHTML =
        "";
    }, 500);

    const options = {
      theme: "light1",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Significant fraud transactions",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          indexLabel: "#percent%",
          percentFormatString: "#0.##",
          toolTipContent: "{label}: <strong>{y} (#percent%)</strong>",
          legendText: "{label}",
          indexLabelPlacement: "outside",
          dataPoints: [
            {
              y: criticalRecordCount,
              label: "Critical frauds",
              color: "red",
            },
            {
              y: monitorRecordCount,
              label: "Monitorable frauds",
              color: "#ff6200",
            },
            {
              y: ordinaryRecordCount,
              label: "Ordinary frauds",
              color: "#f5c647",
            },
          ],
        },
      ],
    };

    const options2 = {
      theme: "light1",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Fraud transactions",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          indexLabel: "#percent%",
          percentFormatString: "#0.##",
          toolTipContent: "{label}: <strong>{y} (#percent%)</strong>",
          legendText: "{label}",
          indexLabelPlacement: "outside",
          dataPoints: [
            {
              y: this.props.resultData.freqArr.length,
              label: "Usage frequency",
            },
            {
              y: this.props.resultData.locationArr.length,
              label: "Usage location",
            },
            {
              y: this.props.resultData.overDraftArr.length,
              label: "Overdraft",
            },
            {
              y: this.props.resultData.balance.length,
              label: "Book balance",
            },
            {
              y: this.props.resultData.dailySpending.length,
              label: "Average daily spending",
            },
          ],
        },
      ],
    };

    return (
      <div>
        <div style={{ width: 49 + "%", float: "left" }}>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
        </div>
        <div style={{ width: 49 + "%", float: "left" }}>
          <CanvasJSChart
            options={options2}
            /* onRef={ref => this.chart = ref} */
          />
        </div>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChartWithCustomization;
