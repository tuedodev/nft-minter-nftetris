import {useState} from 'react'
import { ethers, Signer } from "ethers";
import { getEthersNetwork, promiseWrapper } from '../lib/helper';
import { Provider } from '@ethersproject/providers';

interface EthereumProvider {
  request(arg0: { method: string; });
  isMetaMask?: boolean;
}

interface Window {
  ethereum?: EthereumProvider;
}

export function checkIsMetaMaskInstalled(): boolean{
        let ethereum = null;
        if (typeof (window as Window) !== 'undefined'){
            ethereum = (window as Window).ethereum;
        }
        const isInstalled = ethereum && ethereum.isMetaMask ? true : false;
    return isInstalled;
}

export function connectWithMetaMask(){
    return new Promise(async (resolve, reject) => {
        if (checkIsMetaMaskInstalled){
            try {
                const ethereum = (window as Window).ethereum;
                const acc = await ethereum.request({ method: "eth_requestAccounts" });
                resolve("Website successfully connected to MetaMask");
            } catch (error) {
                reject("Connection to MetaMask rejected.");
            }

        } else {
            reject("MetaMask is not installed on this browser");
        }

    })
}

export const useWeb3 = () => {
    
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean | null>(checkIsMetaMaskInstalled());
    const [metaMaskData, setMetaMaskData] = useState<Record<string, any> | null>({
                metaMaskChainId: null,
                metaMaskName: null,
                metaMaskFullName: null
                });

    function getMetaMaskData(){
            let metaMaskObject: Record<string, any> = {
                isMetaMaskInstalled: false,
                metaMaskChainId: null,
                metaMaskName: null,
                metaMaskFullName: null,
                signer: null,
                signerChainId: null,
                signerAddress: null,
                signerBalance: null,
                signerBalanceInEth: null,
                isUnlocked: null,
            };
            return new Promise(async(resolve, _)=>{
                try{
                    if (checkIsMetaMaskInstalled()){
                        const ethereum = (window as Window).ethereum;
                        const provider = new ethers.providers.Web3Provider(ethereum);
                        const network = await provider.getNetwork();
                        const signer = provider.getSigner();
                        const signerChainId:number = await signer.getChainId();
                        const networkName = network.name;
                        metaMaskObject = {isMetaMaskInstalled: true, networkChainId: network.chainId, networkName, networkFullName: getEthersNetwork(networkName), signerChainId};
                        /** see issue regarding MetaMask prompt: https://github.com/MetaMask/metamask-extension/issues/10085 */
                        let signerAddress, isUnlocked;
                        try{
                            signerAddress = await signer.getAddress();
                            isUnlocked = true;
                        } catch{
                            // No address provided => probably unlocked
                            isUnlocked = false;
                        }
                        if (isUnlocked){
                            const [signerBalanceBigNumber, ] = await promiseWrapper(provider.getBalance(signerAddress));
                            const signerBalance =  signerBalanceBigNumber.toString();
                            const signerBalanceInEth = ethers.utils.formatEther(signerBalance);
                            metaMaskObject = { ...metaMaskObject, signer, signerAddress, signerBalance, signerBalanceInEth, isUnlocked };
                        } else {
                            metaMaskObject = {...metaMaskObject, warning: 'Account seems to be locked. Please unlock your account and connect this site with MetaMask.'};
                        }
                        metaMaskObject = { ...metaMaskObject, isUnlocked };
                    }
                    
                } catch (err: any){
                    metaMaskObject = {...metaMaskObject, errorObj: err};
                }
                resolve(metaMaskObject);
            })
        }

    function updateStatus(){
        setIsMetaMaskInstalled(checkIsMetaMaskInstalled());
        setMetaMaskData(getMetaMaskData() as Promise<Record<string, any>>);
    }

    function getProvider(){
        const provider = checkIsMetaMaskInstalled() ? new ethers.providers.Web3Provider((window as any).ethereum) : null;
        return provider;
    }

    function getContract(contractAddress: string, abi: string[], signer: Provider | Signer){
        return new ethers.Contract( contractAddress, abi, signer );
    }

   const web3 = {
        isMetaMaskInstalled,
        connectWithMetaMask,
        getMetaMaskData,
        metaMaskData,
        updateStatus,
        getProvider,
        getContract,
    }

    return web3;
}