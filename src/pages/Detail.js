import Header from "../components/Header";
import Meta from "../components/Meta";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { toUnitAmount, OPENSEA_URL, getPriceFromAsset, connectWallet } from "../constants";
import BidModal from "./BidModal";

const LONG_DATE_FORMAT = "dddd, MMMM Do, YYYY, h:mm:ss a";

const Detail = (props) => {
  // page contents
  const params = new URLSearchParams(window.location.search);
  const asset_contract_address = params.get("asset_contract_address");
  const token_id = params.get("token_id");
  const [assetDetails, setAssetDetails] = useState([]);
  const [properties, setProperties] = useState([]);
  const imageSuffix = window.screen.width > 1024 ? "=w600" : "";
  const [show, setShow] = useState(false);
  
  const [selectedName, setSelectedName] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  // last_sale
  // top_bid - done
  // min_price is price
  // auction end date - done
  useEffect(() => {
    var url = `${OPENSEA_URL}/api/v1/asset/${asset_contract_address}/${token_id}`;
    
    axios.get(url).then((res) => {
      setAssetDetails(res.data);
      console.log(JSON.stringify(assetDetails));
      let properties = res.data.traits;
      setProperties(properties);
    });
  }, []);

  const listProperties = properties.map((item, index) => (
    <div>
      <div>
        <span class="flag-icon flag-icon-gb"></span> {item.trait_type}:{" "}
        {item.value}
      </div>
    </div>
  ));

  const getMaxBid = (orders, minMax) => {
    const prices = orders.map((order) => order.base_price);
    const bid = minMax === 0 ? Math.max(...prices) : Math.min(...prices);
    const price = toUnitAmount(bid, orders[0].payment_token_contract);
    return parseFloat(price).toLocaleString(undefined, {
      minimumSignificantDigits: 1,
    });
  };

  // Buy button event and modal show/close handlers
  const buyPressed = async () => {
    // check if a wallet exists, if not then go to wallet page
    const currentPrice = getPriceFromAsset(assetDetails.orders);
    setSelectedPrice(currentPrice);
    setSelectedName(assetDetails.name);
    //setSelectedIndex(index);

    const account = await connectWallet();
    if (account) {
      handleShow();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div class="row">
      <BidModal
        show={show}
        handleClose={handleClose}
        price={selectedPrice}
        name={selectedName}
        assetContractAddress={asset_contract_address}
        tokenId={token_id}
        schema={assetDetails.schema_name}
      />
      <div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin detail-image-margin">
        <img src={assetDetails.image_url + imageSuffix}></img>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-8 col-sm-12 mx-auto detail-bottom-margin">
        <h1 class="detail-bottom-margin">{assetDetails.name}</h1>
        <h4 class="detail-bottom-margin">
          Creator{" "}
          {assetDetails.creator && assetDetails.creator.user
            ? assetDetails.creator.user.username
            : ""}{" "}
          Owner{" "}
          {assetDetails.owner && assetDetails.owner.user
            ? assetDetails.owner.user.username
            : ""}
        </h4>
        <div>{assetDetails.description}</div>
        <br />
        <div align="left">
          <h2>Properties</h2>
        </div>

        {listProperties}
        <br/>
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
            ? "Highest Bid: " + getMaxBid(assetDetails.orders, 0) + " ETH"
            : ""}
        </div>
        <div className="sale-ends">
          {assetDetails.orders && assetDetails.orders[0]
            ? "Min Bid: " + getMaxBid(assetDetails.orders, 1) + " ETH"
            : ""}
        </div>
        {getPriceFromAsset(assetDetails.orders) ? (
          <Button onClick={() => buyPressed()}>
            Buy Price: {getPriceFromAsset(assetDetails.orders)} ETH
          </Button>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
export default Detail;
