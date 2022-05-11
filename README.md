# NfTetris Monorepo

NfTetris is a NFT minter based on OpenZeppelin´s ERC721 contract and the classic game Tetris.

The idea behind the implementation was to replace the randomness that is difficult to implement in a deterministic blockchain environment with human randomness, in this case a classic game played by a human being.

The whole monorepo is written in Typescript and Solidity.

NFTetris was originally planned as a competition entry of the moralis Avalanche Hackathon 6th December 2021 - 31st January 2022 [Link](https://moralis.io/avalanche-hackathon/). However, the entry was not finished in time and was switched to the Poygon network, which is supported by the OpenSea NFT platform. With minor changes to the deploy file, the NFT can still be published via Avalanche.

The Monorepo is still in beta and only supports Polygon Testnet Mumbai so far.

## This monorepo contains two packages:

### 1. Hardhat package for Collection Contract NFTetris

[:arrow_right: README.md](./packages/hardhat/README.md) Hardhat implementation of an ERC721 based on OpenZeppelin´s [ERC721URIStorage](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol)

**Main dependencies are:**

- Hardhat
- Hardhat Deploy
- Ethers
- Chain and Ethereum Waffle for Testing

### 2. Next.js package for frontend

[:arrow_right: README.md](./packages/nextjs/README.md) Next.js implementation of the classical game Tetris as Single Page Application SPA. The game was originally implemented in React, but in order to provide a secure API for email notification, the React components were built on top of Next.js

[LIVE-DEMO Beta-Version](https://nft-minter-nftetris.vercel.app/)

**Main dependencies are:**

- Next.js
- React
- Ethers
- JsonWebtoken
- Nft.storage
- Nodemailer

## Installation

Installation process should be kicked off **inside the monorepo´s root directory**.
`npm install` or for for each individual package `npm install --workspace=packages/hardhat` (Collection Contract) and respectively `npm install --workspace=packages/nextjs` (Frontend).

[![NFTetris Screenshot](/assets/images/screenshot_nftetris.jpg](https://nft-minter-nftetris.vercel.app/)
