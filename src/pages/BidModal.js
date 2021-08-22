import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'
import { getWethBalance } from '../utils/Wallet';
import * as Sea from '../services/Sea'

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
        console.log(`bid:${bid}, schema:${schema}, contract:${assetContractAddress}, token:${tokenId}`);
        await Sea.placeBid(bid, schema, assetContractAddress, tokenId);
        closeModal();
      }

    }else{  // screen === 1
      await Sea.placeBid(bid, schema, assetContractAddress, tokenId);
      closeModal();
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
        title="uniswap"
        src="https://app.uniswap.org/#/swap?outputCurrency=0xc778417E063141139Fce010982780140Aa0cD5Ab&inputCurrency=ETH&exactAmount=0.1"
        height="660px"
        width="100%"
        style={{'borderRadius':10 }}
        id="myId"
      />
    )
  }

  return (
    <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header>
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