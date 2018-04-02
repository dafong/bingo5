import Vue from 'vue'
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import bingo5_artifacts from '../../build/contracts/Bingo5World.json'
var Bingo5 = contract(bingo5_artifacts);

export default {
    bus : new Vue(),

    data : {
        islogin : false,
        isConnected : false
    },

    login : function(islog){
        this.data.islogin = islog
        this.bus.$emit('login-changed',this.data.islogin)
    },

    start : function(){
        var self = this
        Bingo5.setProvider(web3.currentProvider);

        web3.eth.getAccounts(function(err, accs) {
            if(err == undefined){
                console.log(accs)
            }else{
                
            }
        })
        window.proxy = self
        console.log("reloaded")
    }
}
