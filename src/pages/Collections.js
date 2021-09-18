import { useEffect, useState } from "react";
import { web3Provider } from "../utils/constants.js";

import { OpenSeaPort, Network } from "opensea-js";
import * as Sea from "../services/Sea";



const Home = () => {
  const [items, setItems] = useState([]);
  const [accountAddress, setAccountAddress] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [collectionBannerImage, setCollectionBannerImage] = useState([]);
  const [collectionFeatureImage, setCollectionFeatureImage] = useState([]);
  const [collectionImage, setCollectionImage] = useState([]);
  const [collectionDescription, setCollectionDescription] = useState([]);

  let seaport = null;

  useEffect(() => {
    onChangeAddress();
    async function getList() {
      await fetchList();
      if (!accountAddress) {
        //await connectWallet();
      }
    }
    getList();
  }, []);

  const onChangeAddress = () => {
    console.log("calling onChangeAddress");
    seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Rinkeby,
    });
    const web3 = seaport.web3;

    web3.eth.getAccounts((err, res) => {
      if (!err) {
        setAccountAddress(res[0]);
      }
    });
  };

  const fetchList = async () => {
    try {
	  const params = new URLSearchParams(window.location.search);
console.log(params);
      let data = await Sea.fetchCollection(params.get('collection'));
      let items = data.assets;
      setItems(items);

      setCollectionBannerImage(items[0].collection.banner_image_url);
      setCollectionFeatureImage(items[0].collection.featured_image);
      setCollectionImage(items[0].collection.image_url);
      setCollectionName(items[0].collection.name);
      setCollectionDescription(items[0].collection.description);
      console.log(data.assets);
    } catch (error) {
      console.log("error getting collection:" + error);
      // display error to user here
    }
  };

  const buildDetailUrl = (assetAddress, tokenId) => {
    //console.log(" asset address " + assetAddress);
    return (
      "/detail?asset_contract_address=" + assetAddress + "&token_id=" + tokenId
    );
  };

  const listItems = items.map((item, index) => (
    <div className="product-card">
      <div className="product-image">
        <a href={buildDetailUrl(item.asset_contract.address, item.token_id)}>
          <img src={item.image_preview_url} alt="" />
        </a>
      </div>
      <div className="product-info">
        <h5>
          <a href={buildDetailUrl(item.asset_contract.address, item.token_id)}>
            {item.name}{" "}
          </a>
        </h5>

        <p />
      </div>
    </div>
  ));

  return (
    <div class="collection">
      <div class="header-wrapper">
        <div class="header-all-columns">
          <img src={collectionBannerImage} alt="" />
        </div>
        <div class="header-all-columns">
          <h3 class="post-title">{collectionName}</h3>
        </div>
        <div class="header-left">
          <img class="icon" src={collectionImage} align="left" alt="" />
        </div>
        <div class="header-right">
          <div class="text-with-line-breaks">{collectionDescription}</div>
        </div>
      </div>
      <div>
        <section class="products">{listItems}</section>
      </div>
    </div>
  );
};

export default Home;
