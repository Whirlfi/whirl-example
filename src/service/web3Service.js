import {
  ERC20_ABI,
  StableSwapCompound_ABI,
  StableSwapCompoundAddress,
} from "../utils";

const Web3 = require("web3");
window.ethereum.enable().catch((error) => {
  console.log(error);
});
const web3 = new Web3(window.ethereum);

export const getNetwork = async () => {
  const chainId = await web3.eth.net.getId();
  let network;
  if (chainId === 4) network = "Rinkeby";
  else if (chainId === 80001) network = "Matic";
  else network = "Unknown";
  return network;
};
export async function getDefaultAccount() {
  try {
    const accounts = await getAccounts();
    if (accounts && accounts.length >= 1) {
      return accounts[0];
    }
  } catch (e) {
    // ignore
  }
  return null;
}
// get accounts
export function getAccounts() {
  return window.ethereum.enable().then(() => {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
}

export const getExchangeRate = async () => {
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

export const approve = async (tokenAddress, pAmount) => {
  const amount = web3.utils.toWei(pAmount + "");
  const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
  const from = await getDefaultAccount();
  await contract.methods
    .approve(StableSwapCompoundAddress, amount)
    .send({ from: from })
    .then(async (logs) => {
      console.log("Approve: " + logs.transactionHash);
    });
};

export const add_liquidity = async () => {
  const contract = new web3.eth.Contract(
    StableSwapCompound_ABI,
    StableSwapCompoundAddress
  );
  const userAddress = await getDefaultAccount();
  await contract.methods
    .add_liquidity([10, 10], 0)
    .send({ from: userAddress })
    .then(async (logs) => {
      console.log("Add Liquidity: " + logs.transactionHash);
    });
};

// Not is use

// const test2 = async () => {
//   await window.ethereum.enable();
//   const web3 = new Web3(window.web3.currentProvider);
//   const contract = new web3.eth.Contract(StableSwapCompound_ABI, StableSwapCompoundAddress);
//   const data = contract.methods.balances(0).encodeABI();
//   let result = await web3.eth.call({
//     to: address, // contract address
//     data: data,
//   });
//   console.log(`result: ${result}`);
// };

// const test3 = async () => {
//   await window.ethereum.enable();
//   const web3 = new Web3(window.web3.currentProvider);
//   const contract = new web3.eth.Contract(StableSwapCompound_ABI, StableSwapCompoundAddress);
//   const data = contract.methods
//     ._mint_for_testing(
//       "0xcfEA581f1f3557D8c2fFF83945426499d7790856",
//       10000000000000
//     )
//     .encodeABI();
//   const transactionParameters = {
//     gasPrice: "20000000000", // customizable by user during MetaMask confirmation.
//     gas: 1200000, // customizable by user during MetaMask confirmation.
//     to: address, // Required except during contract publications.
//     from: web3.currentProvider.selectedAddress, // must match user's active address.
//     //value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data: data, // Optional, but used for defining smart contract creation and interaction.
//     //chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };
//   let result = await web3.eth.sendTransaction(transactionParameters);
//   console.log(`result: ${result}`);
// };
