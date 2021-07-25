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
	const imageSuffix = (window.screen.width > 1024) ? '=w600' : '';

	useEffect(() => {
		
		var url = 'https://rinkeby-api.opensea.io/api/v1/asset/'+asset_contract_address + '/' + token_id;
		console.log(`fetching data + ${url}`)
		axios.get(url)
            .then(res => {
                setAssetDetails(res.data)
            })
	}, [])

	return (
		<div class="row">
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin detail-image-margin">
				<img src={assetDetails.image_url + imageSuffix}></img>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin">
				<h1 class="detail-bottom-margin">{assetDetails.name}</h1>
				<div>{assetDetails.description}</div>
			</div>
		</div>
	)
}

export default Detail;
