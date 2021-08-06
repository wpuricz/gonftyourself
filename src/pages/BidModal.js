import { useEffect, useState } from 'react';
import { Button, Modal, Form, CloseButton } from 'react-bootstrap'
//https://getbootstrap.com/docs/5.0/components/modal/
const BidModal = (props) => {
  
  const { handleClose, show, placeBid, price, name} = props;
  const [bid,setBid] = useState();
  const [screenId, setScreenId] = useState(0);
  
  const bidPressed = () => {
    setScreenId(1); // detect here if we should show the uniswap screen
    return;
    if(isNaN(bid)) {
        alert('please enter number')
    } else{
        handleClose();
        placeBid(bid);
    }
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


  return (
    <Modal
        show={show}
        onHide={handleClose}
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
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" onClick={bidPressed}>Place Bid</Button>
        </Modal.Footer>
    </Modal>
    
  )
}

export default BidModal