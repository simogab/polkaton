async function main () {
    const api = await ApiRx.create().toPromise(); // initialised via static create
    api.rpc.chain.subscribeNewHeads().subscribe((header) => { 
      console.log(`Chain is at #${header.number}`);
});
}