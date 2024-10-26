import React, { useEffect,useState } from 'react';
import Blockies from 'react-blockies';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import { setGlobalState,useGlobalState, truncate, setLoadingMessage, setAlert } from '../store/index';
import { useBlockchain } from '../useBlockchain';

const ShowDetails = () => {
    const [connectedAccount] = useGlobalState('connectedAccount');
    const [account] = useGlobalState('account');
    const [nft] = useGlobalState('nft');
    const [amount, setAmount] = useState('');
    const { buyRawMaterial, fetchTransactionsSupplyChainOfProduct } = useBlockchain();
    const [transactionList] = useGlobalState('transactionList');
  const [end, setEnd] = useState(4);
  const [collection, setCollection] = useState([]);
  const [count] = useState(4);

  const getCollection = () => {
    return transactionList.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [transactionList, end]);

    const onChangePrice = () => {
        setGlobalState('nft', nft);
        setGlobalState('updateModal', 'scale-100');
    };

    const handlePurchase = async () => {
        try {
            const productTotalPrice = amount * nft?.cost;
            await buyRawMaterial({ id: nft?.id, quantity: amount, productTotalPrice: productTotalPrice });
            setAlert('Product Purchased...', 'green');
            window.location.reload();
        } catch (error) {
            console.log('Error updating file: ', error);
            setAlert('Purchase failed...', 'red');
        }
    };

   

    const ShowDetails = async () => {
        

        try {
            
            // const productId = ;
            await fetchTransactionsSupplyChainOfProduct({ product_Id: nft?.id});
            
            
            
        } catch (error) {
            console.log('Error updating file: ', error);
            setAlert('Purchase failed...', 'red');
        }
        // setGlobalState('nftList', nft);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-[#151c25] rounded-xl w-full h-auto p-6">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center text-gray-400">
                        <p className="font-semibold">NFT</p>
                    </div>
                    <div className="flex justify-center items-center rounded-xl mt-5">
                        <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden">
                            <img className="h-full w-full object-cover cursor-pointer" src={nft?.metadataURI} alt={nft?.metadataURI} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start rounded-xl mt-5">
                        <h4 className="text-white font-semibold">{nft?.Title}</h4>
                        <p className="text-gray-400 text-sm my-1">{nft?.description}</p>
                        <div className="flex justify-between items-center mt-3 text-white">
                            <div className="flex justify-start items-center">
                                <Blockies className="h-10 w-10 object-contain rounded-full mr-3" seed={account} size={10} />
                                <div className="flex flex-col justify-center items-center">
                                    <small>@Owner</small>
                                    <small className="text-blue-400">{truncate(account, 4, 4, 11)}</small>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <small className="text-xs">Current price</small>
                                <p className="text-sm font-semibold">{nft?.cost}</p>
                            </div>
                        </div>
                    </div>
                    {account.toLowerCase() === connectedAccount.toLowerCase() ? (
                        <button className="flex justify-center items-center shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white p-2 mt-5 w-full text-md hover:bg-blue-800 rounded-full" onClick={onChangePrice}>
                            Change price
                        </button>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
                                <input className="block w-full text-sm text-slate-500 mr-4 py-2 px-4 focus:outline-none cursor-pointer focus:ring-0 bg-transparent border-0" placeholder="amount" name="amount" onChange={(e) => setAmount(e.target.value)} value={amount} required />
                            </div>
                            
                            <button className="flex justify-center items-center shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white p-2 mt-5 w-full text-md hover:bg-blue-800 rounded-full" onClick={handlePurchase}>
                                Purchase
                            </button>
                           
                        </div>
                    )}
                <button className="flex justify-center items-center shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white p-2 mt-5 w-full text-md hover:bg-blue-800 rounded-full" onClick={ShowDetails}>
                                Show details
                </button>
                <div className="bg-[#151c25] gradient-bg-products">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {collection.length > 0 ? 'Product' : ''}
        </h4>
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6
         md:gap-4 lg:gap-3 py-2.5"
        >
          {collection.map((detail, i) => (
            <Card key={i} detail={detail} />
          ))}
        </div>
        <div className="text-center my-5">
          {collection.length > 0 && transactionList.length > collection.length ? (
            <button
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900
           text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5
           "
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          ) : null}
          {collection.length > 4 ? (
            <button
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900
         text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5
         "
              onClick={() => setEnd(4)}
            >
              Show less
            </button>
          ) : null}
        </div>
      </div>
    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ detail }) => {
    const setNFT = () => {
      setGlobalState('transaction', detail);
      setGlobalState('showModal', 'scale-100');
    };
  
    return (
      <div
        className="w-full shadow-xl shadow-slate-400 rounded-md overflow-hidden
    bg-gray-800 my-2 p-3"
      >
        
        <h4 className="text-white font-semibold">{detail.title}</h4>
        <p className="text-gray-400 text-sm my-1">{detail.description}</p>
        <div className="flex justify-between items-center mb-3 mt-5 text-white">
          <div className="flex flex-col">
            <small className="text-xs">Current Price</small>
            <p className="text-sm font-semibold">{detail.salePrice}</p>
          </div>
          <div className="flex flex-col">
            <small className="text-xs">Amount</small>
            <p className="text-sm font-semibold">{detail.quantity}</p>
          </div>
          <button
            className="shadow-lg shadow-black text-sm bg-white text-black
         hover:bg-slate-50 rounded-full px-1.5 py-1"
            onClick={setNFT}
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

export default ShowDetails;
