// export default function Home() {
//     return <h1>Home</h1>
// }

import React from 'react';
import { useState } from 'react';
import { useBlockchain } from '../useBlockchain';
import {
  setAlert,
  setLoadingMessage
} from '../store/index';

// import GiftItem from '../assets/giftItems.jpg';
// import ProductManager from '../assets/productManager.jpg';
// import { setGlobalState, truncate, useGlobalState } from '../store/index';
// import Blockies from 'react-blockies';

const Participants = () => {
//   const openCreateNft = () => {
//     setGlobalState('modal', 'scale-100');
//   };

//   const [connectedAccount] = useGlobalState('connectedAccount');
//   const [account] = useGlobalState('account');
  const [rawMatAddress, setRawMatAddress] = useState('');
  const [manAddress, setManAddress] = useState('');
  const [disAddress, setDisAddress] = useState('');
  const [retAddress, setRetAddress] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const { addDistributer,
          addManfacturer,
          addRMS,
          addReTailer } = useBlockchain();


  const rawMatetrialHandleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingMessage('Intializing transaction...');
      
      const rawMatetrial = {rawMatAddress, title: name, location};
      
      if (!rawMatetrial) {
        console.error('No file provided for upload.');
        return;
      }

      
      await addRMS(rawMatetrial);
      
      // await registerProduct(nft);/// await addRMS(Title)

      resetForm();
      setAlert('Participants added completed...', 'green');
      // window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Participants added failed...', 'red');
    }

    console.log('Participants adding...');
    
  };


  const manufacturorHandleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingMessage('Intializing transaction...');
      

      const manufacturer = {manAddress, title: name, location};

      if (!manufacturer) {
        console.error('No file provided for upload.');
        return;
      }

      await addManfacturer(manufacturer);
      // await registerProduct(nft);/// await addMAN(Title)

      resetForm();
      setAlert('Participants added completed...', 'green');
      // window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Participants added failed...', 'red');
    }

    console.log('Participants adding...');
    
  };

  const distributerHandleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingMessage('Intializing transaction...');
      
      
      const distributer = {disAddress, title: name, location};

      if (!distributer) {
        console.error('No file provided for upload.');
        return;
      }

      await addDistributer(distributer);

      //await registerProduct(nft);/// await addDIS(Title)

      resetForm();
      setAlert('Participants added completed...', 'green');
      // window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Participants added failed...', 'red');
    }

    console.log('Participants adding...');
    closeModal();
  };

  const retailerHandleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoadingMessage('Intializing transaction...');
      
      const retailer = {retAddress, title: name, location};
      
      if (!retailer || !retailer.retAddress || !retailer.title || !retailer.location) {
        console.error('Invalid retailer data:', retailer);
        setAlert('Invalid retailer data provided.', 'red');
        return;
      }

      await addReTailer(retailer);

      //await registerProduct(nft);/// await addRAT(Title)

      resetForm();
      setAlert('Participants added completed...', 'green');
      // window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Participants added failed...', 'red');
    }

    console.log('Participants adding...');
    closeModal();
  };

  const resetForm = (e) => {
    setRawMatAddress('');
    setManAddress('');
    setDisAddress('');
    setRetAddress('');
    setName('');
    setLocation('');
  };


  return (
    <div className="flex w-4/5 justify-center items-center  mx-auto py-10 ">
      <div className="md:w-1/3 w-full">
      <h1 className="text-white text-5xl font-bold mt-12">
                Add Participants
              </h1>
      

              <h1 className="text-white text-2xl font-bold mt-12">
                Add Raw Material Supplier
              </h1>
      <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-12">
          
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Raw Material Supplier"
            name="Raw Material Supplier"
            onChange={(e) => setRawMatAddress(e.target.value)}
            value={rawMatAddress}
            required
          />

          
        
        </div>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
        <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Raw Material Supplier Name"
            name="Raw Material Supplier Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          </div>


          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Raw Material Supplier location"
            name="Raw Material Supplier location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
          />
          </div>

        <button
          type="submit"
          onClick={rawMatetrialHandleSubmit}
          className="flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 -pl-1 -pr-1 mt-5"
        >
          add supplier
        </button>

        <h1 className="text-white text-2xl font-bold mt-12">
                Add Manufacturer
              </h1>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-7">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Manufacturer"
            name="Manufacturer"
            onChange={(e) => setManAddress(e.target.value)}
            value={manAddress}
            required
          />
        
        </div>

        

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
        <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Manufacturer Name"
            name="Manufacturer Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          </div>


          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Manufacturer location"
            name="Manufacturer location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
          />
          </div>

          <button
          type="submit"
          onClick={manufacturorHandleSubmit}
          className="flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 -pl-1 -pr-1 mt-5"
        >
          add manufacturer
        </button>

        <h1 className="text-white text-2xl font-bold mt-12">
                Add Distributor
              </h1>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-7">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Distributor"
            name="Distributor"
            onChange={(e) => setDisAddress(e.target.value)}
            value={disAddress}
            required
          />
        
        </div>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
        <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Distributor Name"
            name="Distributor Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          </div>


          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Distributor location"
            name="Distributor location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
          />
          </div>

          <button
          type="submit"
          onClick={distributerHandleSubmit}
          className="flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 -pl-1 -pr-1 mt-5"
        >
          add distributor
        </button>

        <h1 className="text-white text-2xl font-bold mt-12">
                Add Retailer
              </h1>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-7">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Retailer"
            name="Retailer"
            onChange={(e) => setRetAddress(e.target.value)}
            value={retAddress}
            required
          />
        
        </div>

        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
        <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Retailer Name"
            name="Retailer Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          </div>


          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="text"
            className="block w-2/3 text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Retailer location"
            name="Retailer location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
          />
          </div>
          <button
          type="submit"
          onClick={retailerHandleSubmit}
          className="flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 -pl-1 -pr-1 mt-5"
        >
          add Retailer
        </button>
          
      </div>
      
    </div>
  );
};

export default Participants;
