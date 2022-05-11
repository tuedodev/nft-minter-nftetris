import { useContext, useEffect, useRef, useState } from "react"
import { NETWORK_UPDATE_MILLISECONDS} from "../config/constants";
import { useWeb3 } from '../hooks/useWeb3';
import {GameContext} from '../components/GameContext'

export const useStoreData = () => {

    const currentWeb3 = useWeb3();
    const [web3, setWeb3] = useState(currentWeb3);
    const [metaMaskData, setMetaMaskData] = useState<Record<string, any> | null>(null);
    const isCountingRef = useRef(false);
    const isDeployingRef = useRef(false);
    const context = useContext(GameContext);
    isCountingRef.current = context!.isCounting;
    isDeployingRef.current = context!.isDeploying;

    useEffect(() =>{
        updateNetworkData();
        const interval = setInterval(()=>{
            /** Only checks if currently no game is played (isCounting == false) */
            if (!isCountingRef.current && !isDeployingRef.current){
                updateNetworkData();
            } 
        }, NETWORK_UPDATE_MILLISECONDS);

        function updateNetworkData(){
            web3.updateStatus();
            setWeb3(web3);
            web3.getMetaMaskData().then((data)=>{
                setMetaMaskData(data as Record<string, any>);
            }).catch(data => {
                setMetaMaskData(null);
            });
        }

        return () => clearInterval(interval);

    },[isCountingRef, isDeployingRef, web3]);

    return {
        web3,
        metaMaskData
    };
}

