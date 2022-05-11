import { expect } from 'chai';
import { ethers } from 'hardhat';
import {TEST_ARGS, TEST_DATA_ENCODED, TEST_RANDOM_PROXY_ADDRESS} from './config/constants';

describe('NFTetris - Unit Test 01', function(){

    it(`Deploy contract with the correct name ${TEST_ARGS[0]}`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const testContract = await TestContract.deploy(...TEST_ARGS);
        await testContract.deployed();
        expect(await testContract.name()).to.equal(TEST_ARGS[0]);
    });

    
    it(`Deploy contract with the correct symbol ${TEST_ARGS[1]}`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const testContract = await TestContract.deploy(...TEST_ARGS);
        await testContract.deployed();
        expect(await testContract.symbol()).to.equal(TEST_ARGS[1]);
    });

    it(`Owner can mint a new NFT. Event CreatedSVG_NFT was emitted.`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const [owner,] = await ethers.getSigners();
        const testContract = await TestContract.deploy(...TEST_ARGS);
        await testContract.connect(owner).deployed();
        await expect(testContract.connect(owner).mintNFT(TEST_DATA_ENCODED)).to.emit(testContract, 'CreatedSVG_NFT');
    });

    it(`Adress other than owner can mint a new NFT. Event CreatedSVG_NFT was emitted.`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const [owner, ] = await ethers.getSigners();
        const testContract = await TestContract.connect(owner).deploy(...TEST_ARGS);
        await testContract.deployed();
        const [, addr1] = await ethers.getSigners();
        await expect(testContract.connect(addr1).mintNFT(TEST_DATA_ENCODED)).to.emit(testContract, 'CreatedSVG_NFT');
    });

    it(`Owner can change ProxyRegistryAddress, that allows operations on behalf of the contract (e.g. OpenSea).`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const [owner, ] = await ethers.getSigners();
        const testContract = await TestContract.connect(owner).deploy(...TEST_ARGS);
        await testContract.deployed();
        await expect(testContract.connect(owner).setProxyRegistryAddress(TEST_RANDOM_PROXY_ADDRESS)).to.be.empty;
    });

    it(`Adress other than owner cannot change ProxyRegistryAddress, that allows operations on behalf of the contract (e.g. OpenSea).`, async function(){
        const TestContract = await ethers.getContractFactory("NFTetris");
        const [owner, addr1] = await ethers.getSigners();
        const testContract = await TestContract.connect(owner).deploy(...TEST_ARGS);
        await testContract.deployed();
        await expect(testContract.connect(addr1).setProxyRegistryAddress(TEST_RANDOM_PROXY_ADDRESS)).to.be.revertedWith('Ownable: caller is not the owner');
    });
});