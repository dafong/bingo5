var config = require('./config');
var Web3   = require('web3');
var mysql  = require('mysql');
var MojoData_ABI = require('../../client/build/contracts/MojoData.json')
var MojoWorld_ABI= require('../../client/build/contracts/MojoWorld.json')
import BlockMgr from './BlockManager'

var mode = process.argv[2];
console.log(" the sync star in mode " + mode)
var pool  = mysql.createPool(config.development.mysql);
pool.query('select * from blocks where id = ?',[1],function(error, results, fields){
    console.log(results)
})

BlockMgr.getCurrentBlock()
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//get current block of db
//get current block latest
//loop every block between block chain and db
//query all contract event in every block
//myContract.events.MyEvent([options][, callback])
// http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events
// then update db
// finnally update the block number in db

// console.log(process.argv)
