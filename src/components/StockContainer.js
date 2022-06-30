import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, purchase}) {
  const stocksDisplay = stocks.map(stock => <Stock stock={stock} transaction={purchase} key={stock.id}/>)

  return (
    <div>
      <h2>Stocks</h2>
      {stocksDisplay}
    </div>
  );
}

export default StockContainer;
