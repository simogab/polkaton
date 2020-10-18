const {ApiPromise, WsProvider} = require('@polkadot/api'); // check required imports

const wsProvider = new WsProvider('wss://rpc.polkadot.io'); //set local node

async function main () {
    const api = await ApiPromise.create({provider: wsProvider}); // initialise create 
    const header = await api.rpc.chain.getHeader(); //get latest block info
    console.log(`Here's all the info: ${header}`); //see full output of latest block info
};
main().catch(console.error).finally(() => process.exit()); 