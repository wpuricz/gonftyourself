import Header from '../components/Header'
import Meta from '../components/Meta'
import axios from 'axios';

import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL, toUnitAmount } from '../constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';


const Home = () => {
  // page content
  const pageTitle = 'Home'
  const pageDescription = 'welcome to react bootstrap templates'
  const [items, setItems] = useState([]);
  const [accountAddress, setAccountAddress] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [collectionDescription, setCollectionDescription] = useState([]);
  //const collectionName = `Pete's Collection`;
  let seaport = null; 
  //let accountAddress = '';

  useEffect( async () => {
    //await fetchList();
    if (!accountAddress) {
      console.log('connecting wallet');
      await connectWallet();
      
    }else{
      console.log('about to call on change')
      onChangeAddress();
      console.log('calling order data')
      getOrderData();
    }
  }, [])

  const onChangeAddress = () => {
    console.log('calling onChangeAddress')
    seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Rinkeby
    })
    const web3 = seaport.web3

    web3.eth.getAccounts((err, res) => {
      setAccountAddress(res[0]);
      
    })
  }

  const getOrderData = async () => {
      console.log('getting data')
      const { orders, count } = await seaport.api.getOrders({
        owner: '0x8c059e23890ad6e2a423fb5235956e17c7c92d7f',
        side: OrderSide.Sell,
        // Possible query options:
        // 'asset_contract_address'
        // 'taker'
        // 'token_id'
        // 'token_ids'
        // 'sale_kind'
        
      }, 1)
      //console.log(JSON.stringify(orders));
      console.log(orders[0].asset.name);
      console.log(orders[0].asset.description);
      console.log('count:' + count);
      //this.setState({ orders, total: count })
      setCollectionName(orders[0].asset.collection.name);
      setCollectionDescription(orders[0].asset.collection.description);
      setItems(orders);
  }
  
  const fetchList = async () => {
    const url = "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&owner=0x8c059e23890ad6e2a423fb5235956e17c7c92d7f"
    console.log('fetching data')  
      try {
        let response = await axios.get(url)
        setItems(response.data.assets);
        
        //console.log(JSON.stringify(items));

        //console.log(JSON.stringify(items[0].sell_orders[0].base_price))
      }catch(err) {
        console.log('error fetching assets:' + err);
      }
  }

  // const convertPrice = (price) => {
  //   web3.fromWei(web3.eth.getBalance(),"ether").toString()
  // }

  // const connectWallet = async () => {
  //   if (!window.web3) {
  //     web3Provider = new PortisProvider({
  //       // Put your Portis API key here
  //     })
  //   } else if (window.ethereum) {
  //     window.ethereum.enable()
  //   } else {
  //     const errorMessage = 'You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.'
  //     alert(errorMessage)
  //     throw new Error(errorMessage)
  //   }
  //   networkCallbacks.map((c) => c(web3Provider))
  // }

  // const getPrice = (sellOrder) => {
  //   if(sellOrder[0]) console.log('got sell')
  //   return "3"
  // }

  const getPrice = (currentPrice, paymentTokenContract) => {
    const price = toUnitAmount(currentPrice, paymentTokenContract)
    return parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
  }

  const listItems = items.map((item) =>
    <tr>
      <td>
          <a href={item.asset.openseaLink} target="_blank">
          <img src={item.asset.imagePreviewUrl}/>
          </a>
        </td>
        <td>
          <b>Name:</b> { item.asset.name }<br/>
          <b>Description:</b> { item.asset.description }<br/>
          <b>Price:</b> { getPrice(item.currentPrice, item.paymentTokenContract) } ETH<br/>
          <a href={item.asset.openseaLink} target="_blank">Link</a>

          
        </td>
    </tr>
  );

  return (
    <div>
      {/* <Meta title={pageTitle}/>
      <Header head={pageTitle} description={pageDescription} /> */}
      <h2>{ collectionName }: { collectionDescription }</h2>
       <table  class="table table-bordered bordered-primary table-striped product-table">
        {listItems}
    </table> 
    
    </div>
  )
}

export default Home