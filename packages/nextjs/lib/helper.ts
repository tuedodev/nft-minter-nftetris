import { MatrixSizeType, MatrixType } from "../types/game";
import { NFTStorage } from 'nft.storage';
import { ALLOWED_CONTRACT_TYPES_ORDERED } from "../config/constants";
import jwt from 'jsonwebtoken';

export function rotationIndexNormalized(rotationIndex: number): number {
    let normalized = rotationIndex % 4 < 0 ? 4 - (rotationIndex % 4): rotationIndex % 4;
    return normalized % 4;
}

export function clearMatrix (value: MatrixSizeType):MatrixType{
    return Array.from({length: value.rows}, row => Array.from({length:value.columns}, column => ({status:0, colorFill:''})));
}

type StoreNFTprops = {
    image: string,
    name: string,
    description: string
}

/**
 * 
 * @param promise 
 * @returns [data | undefined, error | undefined]
 */
export const promiseWrapper = <T>(
  promise: Promise<T>
): Promise<T[] | [T, any]> => {
  return promise.then((data) => [data, undefined] as any).catch((error) => Promise.resolve([undefined, error]));
};

/**
 * 
 * @param timer : number
 * @desc Sleeps for timer milliseconds
 */
export const sleep = (timer: number) => {
    return new Promise(resolve=>setTimeout(()=>resolve(true), timer));
}

export async function storeNFT(props: StoreNFTprops) {
    const {image: imageString, name, description} = props;
    /** Creates a new NFTStorage client using our API key */ 
    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API as string })
    const image = new Blob([imageString], {type: 'image/svg+xml'});

    /** Call client.store, passing in the image & metadata */ 
    return nftstorage.store({
        image,
        name,
        description
    })
}

type StoreBlobProps = {
    image: string
}

export async function storeBlob(props: StoreBlobProps){
    const {image: imageString} = props;
    const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API as string });
    const blob = new Blob([imageString], {type: 'image/svg+xml'});
    const cid = await nftstorage.storeBlob(blob);
    return cid;
}

/**
 * @desc Consolidates the data of the available collection NFT contracts in an ordered manner like ERC721, ERC1155 ...
 * @desc Reading from contractValues.json
 * @param props JSON Object {"cantractType: string": {contract and network data} or [{contract and network data}]}
 * @returns [{Object data}]
 */
export function getAvailableContractsOrdered(props: {[key:string]: any}){
  let availableContractsRawData = ALLOWED_CONTRACT_TYPES_ORDERED.map((item)=>{
        let filteredContracts = props.filter((c: string[]) => c[0] === item);
        let res = null;
        if (filteredContracts.length > 0){
            res = Array.isArray(filteredContracts[0][1]) ? filteredContracts[0][1].map( x=> ({...x})) : ({...filteredContracts[0][1]});
        }
        return Array.isArray(res) ? res : new Array(res);
    }).filter(x=>x[0]);
    /**
     * @desc Converts Array [[{Obj1},{Obj2}], {Obj3}] into [{Obj1},{Obj2},{Obj3}]
     */
    const availableContracts =  availableContractsRawData.reduce((acc, elem) => [
    ...acc, ...(Array.isArray(elem) ? elem : [elem])
    ], []);
    return availableContracts;
}

export function getEthersNetwork(value: string): string {
    switch(value){
        case 'homestead':
            return 'Homestead (Mainnet)';
        case 'ropsten':
            return 'Ropsten (proof-of-work testnet)';
        case 'rinkeby':
            return 'Rinkeby (proof-of-authority testnet)';
        case 'goerli':
            return 'Görli (clique testnet)';
        case 'goerli':
            return 'Görli (clique testnet)';
        case 'kovan':
            return 'Kovan (proof-of-authority testnet)';
        case 'matic':
            return 'Polygon';
        case 'maticmum':
            return 'Polygon Mumbai Testnet';
        case 'optimism':
            return 'Optimism (L2; optimistic roll-up)';
        case 'optimism-kovan':
            return 'Optimism Testnet (L2; optimistic roll-up testnet)';
        case 'arbitrum':
            return 'Arbitrum (L2; optimistic roll-up)';
        case 'arbitrum-rinkeby':
            return 'Arbitrum Testnet (L2; optimistic roll-up testnet)';
        default:
            return 'Unknown network'
    }
}

export async function getFingerprint(value: string){
    jwt.sign({ fingerprint: value }, process.env.NEXT_PUBLIC_JWT_SECRET, {expiresIn: '1h'}, function(err, token) {
        if (token){
            return token;
        }
        return err;
    });
}