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
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto">
				<img src={assetDetails.image_url}></img>
				{/* <img src="https://lh3.googleusercontent.com/Z_ApIlZUdb4VclOU4-Z8O7EkYCZZir4OXJqGYnuH3Wn9oyFlit-1Fsu_IqomX_stEfUHzs1lfr6rgUWxgTZ63F1kIZTVmzaF7t4-yg=w600"/> */}
			</div>
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto">
				<h2>{assetDetails.name}</h2>
				<div>{assetDetails.description}</div>
			</div>
		</div>
	)
}

export default Detail;
