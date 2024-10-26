import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import GiftItems from '../assets/giftItems.jpg';
import { create } from 'ipfs-http-client';
import { setGlobalState, useGlobalState, setAlert, setLoadingMessage } from '../store/index';
import { useBlockchain } from '../useBlockchain';
import axios from 'axios';

const pinataApiKey = 'bd453dd6988599e0af96';
const pinataSecretApiKey = '24ad34c84121903183b5c2337a9789d29e2401816c54ed70ac41200caf182b2d';

const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append('file', file);
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    });
    console.log('File uploaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

const RawMaterial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [fileUrl, setFileUrl] = useState();
  const [imgBase64, setImgBase64] = useState(null);
  const { registerRawMaterial } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' });

    if (!title || !description || !price) return;

    const result = await uploadToPinata(fileUrl);

    if (result && result.IpfsHash) {
      console.log('Uploaded file CID:', result.IpfsHash);
      const ipfs = result.IpfsHash;

      try {
        setLoadingMessage('Initializing transaction...');
        const priceInEther = ethers.utils.parseEther(price);
        const nft = { title, description, priceInEther, quantity, ipfs };

        await registerRawMaterial(nft);
        resetForm();
        setAlert('Minting completed...', 'green');
      } catch (error) {
        console.log('Error uploading file: ', error);
        setAlert('Minting failed...', 'red');
      }

      console.log('Minting...');
    } else {
      console.error('Failed to upload file to IPFS.');
      setAlert('Failed to upload file to IPFS.', 'red');
    }
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setFileUrl('');
    setQuantity('');
    setImgBase64(null);
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
        <div className="flex justify-center items-center rounded-xl mt-5">
          <div className="shrink-0 h-80 w-80 rounded-xl overflow-hidden">
            <img className="h-full w-full object-cover cursor-pointer" src={imgBase64 || GiftItems} alt="Nft image" />
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <label className="block">
            <span className="sr-only">Choose Profile Photo</span>
            <input
              type="file"
              accept="img/png, img/jpeg, img/gif,img/jpg,img/webp"
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4 file:rounded-full
              file:border-0 file:text-sm file:font-semibold
              hover:file:bg-[#1d2631] focus:outline-none
              cursor-pointer focus:ring-0"
              onChange={changeImage}
              required
            />
          </label>
        </div>
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="text"
            className="block w-full text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Title"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <textarea
            type="text"
            className="block w-full text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0 h-20 resize-none"
            placeholder="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        
        <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
          <input
            type="number"
            className="block w-full text-sm text-slate-500
              mr-4 py-2 px-4 focus:outline-none cursor-pointer
              focus:ring-0 bg-transparent border-0"
            placeholder="Quantity"
            min={1}
            step={1}
            name="Quantity"
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
          Mint Now
        </button>
      </form>
    </div>
  );
};

export default RawMaterial;
