import moment from 'moment-es6';
/** transaction struct
{
   tx_hash:  xxxx ,    // the transaciton hash ,
   in_progress : true, // true of false,
   // 1 is success, -1 noresult ,other is failed ,accroding to the res.status in callback,
   status : 1  ,       // ,
   data : {}           // the data
   date : xxx          //the tx created date
}
**/
export default {
    check_duration : 5000,
    timeout   : 1200,
    // the pendding transacitons
    pendings  : {},
    // the history transactions (which block has been mined )
    history   : {},
    listeners : {},


    //
    poll: function(tx){
        var self = this
        $.log('tracker',`polling tx: ${tx.tx_hash}`)
        web3.eth.getTransactionReceipt(tx.tx_hash,function(error,res){
            if(res == null){
                //not mined
                var m = moment(tx.date)
                if(m.add(timeout,'seconds').isBefore(new Date())){
                    self.finish_tx(tx,-1)
                }else{
                    setTimeout(function(){
                        self.poll(tx)
                    },self.check_duration)
                }
            }else{
                //mined
                if(res.status == 1){
                    //transaction success
                    $.log('tracker',`mined tx: ${tx.tx_hash} status success`)
                }else{
                    //transaction failed
                    $.log('tracker',`mined tx: ${tx.tx_hash} status failed`)
                }
                self.finish_tx(tx , res.status )
            }
        })
    },

    finish_tx : function(tx,status){
        $.log('tracker',`finish tx: ${tx.tx_hash} ${status}`)
        tx.in_progress = false
        tx.status = status
        delete this.pendings[tx.tx_hash]
        this.history[tx.tx_hash] = tx
        if (this.listeners[tx.tx_hash].callback){
            this.listeners[tx.tx_hash].callback(tx)
            this.listeners[tx.tx_hash].callback = undefined
        }
    },

    start_tracking : function(tx_hash,data){
        if(tx_hash == null){
            // the transaction failed
            return
        }
        var tx = {
            tx_hash     : tx_hash,
            in_progress : true,
            status      : -1,
            data        : data
        }
        tx.date = new Date()
        this.pendings[tx_hash] = tx
        this.poll(tx)
    },

    watch_tx: function(tx_hash,cb){
        if(this.history[tx_hash]){
             return cb(this.history[tx_hash]);
        }

        if(this.pendings[tx_hash]){
            this.listeners[tx_hash] = this.listeners[tx_hash] || {}
            this.listeners[tx_hash].callback = cb
            return true
        }else{
            return false
        }
    },

    unwatch_tx: function(tx_hash,cb){
        if (this.listeners[tx_hash] == undefined) return;
        if (this.listeners[tx_hash].callbacks == undefined) return;
        this.listeners[tx_hash].callback = undefined;
    }

}
