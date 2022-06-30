import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, sell}) {
  const portfolioDisplay = portfolio.map(stock => <Stock stock={stock} transaction={sell} key={stock.id}/>)

  return (
    <div>
      <h2>My Portfolio</h2>
      {
       portfolioDisplay
      }
    </div>
  );
}

export default PortfolioContainer;
