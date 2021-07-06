import Header from '../components/Header'
import Meta from '../components/Meta'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

const Detail = () => {
	// page content
	const pageTitle = 'Detail'
	const pageDescription = 'Welcome to Go! NFT Yourself'
	const params = new URLSearchParams(window.location.search);
	const asset_contract_address = params.get('asset_contract_address')
	const token_id = params.get('token_id')
	const [assetDetails, setAssetDetails] = useState([])

	useEffect(() => {
		var url = 'https://api.opensea.io/api/v1/asset/'+asset_contract_address + '/' + token_id;
		console.log(`fetching data + ${url}`)
		axios.get(url)
            .then(res => {
                setAssetDetails(res.data)
            })
}, [])

			
	

   
		return (
			<div>

				<h2>{assetDetails.name}</h2>
				

 
{assetDetails.description}

<img src={assetDetails.image_url}></img>

			</div>
		)
	}

export default Detail;
