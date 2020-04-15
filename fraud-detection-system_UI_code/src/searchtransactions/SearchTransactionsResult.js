import React, { Component } from "react";
import { DataTable } from "react-data-components";
import "react-data-components/css/table-twbs.css";

class SearchTransactionsResult extends Component {
  render() {
    let columns = [
      { title: "Id", prop: "id" },
      { title: "Card Id", prop: "card_id" },
      { title: "Auth", prop: "auth" },
      { title: "Current book balance", prop: "cur_bb" },
      { title: "Card used", prop: "card_used" },
      { title: "Average book balance", prop: "avg_bb" },
      { title: "Overdraft", prop: "overdraft" },
      { title: "CC Age", prop: "cc_age" },
      { title: "Card used today", prop: "cut" },
      { title: "Locations", prop: "loc" },
      { title: "Locations today", prop: "loct" },
      { title: "Overdraft today", prop: "odt" },
      { title: "Amount", prop: "amount" },
      { title: "Transaction date", prop: "transaction_date" },
    ];

    const finalResponse =
      this.props.resultData.length > 0 ? (
        <DataTable
          keys="id"
          columns={columns}
          initialData={this.props.resultData}
          initialPageLength={5}
          initialSortBy={{ prop: "card_id", order: "ascending" }}
        />
      ) : (
        <p
          style={{
            textAlign: "center",
            fontWeight: "500",
            fontStyle: "italic",
          }}
        >
          Transaction details are not present for provided search criteria.
          Please try again.
        </p>
      );
    return finalResponse;
  }
}

export default SearchTransactionsResult;
