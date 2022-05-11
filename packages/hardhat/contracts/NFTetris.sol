//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTetris is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    address private proxyRegistryAddress;

    event CreatedSVG_NFT(uint256 indexed _tokenId, string indexed _tokenURI);

    constructor(
        string memory _name,
        string memory _symbol,
        address _proxyRegistryAddress
    ) ERC721(_name, _symbol) {
        _tokenId.reset();
        proxyRegistryAddress = _proxyRegistryAddress;
    }

    function mintNFT(string memory _metadataEncoded) public returns (uint256) {
        uint256 _newTokenId = _tokenId.current();
        _mint(msg.sender, _newTokenId);
        _setTokenURI(_newTokenId, _metadataEncoded);
        _tokenId.increment();
        emit CreatedSVG_NFT(_newTokenId, _metadataEncoded);
        return _newTokenId;
    }

    /**
     * Override isApprovedForAll to auto-approve OS's proxy contract
     * see https://docs.opensea.io/docs/polygon-basic-integration
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool isOperator)
    {
        // if OpenSea's ERC721 Proxy Address is detected, auto-return true
        // from OpenSea provided address is currently (22.04.22) 0x58807baD0B376efc12F5AD86aAc70E78ed67deaE
        if (_operator == proxyRegistryAddress) {
            return true;
        }

        // otherwise, use the default ERC721.isApprovedForAll()
        return ERC721.isApprovedForAll(_owner, _operator);
    }

    function setProxyRegistryAddress(address _proxyRegistryAddress)
        external
        onlyOwner
    {
        require(_proxyRegistryAddress != address(0), "Invalid address");
        proxyRegistryAddress = _proxyRegistryAddress;
    }
}
