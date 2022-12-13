# Project Name : fee ninja

## About

Get to know how much you have spent on gas fees, on Ethereum and other layer 2 chains.
You can either link your wallet or manually enter address or ENS domain name, to also query the statistics for other wallets.

It's a fun way to share with your friends, how much gas you have spent to mint those $Tokens or that cool NFT.

## View fee ninja
IPFS: https://bafybeibdipkkob5m3xjzydnylc277ekcnjywkvgqssvoba6irujy2t52qm.ipfs.e.vimarsh.info/

Valist: https://feeninja--vim.on.valist.io/

Backup: https://sage-melomakarona-16426c.netlify.app/

## Structure of Project

- backend // express server that queries data from CovalentHQ.
          // data includes user transactions, gas spent, the price of gas (in USD) at that instant and more
          // that is used to report the fees sent
- frontend // vanilla html, css frontend that queries the backend for all the statistics
           // has functionality for connecting wallet and will auto update on changing of wallet address / chain

## Tech Stack used

- ethers.js for interfacing with wallets & other functionality
- [CovalentHQ](https://www.covalenthq.com/) to query on chain data
- backend deployed on [StackOS](https://www.stackos.io/) 
- frontend deployed on global CDNs courtsey of [Valist](https://beta.valist.io/)
- chat.openai.com for answering weird programming queries quickly

## Chains Supported

- Ethereum Mainnet
- Polygon
- Avalanche
- Gnosis
- Fantom
- Arbitrum
- Binance Smart Chain

## Contributers 

- [Vimarsh](https://github.com/vimarsh244)
- [Utkarsh](https://github.com/0xAnon0602)
