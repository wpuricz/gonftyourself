import { OpenSeaPort, Network } from "opensea-js";
import { web3Provider, OPENSEA_URL, COLLECTION_NAME } from "../utils/constants";
import axios from "axios";
import * as Constants from '../utils/constants'
import {collectionName} from '../pages/Home'

let seaport = null;


export const fetchCollection = async (collectionName) => {
	if(!collectionName){
		collectionName = {COLLECTION_NAME};
	}
	
	console.log(' collectin name ' + collectionName);
  const url =
      `${OPENSEA_URL}/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=${collectionName.COLLECTION_NAME}`;
    console.log("fetching data");
    try {
      let response = await axios.get(url);
      return response.data;
    }catch(error) {
      throw error;
    }
};
export const fetchAsset = async (assetContractAddress, tokenId) => {
  const url = `${OPENSEA_URL}/api/v1/asset/${assetContractAddress}/${tokenId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  }catch(error) {
    console.log('error fetching asset: ' + error);
    throw error;
  }

};

export const placeBid = async (amount, schemaName, tokenAddress, tokenId) => {
  if (!seaport) {
    seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Rinkeby, // TODO: Make Dynamic in build
    });
  }

  let account = await window.ethereum.selectedAddress; // TODO: is error handling required or can we guarantee this object is available

  if (amount != null) {
    try {
      const response = await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
          schemaName, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress: account,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: amount,
      });
      console.log(JSON.stringify(response));
      return;
    } catch (e) {
      console.log(`error status: ${e.status}`);
      console.log('error:' + JSON.stringify(e.message));
      if(e.message.includes('Buy order is not valid for auction')) {
        throw Error(Constants.ORDER_ERROR_BID_NOT_VALID);
      }else if(e.message.includes('Please cancel your higher bids first')) {
        throw Error(Constants.ORDER_ERROR_HIGHER_BID);
      }else if(e.message.includes('You declined to authorize your offer')) {
        throw Error('Cancelled');
      }
      else{
        throw Error(Constants.ORDER_ERROR_GENERAL);
      }
    }
  }
};

// Invalid Price - shouldn't happen if we validate
// General error - anything other than 400 or what we know about
// You already have a higher bid
// Insufficient Funds

// const getOrderData = async () => {
//   console.log("getting data");
//   const { orders, count } = await seaport.api.getOrders(
//     {
//       owner: OWNER,
//       side: OrderSide.Sell,
//     },
//     1
//   );
//   console.log(JSON.stringify(orders));
//   //this.setState({ orders, total: count })
//   setCollectionName(orders[0].asset.collection.name);
//   setCollectionDescription(orders[0].asset.collection.description);
//   setItems(orders);
// };
