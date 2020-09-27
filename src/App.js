import React from "react";
import "./App.css";
import {approve, add_liquidity} from "./service/web3Service";
import { DAI, USDC, cDAI, cUSDC } from "./utils";

function App() {
  return (
    <div className="App">
      <button onClick={()=> approve(cUSDC, 100)}>Approve cUSDC</button>
      <button onClick={()=> approve(cDAI, 100)}>Approve cDAI</button>
      <button onClick={()=> add_liquidity()}>Add Liquidity</button>
    </div>
  );
}

export default App;
