import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { web3Provider, connectWallet, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL, toUnitAmount } from '../constants.js';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types';

import BidModal from './BidModal'

const Collections = () => {
	// page content

	const [items, setItems] = useState([]);
	const [collectionResponse, setCollectionResponse] = useState([]);
	const [accountAddress, setAccountAddress] = useState([]);
	

  let seaport = null;

	useEffect(async () => {
	
		onChangeAddress();
	const collectionItems = ['carbureted', 'nycmoments','jersey-shore'];
	for (let i = 0; i < collectionItems.length; i++) {
		console.log(collectionItems[i]);
  		fetchList(collectionItems[i]);
}

		
		
	}, [])
	function _getCollections(collectionItems) {
            let collectionResults = [];
            collectionItems.forEach( (collectionName) => {
	const url = "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=3&collection=" + collectionName
                    let u = $.getJSON(url)
                                     .done( (response) => { u =  response.data.assets; });
                    collectionResults.push(u);
            });
			let collectionResponse = collectionResults;
			setCollectionResponse(collectionResponse)	;
            return {collectionResponse: collectionResults};
    }

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

	const fetchList = async.queue ((collection, callback) => {
		const url = "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=3&collection=" + collection
		console.log('fetching data for '+ collection )
		try {
			let response =  axios.get(url);
			let items = response.data.assets;
			setItems(items);

			
			//console.log(response.data.assets);
		} catch (err) {
			//console.log('error fetching assets:' + err);
		}
	});

	

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