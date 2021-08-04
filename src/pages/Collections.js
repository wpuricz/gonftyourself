import Header from '../components/Header'
import Meta from '../components/Meta'
import axios from 'axios';

import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL, toUnitAmount } from '../constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';


const Home = () => {
	// page content

	const [items, setItems] = useState([]);
	const [accountAddress, setAccountAddress] = useState([]);
	const [collectionName, setCollectionName] = useState([]);
	const [collectionBannerImage, setCollectionBannerImage] = useState([]);
	const [collectionFeatureImage, setCollectionFeatureImage] = useState([]);
	const [collectionImage, setCollectionImage] = useState([]);
	const [collectionDescription, setCollectionDescription] = useState([]);
	let seaport = null;

	useEffect(async () => {
		
		onChangeAddress();
	
		fetchList();
		
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

	

	const fetchList = async () => {
		const url = "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=5&collection=carbureted"
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

	

	const buildDetailUrl = (assetAddress, tokenId) => {
		console.log(" asset address " + assetAddress);
		return '/detail?asset_contract_address=' + assetAddress + '&token_id=' + tokenId;

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

	return (


		<div class="collection">
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