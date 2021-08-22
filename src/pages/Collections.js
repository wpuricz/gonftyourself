import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, toUnitAmount } from '../utils/constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';

import BidModal from './BidModal'

const Collections = () => {
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
	
		onChangeAddress();
	const collectionItems = ['carbureted', 'nycmoments','jersey-shore'];
	for (let i = 0; i < collectionItems.length; i++) {
		console.log(collectionItems[i]);
  		fetchList(collectionItems[i]);
}

		
		
	}, [])

	const onChangeAddress = () => {
		//console.log('calling onChangeAddress')
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

	const buildDetailUrl = (assetAddress, tokenId) => {
		//console.log(" asset address " + assetAddress);
		return '/detail?asset_contract_address=' + assetAddress + '&token_id=' + tokenId;

	}

	const fetchList = async (collection) => {
		const url = "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=3&collection=" + collection
		console.log('fetching data for '+ collection )
		try {
			let response = await axios.get(url);
			let items = response.data.assets;
			setItems(items);

			setCollectionBannerImage(items[0].collection.banner_image_url);
			setCollectionFeatureImage(items[0].collection.featured_image);
			setCollectionImage(items[0].collection.image_url);
			setCollectionName(items[0].collection.name);
			setCollectionDescription(items[0].collection.description);
			//console.log(response.data.assets);
		} catch (err) {
			//console.log('error fetching assets:' + err);
		}
	}

	

	const listItems = items.map((item, index) =>


		<div class="product-card">
			<div class="product-image">
				<a href={buildDetailUrl(item.asset_contract.address, item.token_id)} ><img src={item.image_preview_url} /></a>
			</div>
			<div class="product-info">
				<h5><a href={buildDetailUrl(item.asset_contract.address, item.token_id)} >{item.name} </a></h5>
				

			
				<p />
				
			</div>
		</div>


	);

  
	return (
    

		<div class="collection">
     
			
			<div>
			<section class="products">
				{listItems}
			</section>
			</div>
		</div>
	)
}

export default Collections