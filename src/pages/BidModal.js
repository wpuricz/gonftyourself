import { useState } from 'react';
import { Button, Modal, Form, CloseButton } from 'react-bootstrap'
import { getWethBalance, web3Provider } from '../constants';
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";

const BidModal = (props) => {
  
  const { handleClose, show, price, name, assetContractAddress, tokenId, schema} = props;
  const [bid,setBid] = useState();
  const [screenId, setScreenId] = useState(0);
  
  const bidPressed = async () => {
    
    if(screenId ===0 ) {
      
      if(isNaN(bid)) {
        alert('please enter number')
      }
      const wethBalance = await getWethBalance();
      console.log('weth bal:' + wethBalance);
      if(wethBalance < bid) {
        setScreenId(1); // detect here if we should show the uniswap screen
      }else{
        closeModal();
        await placeBid(bid);
      }

    }else{  // screen === 1
      closeModal();
      await placeBid(bid);
    }
  }

  const closeModal = () => {
    setScreenId(0);
    handleClose();
  }

  const formComponent = () => {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Bid Price</Form.Label>
            <Form.Control type="text" placeholder={price} value={bid} onChange={e => setBid(e.target.value)} />
            <Form.Text className="text-muted">
            Enter bid for { name }
            </Form.Text>
        </Form.Group>
        </Form>
    )
  }

  const uniswapComponent = () => {
    return (
      <iframe
        src="https://app.uniswap.org/#/swap?outputCurrency=0xc778417E063141139Fce010982780140Aa0cD5Ab&inputCurrency=ETH&exactAmount=0.1"
        height="660px"
        width="100%"
        style={{'borderRadius':10 }}
        id="myId"
      />
    )
  }
  // schema name
  // seaport
  // web3
  // orders or sell orders
  // asset_contract address
  // token id
  // 
  const placeBid = async (amount) => {
    let seaport = null;
    if (!seaport) {
      seaport = new OpenSeaPort(web3Provider, {
        networkName: Network.Rinkeby,
      });
    }
    if (!seaport) {
      alert("seaport still null");
      return;
    }
    const schemaName = items[index].asset_contract.schema_name;

    if (items[index].sell_orders[0].payment_token_contract.symbol === "ETH") {
      alert("Only bids are supported now");
      return;
    }

    let account = await window.ethereum.selectedAddress;
    const currentPrice = getPriceFromAsset(items[index].sell_orders);

    if (amount != null) {
      const tokenAddress = items[index].asset_contract.address;
      const tokenId = items[index].token_id;
      if (!seaport) {
        alert("seaport null");
        return;
      }
      let offer;
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
        );
      } catch (e) {
        alert("error on buy:" + JSON.stringify(e.message));
        console.log(JSON.stringify(e.message));
      }
    }
  };


  return (
    <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
          <Modal.Title>Place Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {screenId === 0 ? formComponent() : uniswapComponent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={bidPressed}>Place Bid</Button>
        </Modal.Footer>
    </Modal>
    
  )
}

export default BidModal