import { OpenSeaPort, Network } from "opensea-js";
import { web3Provider, OPENSEA_URL, COLLECTION_NAME } from "../utils/constants";
import axios from "axios";

let seaport = null;

export const fetchCollection = async () => {
  const url =
      `${OPENSEA_URL}/api/v1/assets?order_direction=desc&offset=0&limit=20&collection=${COLLECTION_NAME}`;
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
      await seaport.createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
          schemaName, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
        },
        accountAddress: account,
        // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
        startAmount: amount,
      });
      alert(
        "successful bid on item. Price: " +
          amount +
          " check the opensea link to view bid"
      ); // TOOD: Return success instead of alert
    } catch (e) {
      alert("error on buy:" + JSON.stringify(e.message));
      console.log(JSON.stringify(e.message)); // TODO: Throw error instead of alert
    }
  }
};

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
