import Header from "./Header"
// import Navbar from "./Navbar"
import Explore from "./pages/Explore"
import Participants from "./pages/Participants"
import RawMaterial from "./pages/RawMaterial"
import Products from "./pages/Products"
import { Route, Routes } from "react-router-dom"
import { useBlockchain } from './useBlockchain';
import { useEffect } from 'react';
import ShowDetails from "./pages/ShowDetails"
import ShowChain from "./pages/ShowChain"
import BuyFromMan from "./pages/BuyFromMan"
import BuyFromDis from "./pages/BuyFromDis"
import BuyFromRet from "./pages/BuyFromRet"

// import RawMaterial from "./pages/RawMaterial"

function App() {
  const { isWalletConnected, initializeContract, getAllNFT } =
    useBlockchain();

  useEffect(() => {
    const checkWalletConnection = async () => {
      await isWalletConnected();
    };

    checkWalletConnection();

    const checkinitializeContract = async () => {
      await initializeContract();
    };

    checkinitializeContract();

    const getAllProductNft = async () => {
      await getAllNFT();
    };
    getAllProductNft();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      
      <div class="gradient-bg-hero">
        <Header />
        
      </div>
      
      <div className="container">
        <div>
        <Routes>
          
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/addParticipant" element={<Participants />} />
          <Route path="/product" element={<Explore />} />
          <Route path="/addProduct" element={<Products />} />
          <Route path="/addRawMaterial" element={<RawMaterial />} />
          <Route path="/showDetails" element={<ShowDetails />} />
          <Route path="/buyMaterial" element={<BuyFromMan />} />
          <Route path="/buyFromDis" element={<BuyFromDis />} />
          <Route path="/buyFromRet" element={<BuyFromRet />} />
        </Routes>
        <ShowChain />
        </div>
      </div>
    </>
  )
}

export default App