import React from 'react';
import giftshop from './assets/giftShop.png';
import { ethers } from 'ethers';
import { useGlobalState, truncate } from './store';
import { useBlockchain } from './useBlockchain'; // Correct import for named export
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Header = () => {
    const [connectedAccount] = useGlobalState('connectedAccount');
    const { connectWallet, disconnectWallet } = useBlockchain();

    return (
        <div className="w-4/5 flex justify-between md:justify-center item-center py-4 mx-auto">
            {/* <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <CustomLink to="/" className="site-title">
                    <img className="w-32 cursor-pointer" src={giftshop} alt="Logo" />
                </CustomLink>
            </div> */}
            <ul className="md:flex-[0.4] text-white md:flex hidden justify-between items-center flex-initial">
                <CustomLink to="/addParticipant" className="mx-4 cursor-pointer">Participants</CustomLink>
                <CustomLink to="/product" className="mx-4 cursor-pointer">Explore</CustomLink>
                <CustomLink to="/addProduct" className="mx-4 cursor-pointer">Product</CustomLink>
                <CustomLink to="/addRawMaterial" className="mx-4 cursor-pointer">Raw material</CustomLink>
                {/* <CustomLink to="/addRawMaterial" className="mx-4 cursor-pointer">Raw material</CustomLink> */}
                <CustomLink to="/buyMaterial" className="mx-4 cursor-pointer">buy material</CustomLink>
                <CustomLink to="/buyFromDis" className="mx-4 cursor-pointer">buy distributer</CustomLink>
                <CustomLink to="/buyFromRet" className="mx-4 cursor-pointer">buy retailer</CustomLink>

            </ul>
            {connectedAccount ? (
                <div className="group relative">
                    <button className="shadow-xl shadow-black text-black bg-white hover:bg-slate-300 md:text-xs p-2 ml-2 rounded-full cursor-pointer">
                        <span className="group-hover:hidden">
                            {truncate(connectedAccount, 4, 4, 11)}
                        </span>
                        <span className="hidden group-hover:flex" onClick={disconnectWallet}>
                            Disconnect Wallet
                        </span>
                    </button>
                </div>
            ) : (
                <button className="shadow-xl shadow-black text-black bg-white hover:bg-slate-300 md:text-xs p-2 ml-2 rounded-full" onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default Header;
