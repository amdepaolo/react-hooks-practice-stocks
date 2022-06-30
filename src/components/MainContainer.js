import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolio] = useState([]);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  
  useEffect(()=>{
    fetch('http://localhost:3001/stocks')
    .then(r => r.json())
    .then(array => setStocks(array))
  },[])

  function addToPortfolio(purchaseStock){
    const updatedPortfoloio = [...portfolioStocks, purchaseStock];
    setPortfolio(updatedPortfoloio);
  }

  function filterType(stock){
    if(filter === null || filter=== 'All') return true;
    else return stock.type === filter;
  }

  function sorter(a, b){
    if (sort === 'num'){
      return a.price - b.price;
    }
    else if (sort === 'alpha'){
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    else return 0;
  }

  function removeFromPortfolio(deleteStock){
    const updatedPortfoloio = portfolioStocks.filter(stock => stock.ticker !== deleteStock.ticker);
    setPortfolio(updatedPortfoloio);
  }

  const filteredStocks = stocks.sort(sorter).filter(filterType);
  const filteredPortfolio = portfolioStocks.sort(sorter).filter(filterType);

  return (
    <div>
      <SearchBar 
        changeFilter={setFilter}
        changeSort={setSort} />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks} 
            purchase={addToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            portfolio={filteredPortfolio} 
            sell={removeFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
