import Header from "../components/Header";
import Meta from "../components/Meta";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const WalletSelection = () => {
  // page content
  const pageTitle = "WalletSelection";
  const pageDescription = "Welcome to Go! NFT Yourself";

  const handleTorus = async () => {
    const torus = new Torus();
    await torus.init({
      network: {
        host: "rinkeby",
      },
      whiteLabel: {          
        theme: {            
        isDark: false,            
        colors: {              
          torusBrand1: "#00A5CF"
        },          
      },          
      logoDark: "https://uploads-ssl.webflow.com/60c67c74f40bc435b735a22b/60c7826d0457395749f44ef1_GNY%20logo.png", // Dark logo for light background          
      logoLight: "https://uploads-ssl.webflow.com/60c67c74f40bc435b735a22b/60c7826d0457395749f44ef1_GNY%20logo.png", // Light logo for dark background          
      topupHide: false,          
      featuredBillboardHide: true,          
      disclaimerHide: true,          
      defaultLanguage: "en",        },
    });
    await torus.login(); // await torus.ethereum.enable()
    const web3 = new Web3(torus.provider);
    await torus.initiateTopup();
  };
  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      <button className="btn btn-outline-primary">Metamask</button>
      <button className="btn btn-outline-primary" onClick={handleTorus}>
        Torus Wallet
      </button>
    </div>
  );
};

export default WalletSelection;
