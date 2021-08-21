import * as Web3 from 'web3'
import BigNumber from 'bignumber.js'
//import { PortisProvider } from 'portis'

// export const OPENSEA_URL = "https://opensea.io"; // test
// export const COLLECTION_NAME = "Jersey Shore"
export const OPENSEA_URL = "https://rinkeby-api.opensea.io";  // prod
export const COLLECTION_NAME = "carbureted"

// owner is same for test and prod
export const OWNER = "0x8c059e23890ad6e2a423fb5235956e17c7c92d7f"

export const DEFAULT_DECIMALS = 18
export let web3Provider = typeof web3 !== 'undefined'
  ? window.web3.currentProvider
  : new Web3.providers.HttpProvider('https://mainnet.infura.io')

// Replace this with Redux for more complex logic
const networkCallbacks = []
export const onNetworkUpdate = (callback) => {
  networkCallbacks.push(callback)
}

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals = tokenContract && tokenContract.decimals != null
    ? tokenContract.decimals
    : DEFAULT_DECIMALS

  const amountBN = new BigNumber(baseAmount.toString())
  return amountBN.div(new BigNumber(10).pow(decimals))
}

export function toBaseUnitAmount(unitAmount, tokenContract = null) {
  const decimals = tokenContract && tokenContract.decimals != null
    ? tokenContract.decimals
    : DEFAULT_DECIMALS

  const amountBN = new BigNumber(unitAmount.toString())
  return amountBN.times(new BigNumber(10).pow(decimals))
}

export async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res)
    })
  )
}

async function getERC20TokenBalance(tokenAddress) {
  const web3 = new Web3(web3Provider);
  let account = await web3.eth.getAccounts();
  
  // The minimum ABI to get ERC20 Token balance
  let walletAddress = account[0];

  let minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ];
  let contract = new web3.eth.Contract(minABI,tokenAddress);
  const tokenBalanceWei = await contract.methods.balanceOf(walletAddress).call();
  const tokenBalance = web3.utils.fromWei(tokenBalanceWei,"ether");
  return tokenBalance;
}

export async function getWethBalance() {
  let tokenAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab"; // weth Address
  return await getERC20TokenBalance(tokenAddress);  
  
}

export async function getEthBalance() {
  const web3 = new Web3(web3Provider);
  let account = await web3.eth.getAccounts();
  
  let weiBalance = await web3.eth.getBalance(account[0]);
  const ethBalance = web3.utils.fromWei(weiBalance,"ether");
  return ethBalance;
}

export async function connectWallet() {
  if(window.ethereum) {
    await window.ethereum.enable();
    try{
      let account = await window.ethereum.selectedAddress;
      return account;
    }catch(e) {
      alert('Error occurred')
      return;
    }
  }else{
    alert('Please install a crypto wallet');
    return;
  }
}

export const getPriceFromAsset = (sellOrder) => {
  if (!sellOrder || !sellOrder[0]) return null; // also check created_date and closing_date to see if active
  // or "expiration_time": 1628994402
  const price = toUnitAmount(
    sellOrder[0].base_price,
    sellOrder[0].payment_token_contract
  );
  return parseFloat(price).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });
};

