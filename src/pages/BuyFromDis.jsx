import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import GiftItems from '../assets/giftItems.jpg';
import { create } from 'ipfs-http-client';
import { setGlobalState, useGlobalState, setAlert, setLoadingMessage } from '../store/index';
import { useBlockchain } from '../useBlockchain';
import axios from 'axios';



const BuyFromDis = () => {
  const [productId, setProductId] = useState('');
  const [nft] = useGlobalState('nft');
  const [quantity, setQuantity] = useState('');
  const { buyFromDis } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!productId || !quantity) return;

    

    
     
      try {
        setLoadingMessage('Initializing transaction...');
        // const priceInEther = ethers.utils.parseEther(quantity);
        const productTotalPrice = amount * nft?.cost;
        const nft = { id: productId, quantity, productTotalPrice};

        await buyFromDis(nft);
        resetForm();
        setAlert('Buying completed...', 'green');
      } catch (error) {
        console.log('Error uploading file: ', error);
        setAlert('Buying failed...', 'red');
      }

      console.log('Buying...');
    
  };


  const resetForm = () => {
    setProductId('');
    setDescription('');
    setQuantity('');
  };

  return (
    <div className="bg-[#151c25] rounded-xl w-11/12 md:w-2/5 h-auto p-6 mx-auto mt-10">
      <form className="flex flex-col">
        {/* <div className="flex justify-between items-center text-gray-400">
          <p className="font-semibold">Add NFT</p>
          <button type="button" onClick={resetForm} className="border-0 bg-transparent focus:outline-none">
            <FaTimes />
          </button>
        </div> */}
        
        
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="number"
            className="block w-full text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Title"
            name="Title"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            required
          />
        </div>
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="number"
            className="block w-full text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Price (ETH)"
            min={0.01}
            step={0.01}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            required
          />
        </div>
        
        
        
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 pl-3 pr-3 mt-5 my-5"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default BuyFromDis;
