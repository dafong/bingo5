var Bingo5 = artifacts.require("./Bingo5World.sol");

var MagicNumber = {
    toHex : function(arr){
        var num = 0;
        for(var i = 0; i < 8; i++){
            num = (num <<  3) | arr[i]
        }
        return web3.toHex(num)
    },
    fromHex : function(hex){
        if(typeof(hex) == 'string'){
            hex =  parseInt(hex,16);
        }
        var arr = []
        for(var i = 0 ; i < 8; i++){
            var number = ( hex >> (i * 3) ) & 0x07;
            arr.push(number)
        }
        return arr.reverse();
    }
}

contract('Bingo5', function(accounts) {
    var proxy;
    // it("",function(){
    //     var hex = MagicNumber.toHex([1,2,3,4,5,4,3,2]);
    //     console.log(hex)
    //     console.log(MagicNumber.fromHex(hex));
    // })

    // it("",function(){
    //     return Bingo5.deployed().then(function(instance){
    //         proxy = instance;
    //         var hex1 = MagicNumber.toHex([1,2,3,4,5,4,3,2]);
    //         var hex2 = MagicNumber.toHex([2,2,3,1,5,1,4,1]);
    //         console.log(hex1 +  " " + hex2 );
    //         console.log(MagicNumber.fromHex(hex1) +  " " + MagicNumber.fromHex(hex2) );
    //         return proxy.getLines(hex1,hex2);
    //     }).then(function(number){
    //         console.log("the lines you will get " + number)
    //     })
    // })

    // it("should set price 0.02 ether of contract", function() {
    //     return Bingo5.deployed().then(function(instance) {
    //         proxy = instance;
    //         return proxy.setPrice(web3.toWei(0.02, 'ether'));
    //     }).then(function(result) {
    //         return proxy.price.call();
    //     }).then(function(price){
    //         var real = web3.fromWei(price,'ether').toNumber()
    //         assert.equal(real, 0.02, "price shoud be 0.02 but got "+ real);
    //     });
    // });
    
    // it("should set rate 500 ether of contract", function() {
    //     return Bingo5.deployed().then(function(instance) {
    //         proxy = instance;
    //         return proxy.setRate(500);
    //     }).then(function(result) {
    //         return proxy.rate.call();
    //     }).then(function(rate){
    //         assert.equal(rate.toNumber(), 500, "rate shoud be 500 but got "+ rate);
    //     });
    // });

    // it("set ceo address",function(){
    //     return Bingo5.deployed().then(function(instance){
    //         proxy = instance;
    //         return proxy.setCEO("0x821aea9a577a9b44299b9c15c88cf3087f3b5544");
    //     }).then(function(){
    //         return proxy.ceoAddress.call();
    //     }).then(function(addr){
    //          assert.equal(addr, "0x821aea9a577a9b44299b9c15c88cf3087f3b5544", "invalide address: "+ addr);
    //     })
    // })

    // it("set isOpen",function(){
    //     return Bingo5.deployed().then(function(instance){
    //         proxy = instance;
    //         return proxy.setOpen(true);
    //     }).then(function(){
    //         return proxy.isOpen.call();
    //     }).then(function(isopen){
    //         assert.equal(isopen,true,"the bingo5 is not open");
    //     })
    // })

    // it("bet with on one account", function(){
    //     return Bingo5.deployed().then(function(instance){
    //         proxy = instance;
    //         return proxy.setCEO("0x821aEa9a577a9b44299B9c15c88cf3087F3b5544");
    //     }).then(function(){
    //         return proxy.setOpen(true);
    //     }).then(function(isopen){
    //         console.log("the bingo5 open = " + isopen);
    //         return proxy.bet([ web3.fromDecimal(0x01249249) ] , {from: accounts[1] , value: web3.toWei(0.02,'ether')});
    //     }).then(function(receipt){
    //         console.log(receipt)
    //         return proxy.getBalance();
    //     }).then(function(balance){
    //         console.log("the contract balance is " + web3.fromWei(balance,'ether'))
    //         return web3.eth.getBalance("0x821aEa9a577a9b44299B9c15c88cf3087F3b5544")
    //     }).then(function(ceobalance){
    //         console.log("the ceo balance is " + web3.fromWei(ceobalance,'ether'))
    //         return proxy.getRoundsOwner.call();
    //     }).then(function(addrs){
    //         console.log(addrs)
    //     })
    // });

    it("bet and open with on one account", function(){
        return Bingo5.deployed().then(function(instance){
            proxy = instance;
            return proxy.setCEO("0x821aEa9a577a9b44299B9c15c88cf3087F3b5544")
        }).then(function(){
            return proxy.setOpen(true);
        }).then(function(){
            var hex = 0x02249249;
            console.log(" Bet Number:")
            console.log( MagicNumber.fromHex(hex & 0xffffff));
            return proxy.bet([ hex ] , {from: accounts[1] , value: web3.toWei(0.04,'ether')});
        }).then(function(){
            return web3.eth.getBalance("0xf17f52151EbEF6C7334FAD080c5704D77216b732");
        }).then(function(balance){
            console.log("balance before :" + web3.fromWei(balance,'ether').toNumber());
        }).then(function(){
            return proxy.setOpen(false);
        }).then(function(){
            return proxy.open()
        }).then(function(magic){
            var log = magic.logs[0];
            var hex = web3.fromDecimal(log.args.magic.toNumber());
            console.log(" Magic Number:")
            console.log(MagicNumber.fromHex(hex));
        }).then(function(){
            return web3.eth.getBalance("0xf17f52151EbEF6C7334FAD080c5704D77216b732");
        }).then(function(balance){
            console.log("balance after :" + web3.fromWei(balance,'ether').toNumber());
        })
    })

});
