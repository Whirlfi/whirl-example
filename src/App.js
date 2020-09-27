import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { abi, address } from "./utils/web3/contract";

const test = async () => {
  await window.ethereum.enable();
  const web3 = new Web3(window.web3.currentProvider);
  const { Swap, Pool } = window.WhirlSdk.default;
  const swap = new Swap(web3);
  const pool = new Pool(web3);
  const rate = await swap.getExchangeRate("", "", 1, 2);
  console.log(rate);
  // const trx = await swap.swap("USDC", "DAI", 10, 1);
  // console.log(trx);
  const balances = await Promise.all([
    pool.getBalances(0),
    pool.getBalances(1),
  ]);
  //const balances = await pool.getBalances(0);
  console.log(`balances: ${balances}`);
};

const test1 = async () => {
  await window.ethereum.enable();
  const web3 = new Web3(window.web3.currentProvider);
  const contract = new web3.eth.Contract(abi, address);
  const data = contract.methods.add_liquidity([10, 10], 0).encodeABI();
  const transactionParameters = {
    gasPrice: "20000000000", // customizable by user during MetaMask confirmation.
    gas: 1200000, // customizable by user during MetaMask confirmation.
    to: address, // Required except during contract publications.
    from: web3.currentProvider.selectedAddress, // must match user's active address.
    //value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data, // Optional, but used for defining smart contract creation and interaction.
    //chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  let result = await web3.eth.sendTransaction(transactionParameters);
  console.log(`result: ${result}`);
};

const test2 = async () => {
  await window.ethereum.enable();
  const web3 = new Web3(window.web3.currentProvider);
  const contract = new web3.eth.Contract(abi, address);
  const data = contract.methods.balances(0).encodeABI();
  let result = await web3.eth.call({
    to: address, // contract address
    data: data,
  });
  console.log(`result: ${result}`);
};

const test3 = async () => {
  await window.ethereum.enable();
  const web3 = new Web3(window.web3.currentProvider);
  const contract = new web3.eth.Contract(abi, address);
  const data = contract.methods
    ._mint_for_testing(
      "0xcfEA581f1f3557D8c2fFF83945426499d7790856",
      10000000000000
    )
    .encodeABI();
  const transactionParameters = {
    gasPrice: "20000000000", // customizable by user during MetaMask confirmation.
    gas: 1200000, // customizable by user during MetaMask confirmation.
    to: address, // Required except during contract publications.
    from: web3.currentProvider.selectedAddress, // must match user's active address.
    //value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data, // Optional, but used for defining smart contract creation and interaction.
    //chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  let result = await web3.eth.sendTransaction(transactionParameters);
  console.log(`result: ${result}`);
};

function App() {
  test1();
  //test1();
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
