import React, { useState } from 'react';
import Blockies from 'react-blockies';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import GiftItems from '../assets/giftItems.jpg';
import {
  setGlobalState,
  useGlobalState,
  truncate,
  setLoadingMessage,
  setAlert
} from '../store/index';
import { useBlockchain } from '../useBlockchain';

const ShowChain = () => {
  const [modal] = useGlobalState('showModal');
//   const [connectedAccount] = useGlobalState('connectedAccount');
//   const [account] = useGlobalState('account');
  const [transaction] = useGlobalState('transaction');
//   const [amount, setAmount] = useState('');
  const { buyProduct } = useBlockchain();

  const onChangePrice = () => {
    setGlobalState('transaction', transaction);
    setGlobalState('showModal', 'scale-0');
    setGlobalState('updateModal', 'scale-100');
  };

  const handlePurchase = async () => {
    setLoadingMessage('Initiating purchase...');
    try {
      setLoadingMessage('Purchasing, awaiting MetaMask approval...');

      // const nftPriceInWei = ethers.utils.parseEther(transaction?.cost;
      const productTotalPrice = amount * transaction?.cost;

      console.log('productTotalPrice', productTotalPrice);
      console.log('Id: ', parseInt(transaction?.id));
      console.log('amount ', parseInt(amount));

      await buyProduct({
        id: transaction?.id,
        amount: amount,
        productTotalPrice: productTotalPrice
      });
      setAlert('Product Purchased...', 'green');
      window.location.reload();
    } catch (error) {
      console.log('Error updating file: ', error);
      setAlert('Purchase failed...', 'red');
    }
  };

  const closeModal = () => {
    setGlobalState('showModal', 'scale-0');
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black 
    bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div
        className="bg-[#151c25] shadow-xl shadow-slate-400
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <div className="flex flex-col ">
          <div className="flex justify-between items-center text-gray-400">
            
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-semibold">Title: {transaction?.title}</h4>
            <p className="text-gray-400 text-sm my-1">Description: {transaction?.description}</p>

            
              <div className="flex flex-col">
                <small className="text-gray-400 text-sm my-1">Current price: {transaction?.salePrice}</small>
              </div>
              <div className="flex flex-col">
                <small className="text-gray-400 text-sm my-1">Product Id: {transaction?.productId}</small>
              </div>
              <div className="flex flex-col">
                <small className="text-gray-400 text-sm my-1">Quantity: {transaction?.quantity}</small>
              </div>
              <div className="flex flex-col">
                <small className="text-gray-400 text-sm my-1">Production stage: {transaction?.stage}</small>
              </div>
              <div className="flex flex-col">
                <small className="text-gray-400 text-sm my-1">time stamp: {transaction?.timestamp}</small>
              </div>
            </div>
            <div className="flex justify-between items-start mt-3 text-white">
              
              <div className="flex justify-start items-start">
              <div className="flex flex-col justify-start rounded-xl mt-5">
              <div className="flex flex-row justify-center items-start">
                  <small className='mr-12 pr-10'>@Ownerr</small>
                  <small className="text-blue-400">
                    {transaction?.owner}
                  </small>
                </div>
                <div className="flex flex-row justify-center items-center">
                <small className='mr-5'>Raw Material supplier</small>
                  <small className="text-blue-400">
                    {transaction?.RMS}
                  </small>
                </div>
                <div className="flex flex-row justify-center items-center">
              <small className='mr-12 pr-6'>Manfacturor</small>
                  <small className="text-blue-400">
                    {transaction?.MAN}
                  </small>
                </div>
                <div className="flex flex-row justify-center items-center">
              <small className='mr-12 pr-8'>Distributor</small>
                  <small className="text-blue-400">
                    {transaction?.DIS}
                  </small>
                </div>
                <div className="flex flex-row justify-center items-center">
              <small className='mr-12 pr-12'>Retailer</small>
                  <small className="text-blue-400">
                    {transaction?.RET}
                  </small>
                </div>
                </div>
              </div>
              
          </div>

          
          {/* <div className="flex justify-between items-center space-x-2">
            

            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShowChain;
