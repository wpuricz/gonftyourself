import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL, toUnitAmount } from '../constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';

import BidModal from './BidModal'

const Home = () => {
	// page content

	const [items, setItems] = useState([]);
	const [accountAddress, setAccountAddress] = useState([]);
	const [collectionName, setCollectionName] = useState([]);
	const [collectionBannerImage, setCollectionBannerImage] = useState([]);
	const [collectionFeatureImage, setCollectionFeatureImage] = useState([]);
	const [collectionImage, setCollectionImage] = useState([]);
	const [collectionDescription, setCollectionDescription] = useState([]);
	const [selectedName, setSelectedName] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [show, setShow] = useState(false);

  let seaport = null;

	useEffect(async () => {
		//await fetchList();
		onChangeAddress();
		//getOrderData();
		fetchList();
		if (!accountAddress) {
			//await connectWallet();
		} else {

		}
	}, [])

	const onChangeAddress = () => {
		console.log('calling onChangeAddress')
		seaport = new OpenSeaPort(web3Provider, {
			networkName: Network.Rinkeby
		})
		const web3 = seaport.web3

		web3.eth.getAccounts((err, res) => {
			if (!err) {
				setAccountAddress(res[0]);
			}

		})
	}

	const getOrderData = async () => {
		console.log('getting data')
		const { orders, count } = await seaport.api.getOrders({
			owner: '0x8c059e23890ad6e2a423fb5235956e17c7c92d7f',
			side: OrderSide.Sell,

		}, 1)
		console.log(JSON.stringify(orders));
		//this.setState({ orders, total: count })
		setCollectionName(orders[0].asset.collection.name);
		setCollectionDescription(orders[0].asset.collection.description);
		setItems(orders);
	}

	const fetchList = async () => {
		const url = "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=carbureted"
		console.log('fetching data')
		try {
			let response = await axios.get(url);
			let items = response.data.assets;
			setItems(items);

			setCollectionBannerImage(items[0].collection.banner_image_url);
			setCollectionFeatureImage(items[0].collection.featured_image);
			setCollectionImage(items[0].collection.image_url);
			setCollectionName(items[0].collection.name);
			setCollectionDescription(items[0].collection.description);
			console.log(response.data.assets);
		} catch (err) {
			console.log('error fetching assets:' + err);
		}
	}

	const getPrice = (currentPrice, paymentTokenContract) => {
		const price = toUnitAmount(currentPrice, paymentTokenContract)
		return parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
	}

	const getPriceFromAsset = (sellOrder) => {
		if (!sellOrder || !sellOrder[0]) return null; // also check created_date and closing_date to see if active
		// or "expiration_time": 1628994402
		const price = toUnitAmount(sellOrder[0].base_price, sellOrder[0].payment_token_contract);
		return parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
	}

	const buildDetailUrl = (assetAddress, tokenId) => {
		console.log(" asset address " + assetAddress);
		return '/detail?asset_contract_address=' + assetAddress + '&token_id=' + tokenId;

	}

	const buyPressed = async (index) => {
    // check if a wallet exists, if not then go to wallet page
    const currentPrice = getPriceFromAsset(items[index].sell_orders);
    setSelectedPrice(currentPrice);
    setSelectedName(items[index].name);
    setSelectedIndex(index);
    
    const account = await connectWallet();
    if(account) {
      handleShow();
    }
	}

  const connectWallet = async () => {
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

	const listItems = items.map((item, index) =>


		<div class="product-card">
			<div class="product-image">
				<a href={buildDetailUrl(item.asset_contract.address, item.token_id)} ><img src={item.image_preview_url} /></a>
			</div>
			<div class="product-info">
				<h5><a href={buildDetailUrl(item.asset_contract.address, item.token_id)} >{item.name} </a></h5>
				

			
				{
					getPriceFromAsset(item.sell_orders) ?

						<button onClick={() => buyPressed(index)}>
							Buy Price: {getPriceFromAsset(item.sell_orders)} ETH
          </button>
						:
						<span></span>
				}
				<p />
				
			</div>
		</div>


	);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const placeBid = async (amount) => {  
    const index = selectedIndex;
    if(!seaport) {
      seaport = new OpenSeaPort(web3Provider, {
        networkName: Network.Rinkeby
      })
    }
    if(!seaport) {
      alert('seaport still null')
      return
    }
    const schemaName = items[index].asset_contract.schema_name;
    
    if(items[index].sell_orders[0].payment_token_contract.symbol === 'ETH') {
      alert('Only bids are supported now');
      return;
    }

    let account = await window.ethereum.selectedAddress;
    const currentPrice = getPriceFromAsset(items[index].sell_orders);
    
    if (amount != null) {
      
      const tokenAddress = items[index].asset_contract.address
			const tokenId = items[index].token_id;
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
        startAmount: amount,
      })
      alert('successful bid on item. Price: ' + amount + ' check the opensea link to view bid');
      }catch(e) {
        alert('error on buy:' + JSON.stringify(e.message));
        console.log(JSON.stringify(e.message));
      }
    }
  }

	return (
    

		<div class="collection">
      <BidModal 
        show={show} 
        handleClose={handleClose} 
        placeBid={placeBid} 
        price={selectedPrice} 
        name={selectedName}
      />
			<div>
			<img src={collectionBannerImage}  />
			
			<h3 class="post-title">{collectionName}</h3>	
			
			
			<img class="icon" src={collectionImage} align="left"/>
		
						{collectionDescription}
				
			</div>
			<div>
			<section class="products">
				{listItems}
			</section>
			</div>
		</div>
	)
}

export default Home