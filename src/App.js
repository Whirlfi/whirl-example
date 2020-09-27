import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";

const test = async () => {
  await window.ethereum.enable();
  const web3 = new Web3(window.web3.currentProvider);
  const { Swap } = window.WhirlSdk.default;
  const swap = new Swap(web3);
  const rate = await swap.getExchangeRate("", "", 1, 2);
  console.log(rate);
  // const trx = await swap.swap("USDC", "DAI", 10, 1);
  // console.log(trx);
};

function App() {
  test();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
