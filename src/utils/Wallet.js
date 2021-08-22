import * as Web3 from 'web3'
import { web3Provider } from './constants'

export async function getERC20TokenBalance(tokenAddress) {
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
    console.log('connecting wallet')
    if(window.ethereum) {
      console.log('enabling ethereum')
      await window.ethereum.enable();
      console.log('finished enabling eth')
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