import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL, toUnitAmount } from '../constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';
import BidModal from './BidModal'

const Home = () => {
  // page content
  const pageTitle = 'Home'
  const pageDescription = 'welcome to react bootstrap templates'
  const [items, setItems] = useState([]);
  const [accountAddress, setAccountAddress] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [collectionDescription, setCollectionDescription] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [show, setShow] = useState(false);
  let seaport = null; 

  useEffect( async () => {
    //await fetchList();
    onChangeAddress();
      getOrderData();
    if (!accountAddress) {
      //await connectWallet();
    }else{
      
    }
  }, [])

  

  const onChangeAddress = () => {
    console.log('calling onChangeAddress')
    seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Rinkeby
    })
    const web3 = seaport.web3

    web3.eth.getAccounts((err, res) => {
      if(!err) {
        setAccountAddress(res[0]);
      }
      
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
      console.log(JSON.stringify(orders));
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
        console.log(response.data.assets);
      }catch(err) {
        console.log('error fetching assets:' + err);
      }
  }

  const getPrice = (currentPrice, paymentTokenContract) => {
    const price = toUnitAmount(currentPrice, paymentTokenContract)
    return parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
  }
 const buildDetailUrl = (assetAddress, tokenId) => {
	console.log(" asset address " + assetAddress);
    return  '/detail?asset_contract_address='+assetAddress + '&token_id=' + tokenId;
	
  }
  const buyPressed = async (index) => {
    // check if a wallet exists, if not then go to wallet page
    setSelectedPrice(getPrice(items[index].currentPrice, items[index].paymentTokenContract));
    setSelectedName(items[index].asset.name);
    
    let account = null;
    if(window.ethereum) {
      await window.ethereum.enable();
      try{
        account = await window.ethereum.selectedAddress;
        //setAccountAddress(account);
        //alert('setting account address:' + accountAddress)
      }catch(e) {
        alert('Error occurred')
        return;
      }
    }else{
      alert('Please install a crypto wallet');
      return;
    }
    handleShow();
    return;
    
    if(!seaport) {
      seaport = new OpenSeaPort(web3Provider, {
        networkName: Network.Rinkeby
      })
    }
    if(!seaport) {
      alert('seaport still null')
      return
    }
    
    
    
    const schemaName = items[index].metadata.schema;
    if(items[index].paymentTokenContract.symbol === 'ETH') {
      alert('Only bids are supported now');
      return;
    }
  
    const currentPrice = getPrice(items[index].currentPrice, items[index].paymentTokenContract)
    let bid = prompt("Please enter your bid", currentPrice);
    if (bid != null) {
      
      const { tokenId, tokenAddress } = items[index].asset;
      if(!seaport) {
        alert('seaport null')
        return
      }
      let offer;
      try{
        await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
          schemaName // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress: account,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: bid,
      })
      alert('successful bid on item. Price: ' + bid + ' check the opensea link to view bid');
      }catch(e) {
        alert('error on buy:' + JSON.stringify(e.message));
        console.log(JSON.stringify(e.message));
      }
    }
    
    
  }

  const listItems = items.map((item, index) =>
    <tr>
      <td>
          <a href={item.asset.openseaLink} target="_blank">
          <img src={item.asset.imagePreviewUrl}/>
          </a>
        </td>
        <td>
          <b>Name:</b> { item.asset.name }<br/>
          <b>Description:</b> { item.asset.description }<br/>
          
          <a href={item.asset.openseaLink} target="_blank">Link</a><br/>
          <Button onClick={() => buyPressed(index)}>
            Buy Price: { getPrice(item.currentPrice, item.paymentTokenContract) } ETH
          </Button>

          	<a href={buildDetailUrl(item.asset.tokenAddress, item.asset.tokenId)}>Detail </a>

        </td>
    </tr>
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const placeBid = (amount) => {
    alert("ok placing bid for:" + amount);
  }

  return (
    <div>
      <BidModal 
        show={show} 
        handleClose={handleClose} 
        placeBid={placeBid} 
        price={selectedPrice} 
        name={selectedName}
      />
      <h2>{ collectionName }:</h2> <h5>{ collectionDescription }</h5>
       <table  >
        {listItems}
    </table> 
    
    </div>
  )
}

export default Home