import React from "react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import moment from "moment";
import '../styles/detail.css'
import { connectWallet } from "../utils/Wallet";
import CheckoutModal from "./CheckoutModal";
import * as Utils from "../utils/Utils";
import * as Sea from "../services/Sea"; 
import { useHistory } from "react-router-dom";

const LONG_DATE_FORMAT = "dddd, MMMM Do, YYYY, h:mm:ss a";

const Detail = (props) => {
  const params = new URLSearchParams(window.location.search);
  const asset_contract_address = params.get("asset_contract_address");
  const token_id = params.get("token_id");
  const imageSuffix = window.screen.width > 1024 ? "=w600" : "";
  let history = useHistory();

  const [assetDetails, setAssetDetails] = useState([]);
  const [properties, setProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [schema, setSchema] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await Sea.fetchAsset(asset_contract_address, token_id);
      setAssetDetails(data);
      //console.log(JSON.stringify(assetDetails));
      let properties = data.traits;
      setProperties(properties);
      setSchema(data.asset_contract.schema_name);
    }
    fetchData();
  }, []);

  const listProperties = properties.map((item, index) => (
    <div>
      <div>
        <span className="flag-icon flag-icon-gb"></span> {item.trait_type}:{" "}
        {item.value}
      </div>
    </div>
  ));

  // Buy button event and modal show/close handlers
  const buyPressed = async () => {
    // TODO: check if a wallet exists, if not then go to wallet page
    
    if(window.ethereum) {
      console.log('wallet exists')
      let account = await window.ethereum.selectedAddress;
      if(account) {
        console.log('wallet connected')
      }else{
        console.log('wallet is not connected')
        history.push('/walletSelection')
      }
    }else{
      console.log('wallet does not exist');
      history.push('/walletSelection')
    }
    return;
    // if (assetDetails.orders[0].payment_token_contract.symbol === "ETH") {
    //   alert("Only bids are supported now");
    //   return;
    // }
    // const currentPrice = Utils.getMaxBidFromOrder(assetDetails.orders, 0);
    // setSelectedPrice(currentPrice);
    // setSelectedName(assetDetails.name);
    // const account = await connectWallet();
    // if (account) {
    //   handleShow();
    // }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div class="detail-page-wrapper">
      <CheckoutModal
        show={show}
        handleClose={handleClose}
        price={selectedPrice}
        name={selectedName}
        assetContractAddress={asset_contract_address}
        tokenId={token_id}
        schema={schema}
      />

     <div>
				<img width="100%" src={assetDetails.image_url + imageSuffix} alt=""></img>
			</div>
			<div>
				<h1 class="detail-bottom-margin">{assetDetails.name}</h1>
				<h4 class="detail-bottom-margin">Creator {assetDetails.creator && assetDetails.creator.user ? assetDetails.creator.user.username: ''}    Owner {assetDetails.owner && assetDetails.owner.user ? assetDetails.owner.user.username : ''}</h4>
				<div class="text-with-line-breaks">{assetDetails.description}</div><br/>
				<div align="left"><h2>Properties</h2></div>
				
{listProperties}

				
        <div className="sale-ends">
          {assetDetails.orders &&
          assetDetails.orders[0] &&
          assetDetails.orders[0].closing_date
            ? "Sale ends: " +
              moment(assetDetails.orders[0].closing_date).format(
                LONG_DATE_FORMAT
              )
            : ""}
        </div>
        <div className="sale-ends">
          {assetDetails.orders && assetDetails.orders[0]
            ? "Highest Bid: " +
              Utils.getMaxBidFromOrder(assetDetails.orders, 0) +
              " ETH"
            : ""}
        </div>
        <div className="sale-ends">
          {assetDetails.orders && assetDetails.orders[0]
            ? "Min Bid: " +
              Utils.getMaxBidFromOrder(assetDetails.orders, 1) +
              " ETH"
            : ""}
        </div>
        {Utils.getPriceFromAsset(assetDetails.orders) ? (
          <Button onClick={() => buyPressed()}>
            Bid Price: {Utils.getMaxBidFromOrder(assetDetails.orders, 0)} ETH
          </Button>
        ) : (
          <span></span>
        )}
			</div>
		
      </div>
    
    
  );
};
export default Detail;
