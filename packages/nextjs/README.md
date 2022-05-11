[:arrow_left: README.md](../../README.md) of Monorepo root directory

# Next.js implementation of NFTetris

NFTetris was originally implemented as a pure React Single Page Application (SPA), a framework like Next.js would not have been necessary for the game itself. However, in order to enable a secure email notification at the end of the game, the game was finally built on Next.js in order to be able to use the API infrastructure there with the respective securities (Same-origin policy).

[LIVE-DEMO Beta-Version](https://nft-minter-nftetris.vercel.app/)

## Installation

From the root directory of the monorepo `npm install` or for the Next.js package separately `npm install --workspace=packages/nextjs`.

## Environment Variables (./.env.local)

Following environement variables are necessary for the operation of the frontend website and should be included inside the `.env.local` file (root directory of the Next.js package).

```shell
NEXT_PUBLIC_NFT_STORAGE_API=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_JWT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_EMAIL_HOST=[Your Email Host]
NEXT_PUBLIC_EMAIL_PORT=[Your Email Port e.g. 587]
NEXT_PUBLIC_EMAIL_USER=[Your Email User]
NEXT_PUBLIC_EMAIL_PASSWORD=[Your Email Password]
POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY1=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
POLYGON_TESTNET_ACCOUNT_PRIVATE_KEY2=0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Important Variables inside the ./packages/nextjs/config/constants.ts

`MAX_COUNTER` sets the maximum playing time to 1000 seconds. Please note that the counter is based on the `window.requestAnimationFrame` of the browser, so if the tab in the browser is not active, the game will be paused.

`TRANSACTION_OPTIONS` are dealing with `gasLimit` and `gasPrice`, important values for the minting process. The right values depend strongly on the network, the chain and the respective traffic. You should play with both values when minting in order to achieve the best possible result in terms of duration and costs of minting.

```typescript
export const MAX_COUNTER = 1000;
export const TRANSACTION_OPTIONS = {
	gasLimit: 6000000,
	gasPrice: 40000000000,
};
```

## The game: NFTetris, a Tetris clone

You should use your mouse and on smartphones or tablet your fingers and click in the navigation icons around the center of the screen. The game ends when the maximum time limit is reached or the pieces reach the ceiling of the screen. The speed can be changed from slow to fast via the switch at the top center of the screen (this also doubles the score).

[![NFTetris Screenshot](/assets/images/screenshot_nftetris.jpg](https://nft-minter-nftetris.vercel.app/)

In order to proceed you need to enter the metadata for the desired NFT, in this case name and description. Enter DEPLOY NFT to proceed or NO THANKS to cancel and start a new game.

![NFTetris Screenshot](/assets/images/screenshot_nftetris_gameover.jpg)

The minting process starts now and can **take a while** depending on the network and the costs granted. Error messages are displayed as far as possible. If the MetaMask account is blocked (a Polygon test account is required in the beta phase), the user can unblock the account in the MetaMask pop-up window and start the deployment process again. By clicking the CONNECT WITH METAMASK Button you can connect this website with the MetaMask Extension on your browser. This is absolutely necessary for minting. The connection can also be set up manually within the MetaMask Extension by clicking on the three dots and going to Connected Sites.
It's possible to cancel the process by clicking on the NEW GAME button. However, all data entered so far will not be saved permanently and will then be lost.

![NFTetris Screenshot](/assets/images/screenshot_nftetris_processingminting.jpg)

If the minting process was successful (Congratulations!), a new screen is displayed at the end with the game result (as SVG), important links to the transaction or OpenSea and transaction details. Because the transaction details are not saved permanently, the user can send them to his or her e-mail account. A new game can be started by clicking on the NEW GAME button.

![NFTetris Screenshot](/assets/images/screenshot_nftetris_nftminted.jpg)
