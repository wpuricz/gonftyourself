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
