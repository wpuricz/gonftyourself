import axios from "axios";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  web3Provider,
  connectWallet,
  onNetworkUpdate,
  toUnitAmount,
} from "../utils/constants.js";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";
import * as Sea from "../services/Sea";
import CheckoutModal from "./CheckoutModal";
import Carousel from "../components/Carousel";
import * as Constants from "../utils/constants";
const Collections = () => {
  // page content
  const [collectionResponse, setCollectionResponse] = useState([]);
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
    //onChangeAddress();
    const collectionItems = Constants.COLLECTION_LIST;
    //'toabs','xarb-io','cryptopunk','projectnft','catnfttest5','youyan','ooplace-collections-v2',,'land-dao-2','rocktest-v3'];

    for (let i = 0; i < collectionItems.length; i++) {
      setTimeout(async function () {
        const res = await fetchList(collectionItems[i]);
      }, 1000);
    }

    console.log(collectionResponse);
    setCollectionResponse(collectionResponse);
  }, []);

  // const onChangeAddress = () => {
  //   //console.log('calling onChangeAddress')
  //   seaport = new OpenSeaPort(web3Provider, {
  //     networkName: Network.Rinkeby,
  //   });
  //   const web3 = seaport.web3;

  //   web3.eth.getAccounts((err, res) => {
  //     if (!err) {
  //       setAccountAddress(res[0]);
  //     }
  //   });
  // };

  // const buildDetailUrl = (assetAddress, tokenId) => {
  //   //console.log(" asset address " + assetAddress);
  //   return (
  //     "/detail?asset_contract_address=" + assetAddress + "&token_id=" + tokenId
  //   );
  // };
  const buildCollectionUrl = (collection) => {
    return "/collections?collection=" + collection;
  };

  const fetchList = async (collection) => {
    const url =
      "https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1&collection=" +
      collection;
    console.log("fetching data for " + collection);
    try {
      let response = await axios.get(url);
      let items = response.data.assets;
      setItems(items);
      collectionResponse.push(items);
      console.log("successfully fetched");
      setCollectionBannerImage(items[0].collection.banner_image_url);
      setCollectionFeatureImage(items[0].collection.featured_image);
      setCollectionImage(items[0].collection.image_url);
      setCollectionName(items[0].collection.name);
      setCollectionDescription(items[0].collection.description);
      //console.log(response.data.assets);
    } catch (err) {
      console.log("error fetching assets:" + err);
    }
  };

  const carouselItems = collectionResponse.map((subItems, sIndex) =>
    subItems.map((item, index) => (
      <div class="banner-carousel">
        <a href={buildCollectionUrl(item.collection.slug)}>
          {item.collection.name}
        </a>
        <a href={buildCollectionUrl(item.collection.slug)}>
          <img
            class="banner_image"
            src={item.collection.banner_image_url}
            alt=""
          />
        </a>
      </div>
    ))
  );

  return (
    <div>
      <Carousel show={3} infiniteLoop withIndicator>
        {carouselItems}
      </Carousel>
    </div>
  );
};

export default Collections;
