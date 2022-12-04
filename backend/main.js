// const fetch = require('node-fetch')

// const express = require('express')

// const cors = require('cors')

// const dotenv = require("dotenv")

import fetch from "node-fetch";

// import pkg from 'express';
// const { express } = pkg;

import express from "express";
import  cors  from "cors";
import dotenv from "dotenv";

const app = express()



app.use(express.json())
app.use(cors())

function comma(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
}


const web_call= async (url,opts) => {
  
    let respone_raw = await fetch(url,opts);
    const result = await respone_raw.json();
    return result

}  

const main = async(addy,chainIDTemp) => {



    const chainConfig = []
    

    chainConfig['0x1'] = {
        id: '0x1',
        shortname: 'eth',
        name: 'Ethereum',
        symbol: 'eth',
        token: 'Ξ',
        chainId:1
    }
    chainConfig['0x38'] = {
        id: '0x38',
        shortname: 'bsc',
        name: 'Binance Smart Chain',
        symbol: 'bnb',
        token: 'BNB',
        chainId:56
    }
    chainConfig['0x89'] = {
        id: '0x89',
        shortname: 'matic',
        name: 'Polygon',
        symbol: 'matic',
        token: 'MATIC ',
        chainId:137
    }
    chainConfig['0xfa'] = {
        id: '0xfa',
        shortname: 'ftm',
        name: 'Fantom',
        symbol: 'ftm',
        token: 'FTM',
        chainId:250

    }
    chainConfig['0xa86a'] = {
        id: '0xa86a',
        shortname: 'avax',
        name: 'Avalanche',
        symbol: 'avax',
        coingecko_name: 'avalanche-2',
        token: 'AVAX ',
        chainId:43114

    }
    chainConfig['0xa4b1'] = {
        id: '0xa4b1',
        shortname: 'aeth',
        name: 'Arbitrum',
        symbol: 'aeth',
        token: 'Aeth ',
        chainId:42161
    }
    
    
    
    
    const chainID = chainConfig[chainIDTemp]["chainId"];
    
    const api_key=process.env.API_KEY;


    var URL = `https://api.covalenthq.com/v1/${chainID}/address/${addy}/transactions_v2/?&key=${api_key}&page-size=10000`
    var opts = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        }

    console.log(URL)

    var response = await web_call(URL,opts,{ mode: 'no-cors'})
    allTx=response['data']['items']

    var gasFeeAvg=0
    var gasFeeTotal=0
    var gasInUSD=0
    var noOfTxs=0
    var TxsFailed=0
    var gasForFailedTxs=0



    allTx.forEach(tx => {

        if(tx['from_address']==addy.toLocaleLowerCase()){

        if(tx['successful']==false){
            console.log(tx)
            noOfTxs+=1
            TxsFailed+=1
            gasForFailedTxs+=tx['fees_paid']/10**18
            gasFeeAvg+=tx['gas_spent']
            gasFeeTotal+=tx['fees_paid']/10**18
            gasInUSD+=tx['gas_quote']
        
        }else{
            noOfTxs+=1
            gasFeeAvg+=tx['gas_spent']
            gasFeeTotal+=tx['fees_paid']/10**18
            gasInUSD+=tx['gas_quote']
        }

    }



    });


    console.log(`
    
    Total Tx ->${noOfTxs}
    Total Value -> ${gasFeeTotal.toFixed(3)}
    Total Value USD -> ${gasInUSD.toFixed(3)}
    Total Gwei -> ${gasFeeAvg}
    Total Failed -> ${TxsFailed}
    Total Failed Value -> ${gasForFailedTxs}

    `)



    if(gasForFailedTxs!=0){
        gasForFailedTxs=gasForFailedTxs.toFixed(3)
    }else{
        gasForFailedTxs='none'
    }

    var finalData = {
        "id":chainIDTemp,
        "address":addy,
        "noOfTxs":noOfTxs.toString(),
        "gasFeeTotal":`${chainConfig[chainIDTemp]['token']} ${gasFeeTotal.toFixed(3)}`,
        "gasInUSD":`$${gasInUSD.toFixed(3)}`,
        "gasFeeAvg":(comma(gasFeeAvg)).toString(),
        "TxsFailed":TxsFailed.toString(),
        "gasForFailedTxs":gasForFailedTxs
    }

    return finalData

}

app.get('/api/ethIndia/', async (req,res) => {

    var address = req.query.address
    var chainId = req.query.id


    var finalResponse = await main(address,chainId)
    res.send(finalResponse,200)
    

});

app.listen(3000 , () => console.log ('Listening on port 3000....'))
