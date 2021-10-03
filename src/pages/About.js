import Header from '../components/Header'
import Meta from '../components/Meta'

const About = () => {
  // page content
  const pageTitle = 'About'
  const pageDescription = 'Welcome to Go! NFT Yourself'

  return (
    <div>
      <Meta title={pageTitle}/>
      <Header head={pageTitle} description={pageDescription} />
      
      {/* <iframe
        src="https://app.uniswap.org/#/swap?outputCurrency=0xc778417E063141139Fce010982780140Aa0cD5Ab&inputCurrency=ETH&exactAmount=0.1"
        height="660px"
        width="100%"
        style={{'borderRadius':10 }}
        id="myId"
      />

      <iframe
        src="https://widget.onramper.com?color=346eeb&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
        height="595px"
        width="440px"
        title="Onramper widget"
        frameborder="0"
        allow="accelerometer;
        autoplay; camera; gyroscope; payment"
        
      >
        <a href="https://widget.onramper.com" target="_blank">Buy crypto</a> 
      </iframe> */}
      <iframe
        title="wert-id"
        src="https://sandbox.wert.io/01FC5PKC47FN6PX0MEGTVDJKP6/widget?containerId=wert-widget&commodities=ETH"
        height="660px"
        width="700px"
        
        
      />
    </div>
  )
}

export default About