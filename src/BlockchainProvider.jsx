import React, { createContext, useState } from 'react';
import ABI from './constrants/ABI.json';
import { ethers } from 'ethers';
import { setAlert, setGlobalState, useGlobalState } from './store';
import { WiDayCloudy } from 'react-icons/wi';

export const BlockchainContext = createContext();

const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  // const [connectedAccount] = useGlobalState('connectedAccount');
  // const [productTotalPrice] = useGlobalState('productTotalPrice');\
  const [connectedAccount] = useGlobalState('connectedAccount');

  // const [contractInstance1, setContractInstance1] = useState(null);

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
    const fetchTransactionsSupplyChainOfProduct = async ({product_Id}) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
  
      const Products = await contract.fetchTransactionsSupplyChainOfProduct(product_Id);

      setGlobalState('transactionList', structuredSaleProducts(Products));
  
      console.log(structuredSaleProducts(Products));
  
      return true;
    };
  //   fetchData();
  // }, [])
  

  const contractAddress = '0x4b731b1Ed50b81463fCc39A714A54381d4dA0d54';

  const initializeContract = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContractInstance(contract);

        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('ContractInstance', contractInstance);
        console.log('Contract initialized successfully');
        return true;
      } catch (error) {
        console.error('Error in initializing contract', error);
        return false;
      }
    } else {
      console.log("Ethereum object doesn't exist");
      return false;
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined')
        reportError('Please install MetaMask');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setGlobalState('connectedAccount', accounts[0].toLowerCase());
      window.location.reload();
    } catch (error) {
      reportError(error);
    }
  };

  // const mintNFT = async (metadataURI) => {
  //   try {
  //     const nftUri = `https://ipfs.io/ipfs/${metadataURI}`;
  //     console.log('Metadata URI:', nftUri);
  //     if (!nftUri || nftUri.length === 0) {
  //       throw new Error('Invalid metadataURI');
  //     }

  //     const initialized = await initializeContract();
  //     if (!initialized) {
  //       throw new Error('Contract initialization failed');
  //     } else {
  //       console.log('Provider:', provider);
  //       console.log('Signer:', signer);
  //       console.log('Contract Instance:', contractInstance);

  //       if (!contractInstance || !provider || !signer) {
  //         throw new Error('Contract instance, provider, or signer is not set');
  //       }

  //       const account = await signer.getAddress();
  //       const tx = await contractInstance.safeMint(account, nftUri);

  //       await tx.wait();
  //       console.log('NFT minted successfully!');
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error('Error minting NFT:', error);
  //     return false;
  //   }
  // };
  const addRMS = async ({
    rawMatAddress, title, location
  }) => {
    try {
      

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        

        // const account = await signer.getAddress();
        const addParticipant = await contractInstance.addRMS(
          rawMatAddress,
          title,
          location
        );

        await addParticipant.wait();
        console.log('Participants added successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error adding participants:', error);
      return false;
    }
  }

  const addManfacturer = async ({
    manAddress, title, location
  }) => {
    try {
      

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        

        // const account = await signer.getAddress();
        const addParticipant = await contractInstance.addManufacturer(
          manAddress,
          title,
          location
        );

        await addParticipant.wait();
        console.log('Participants added successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error adding participants:', error);
      return false;
    }
  }

  const addDistributer = async ({
    disAddress, title, location
  }) => {
    try {
      

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        

        // const account = await signer.getAddress();
        const addParticipant = await contractInstance.addDistributor(
          disAddress,
          title,
          location
        );

        await addParticipant.wait();
        console.log('Participants added successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error adding participants:', error);
      return false;
    }
  }

  const addReTailer = async ({
    retAddress, title, location
  }) => {
    try {
      

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        

        // const account = await signer.getAddress();
        const addParticipant = await contractInstance.addRetailer(
          retAddress,
          title,
          location
        );

        await addParticipant.wait();
        console.log('Participants added successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error adding participants:', error);
      return false;
    }
  }

  const registerRawMaterial = async ({
    title,
    description,
    priceInEther,
    quantity,
    ipfs
  }) => {
    try {
      const nftUri = `https://ipfs.io/ipfs/${ipfs}`;
      console.log('Metadata URI:', nftUri);

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        console.log('Product Title: ', title);
        console.log('description: ', description);
        console.log('price: ', priceInEther);
        console.log('quantity: ', quantity);

        // const account = await signer.getAddress();
        const addRawMaterial = await contractInstance.addRM(
          title,
          priceInEther,
          description,
          quantity,
          nftUri
        );

        await addRawMaterial.wait();
        console.log('NFT minted successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      return false;
    }
  };

  

  const getAllNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const nft = await contract.getAllProduct();
    
    setGlobalState('nftList', structuredNfts(nft));
    

    // console.log(structuredSaleProducts(Products));
    console.log(structuredNfts(nft));

    return true;
  };

  

  const getUserNfts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.signer();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const userNfts = await contract.getNftOfUsers(connectedAccount); //getNftOfUsers("Must put address")
    console.log('NFTs:', userNfts);
    await userNfts.wait();
  };

  const structuredNfts = (nfts) => {
    return nfts
      .map((nft) => {
        return {
          id: Number(nft.product_Id),
          Title: nft.product_Title,
          cost: ethers.utils.formatEther(nft.price),
          description: nft.desc,
          category: nft.category,
          quantity: parseInt(nft.quantity),
          metadataURI: nft.nftUrl,
          stage: nft.stage,
          sold: nft.sold
        };
      })
      .reverse();
  };

  const structuredSaleProducts = (nfts) => {
    return nfts
      .map((nft) => {
        return {
          productId: Number(nft.id),
          owner: nft.owner.toString(),
          RMS: nft.RMS.toString(),
          MAN: nft.MAN.toString(),
          DIS: nft.DIS.toString(),
          RET: nft.DIS.toString(),
          salePrice: ethers.utils.formatEther(nft.salePrice),
          title: nft.title,
          
          description: nft.description,
          quantity: nft.quantity.toString(),
          stage: nft.stage,
          timestamp: nft.timestamp.toString()
        };
      })
      .reverse();
  };

  const disconnectWallet = async () => {
    setGlobalState('connectedAccount', '');
    setContractInstance(null);
  };

  

  

  const buyRawMaterial = async ({ id, quantity, productTotalPrice }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
    try {
      

      const buyRequiredProduct = await contract.buyTokenFromRM(id, quantity, {
        value: ethers.utils.parseEther(productTotalPrice.toString())
      });

      await buyRequiredProduct.wait();
    } catch (error) {
      reportError(error);
    }
  };

//   const buyFromMan = async ({ id, quantity, productTotalPrice }) => {
//     if (typeof window.ethereum === 'undefined') {
//         throw new Error('No Ethereum Object');
//     }

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, ABI, signer);

//     try {
//         const transaction = await contract.buyTokenFromMAN(id, quantity, {
//             value: productTotalPrice
//         });
//         await transaction.wait();
//         console.log('Purchase completed successfully');
//     } catch (error) {
//         console.error('Error processing transaction:', error.message);
//         throw error;
//     }
// };


  const buyFromMan = async ({ id, quantity, productTotalPrice }) => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No Ethereum Object');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      

      const buyRequiredProduct = await contract.buyTokenFromMAN(id, quantity, {
        value: ethers.utils.parseEther(productTotalPrice.toString())
      });

      await buyRequiredProduct.wait();
    } catch (error) {
      reportError(error);
    }
  };

  const buyFromDis = async ({ id, quantity, productTotalPrice }) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const buyRequiredProduct = await contract.buyTokenFromDis(id, quantity, {
        value: ethers.utils.parseEther(productTotalPrice.toString())
      });

      await buyRequiredProduct.wait();
    } catch (error) {
      reportError(error);
    }
  };

  const buyFromRet = async ({ id, quantity, productTotalPrice }) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const buyRequiredProduct = await contract.buyTokenFromRet(id, quantity, {
        value: ethers.utils.parseEther(productTotalPrice.toString())
      });

      await buyRequiredProduct.wait();
    } catch (error) {
      reportError(error);
    }
  };

  // const buyProduct = async ({ id, quantity, productTotalPrice }) => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, ABI, signer);

  //     const buyRequiredProduct = await contract.buyProduct(id, quantity, {
  //       value: ethers.utils.parseEther(productTotalPrice.toString())
  //     });

  //     await buyRequiredProduct.wait();
  //   } catch (error) {
  //     reportError(error);
  //   }
  // };

  const isWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert('MetaMask not found');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });

      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase() || '');
        await isWalletConnected();
      });

      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0].toLowerCase());
        // window.location.reload();
      } else {
        alert('Please connect wallet');
        console.log('No account found');
      }
    } catch (error) {}
  };

  const reportError = (error) => {
    setAlert(JSON.stringify(error), 'red');
    console.error('Error :', error);
    throw new Error('No Ethereum Object');
  };

  return (
    <BlockchainContext.Provider
      value={{
        provider,
        signer,
        contractInstance,
        initializeContract,
        connectWallet,
        disconnectWallet,
        
        getAllNFT,
        isWalletConnected,
       
        
        buyRawMaterial,
        buyFromDis,
        buyFromMan,
        buyFromRet,
        getUserNfts,
        addDistributer,
        addManfacturer,
        addRMS,
        addReTailer,
        registerRawMaterial,
        fetchTransactionsSupplyChainOfProduct
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
