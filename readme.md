# Project Name : fee.ninja

## About

Get to know how much you have spent on gas fees, on Ethereum and other layer 2 chains.

## Structure of Project

- backend // express server that queries data from CovalentHQ.
          // data includes user transactions, gas spent, the price of gas (in USD) at that instant and more
          // that is used to report the fees sent
- frontend // vanilla html, css frontend that 