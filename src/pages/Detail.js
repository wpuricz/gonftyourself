import Header from '../components/Header'
import Meta from '../components/Meta'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

const Detail = (props) => {
	// page contents
	const pageTitle = 'Detail'
	const pageDescription = 'Welcome to Go! NFT Yourself'
	const params = new URLSearchParams(window.location.search);
	const asset_contract_address = params.get('asset_contract_address')
	const token_id = params.get('token_id')
	const [assetDetails, setAssetDetails] = useState([])
	const [paymentTokens,  setPaymentTokens] = useState([]);
	const imageSuffix = (window.screen.width > 1024) ? '=w600' : '';

	useEffect(() => {
		
		var url = 'https://rinkeby-api.opensea.io/api/v1/asset/'+asset_contract_address + '/' + token_id;
		console.log(`fetching data + ${url}`)
		axios.get(url)
            .then(res => {
                setAssetDetails(res.data);
				let paymentTokens = res.data.collection.payment_tokens;
				setPaymentTokens(paymentTokens);
				console.log(JSON.stringify(res.data.collection.payment_tokens))
            })
	}, [])

	
	const listPaymentTokens = paymentTokens.map((item, index) =>


		<div class="flex-table row" role="rowgroup">
  <div class="flex-row first" role="cell"><span class="flag-icon flag-icon-gb"></span> {item.id}</div>
  <div class="flex-row" role="cell">{item.symbol} </div>
  <div class="flex-row" role="cell">{item.decimal}.</div>
  <div class="flex-row" role="cell">{item.eth_price}</div>
</div>



	);

return (
		<div class="row">
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin detail-image-margin">
				<img src={assetDetails.image_url + imageSuffix}></img>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin">
				<h1 class="detail-bottom-margin">{assetDetails.name}</h1>
				<div>{assetDetails.description}</div>
				<div class="table-container" role="table" aria-label="Destinations">
  <div class="flex-table row" role="rowgroup">
  <div class="flex-row " role="cell">id</div>
  <div class="flex-row" role="cell">Symbol</div>
  <div class="flex-row" role="cell">Decimal</div>
  <div class="flex-row" role="cell">ETH Price</div>
</div>
{listPaymentTokens}
</div>
				
			</div>
		</div>
	)


}
export default Detail;
