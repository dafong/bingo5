import Vue from 'vue'
import { default as Web3} from 'web3';
import tracker from '@/util/tracker'
import MojoData_ABI from '../../build/contracts/MojoData.json'
import MojoWorld_ABI from '../../build/contracts/MojoWorld.json'
const sigUtil = require('eth-sig-util')

var auto_estimate_gas = function(ins){
    var wrapped = new Proxy({},{
        get : function(obj,prop){
            if(obj[prop]) return obj[prop]
            var func = ins[prop]
            if(func && typeof(func) != 'function') return

            var newfunc = function(...arglist){
                if(arglist.length < 2 || typeof(arglist[arglist.length-2])!="object"){
                    // direct call
                    return func.apply(ins,arglist)
                }
                if(arglist.length < 2){
                    throw "contract function at least need 2 parameter({from:xx},callback)"
                }
                var cb  = arglist.pop()

                if (typeof(cb) != "function"){
                    throw "contract function need a callback"
                }

                arglist.push(function(error,gas){
                    gas = error == null ? gas : 21000
                    arglist.pop()
                    arglist[arglist.length-1].gas = gas <= 21000 ? 31000 : gas
                    arglist.push(cb)
                    func.apply(ins,arglist)
                })

                func.estimateGas.apply(ins,arglist)
            }
            obj[prop] = newfunc
            return newfunc
        }
    })
    return wrapped;
}

var manual_estimate_gas = function(ins){
    var wrapped = new Proxy({},{
        get : function(obj,prop){
            if(obj[prop]) return obj[prop]
            var func = ins[prop]
            if(func && typeof(func) != 'function') return

            var newfunc = function(...arglist){
                if(arglist.length < 2 || typeof(arglist[arglist.length-2])!="object"){
                    // direct call
                    return func.apply(ins,arglist)
                }
                if(arglist.length < 2){
                    throw "contract function at least need 2 parameter({from:xx},callback)"
                }
                arglist[arglist.length-2].gas = 0
                func.apply(ins,arglist)
            }
            obj[prop] = newfunc
            return newfunc
        }
    })
    return wrapped;
}


export default {
    bus : new Vue(),
    acct : undefined,
    islogin : false,
    isConnected : false,
    network: undefined,
    mojodata: undefined,
    timer: undefined,

    on : function(evt,cb){
        this.bus.$on(evt,cb);
    },

    watchAcct : function(){
        var self = this;
        clearInterval(self.timer)
        self.timer = setInterval(function(){
            if(web3.eth.accounts[0] != self.acct){
                self.acct = web3.eth.accounts[0]
                console.log('更换账户 >>> ', self.acct)
            }
        },100)
    },

    emit: function(evt,attach){
        this.bus.$emit(evt,attach);
    },

    init : function(){
        var self = this
        window.proxy = self
        if ( typeof web3 === 'undefined' ){
            $.log('warn',"web3: no metamask")
            return
        }
        window.web3 = new Web3(web3.currentProvider);

        this.check_network().then(()=>{
            $.log('contract',`web3: network=${self.network}`);
            self.on_network_changed()
            return self.get_account()
        }).then((acct)=>{
            self.on_acct_changed(acct)
        }).catch((err)=>{
            $.log(err)
        })
    },

    on_network_changed : function  () {
        let self = this
        self.bus.$emit('network-changed',self.network);
        self.init_contract()
        self.isConnected = (self.network!==undefined)
        $g.evt.$emit("MOJO_ETH_NETWORK_CHANGED", {nw:self.network, is_ok:self.isConnected})
    },
    on_acct_changed : function  (acct) {
        let self = this
        self.acct = acct
        self.bus.$emit('account-changed',acct);
        $.log('contract',`acct: ${acct}`)
        if (acct) {
            self.islogin = true
            
        } else {
            self.islogin = false
            self.watchAcct()
        }
        $g.evt.$emit("MOJO_ETH_ACC_CHANGED", {acct:self.acct, is_login:self.islogin})
    },

    init_contract : function(){
        var self = this
        var MojoDataContract = web3.eth.contract(MojoData_ABI.abi)
        var address = MojoData_ABI.networks[self.network_id].address
        $.log('contract',`mojodata at ${address}`)
        self.mojodata = MojoDataContract.at(address)
        var MojoWorldContract= web3.eth.contract(MojoWorld_ABI.abi)
        address = MojoWorld_ABI.networks[self.network_id].address
        $.log('contract',`mojoworld at ${address}`)
        self.mojoworld = MojoWorldContract.at(address)

        // self.mojoworld = auto_estimate_gas(self.mojoworld)
        // self.mojodata  = auto_estimate_gas(self.mojodata)

    } ,

    estimateGas : function(){
        var self = this
        // web3.eth.getGasPrice(function(error,res){
        //     $.log('contract',`gas price: ${res/1000000000} Gwei`)
        // })
        // self.mojoworld.setPresellOpen.estimateGas(true,{from:self.acct},function(error,res){
        //     $.log('contract',res)
        // })
    },

    check_network : function(){
        var self = this
        self.network = undefined
        var p = new Promise(function(resolve,reject){
            web3.version.getNetwork((err,networkId)=>{
                self.network_id = networkId
                switch(networkId){
                    case "1":
                        self.network = "mainnet";
                        break;
                    case "2":
                        self.network = "morden";
                        break;
                    case "3":
                        self.network = "ropsten";
                        break;
                    case "4":
                        self.network = "rinkeby";
                        break;
                    default:
                        self.network = "local";
                        break;
                }
                resolve()
            })
        })
        return p
    },


    login : function(){
        var self = this
        var p = new Promise(function(resolve,reject){

            const msgParams = [
            {
                type: 'string',      // Any valid solidity type
                name: '签名内容',     // Any string label you want
                value: '签名内容'     // The value to sign
            }]

            web3.currentProvider.sendAsync({
                method: 'eth_signTypedData',
                params:[msgParams,self.acct]
            },function(err,result){
                $.log(`sign result ${result.result}`)
                if(err == null){
                    resolve({ ec : 0 , data : { sign : result.result } })
                }else{
                    resolve({ ec : 1001 })
                }
            })

        })
        return p
    },

    get_account : function(){
        var self = this;
        self.acct = undefined
        var p = new Promise(function(resolve,reject){
            web3.eth.getAccounts(function(err, accts) {
                resolve(accts[0])
            })
        })
        return p;
    },

    get_owner : function(){
        this.mojodata.owner(function(error,res){
            $.log('contract',`data owner: ${res}`)
        })

        this.mojoworld.owner(function(error,res){
            $.log('contract',`world owner: ${res}`)
        })
    },

    check_security_data : function(){
        this.mojodata.addCaller(this.acct,{from:this.acct},function(err,res){
            if(err == null){
                $.log('contract',"已将当前地址加入data合约callers");
            }else{
                $.log('contract',"将当前地址加入data合约callers失败");
            }
        })
    },
    check_security_world : function(){
        this.mojoworld.addCaller(this.acct,{from:this.acct},function(err,res){
            if(err == null){
                $.log('contract',"已将当前地址加入world合约callers");
            }else{
                $.log('contract',"将当前地址加入world合约callers失败");
            }
        })
    },

    add_address_to_data_auth : function(addr){
        this.mojodata.addCaller(addr,{from:this.acct},function(err,res){
            if(err == null){
                $.log('contract',"已将当前地址加入data合约callers");
            }else{
                $.log('contract',"将当前地址加入data合约callers失败");
            }
        })
    },

    add_address_to_world_auth: function(addr){
        this.mojoworld.addCaller(addr,{from:this.acct},function(err,res){
            if(err == null){
                $.log('contract',"已将当前地址加入world合约callers");
            }else{
                $.log('contract',"将当前地址加入world合约callers失败");
            }
        })
    },

//config area
    get_config_general_list : function(){

        var gids = [1101,1102,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1301,1302,1303,2101,2102,2201,2202,2203,2204,2205,2206,2207,2208,2209,2210,2211,2212,2213,2214,2215,2216,2217,2218,2301,2302,2303,3101,3102,3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3213,3214,3215,3216,3217,3218,3301,3302,4101,4102,4201,4202,4203,4204,4205,4206,4207,4208,4209,4210,4211,4212,4213,4214,4215,4216,4217,4218,4301,4302];
        //
        this.mojodata.getGeneralLength(function(error,res){
            var len = res;
            $.log(`contract: general length ${len}`)
        })

        var cb = function(id){
            return function(error, vals){
                $.log(`contract: [general] gid=${id}, coutry=${vals[0]}, rarity=${vals[1]}, sid=${vals[2]}, relations=${vals[3]} buffs=${vals[4]} discover = ${vals[5]}`)
            }
        }

        var cb1 = (id)=>{
            return function(error, vals){
                $.log(`contract: [general] gid=${id} hp=${vals[0]}, atk=${vals[1]}, lead=${vals[2]}, wit=${vals[3]}`)
            }
        }
        for(var i=0;i<gids.length;i++){
            this.mojodata.getGeneral(gids[i], cb(gids[i]))

            this.mojodata.getGeneralAttr(gids[i],cb1(gids[i]))
        }

    },

    get_config_train_cost_list : function(){

        var lvs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        var cb = function(lv){
            return function(error,vals){
                $.log(`contract: [cost] lv=${lv} cost=${vals[0]} cd=${vals[1]}`)
            }
        }

        for(var i=0; i<lvs.length; i++){
            this.mojodata.getCost(lvs[i],cb(lvs[i]))
        }
    },

    get_config_skill_list : function(){
        var sids = [1101,1102,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1301,1302,1303,2101,2102,2201,2202,2203,2204,2205,2206,2207,2208,2209,2210,2211,2212,2213,2214,2215,2216,2217,2218,2301,2302,2303,3101,3102,3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3213,3214,3215,3216,3217,3218,3301,3302,4101,4102,4201,4202,4203,4204,4205,4206,4207,4208,4209,4210,4211,4212,4213,4214,4215,4216,4217,4218,4301,4302];
        this.mojodata.getSkillLength(function(error, len){
            $.log(`contract: config skill length: ${len}`)
        })

        var cb = function(id){
            return function(error,vals){
                $.log(`contract: [skill] sid=${vals[0]}, ef1=${vals[1]},tar1=${vals[2]},ba1=${vals[3]},val1=${vals[4]},rod1=${vals[5]},ef2=${vals[6]},tar2=${vals[7]},ba2=${vals[8]},val2=${vals[9]},rod2=${vals[10]}`)
            }
        }
        for(var i=0;i<sids.length;i++){
            this.mojodata.getSkill(sids[i],cb(sids[i]))
        }
    },
//admin area
    //打开预售 管理后台需要
    open_presell : function(isopen){
        var self = this
        var p = new Promise(function(resolve,reject){
             self.mojoworld.setPresellOpen(isopen,{from: self.acct},function(error,res){
                $.log(`contract: setPresellOpen tx:${res}`)
                if(error == null){
                    tracker.start_tracking(res)
                }
                resolve({
                    tx_hash : res,
                    error   : error
                })
            })
        })
        return p
    },

    get_error : function(e){
        if(e.message.indexOf("revert") > 0){
            return "tx revert";
        }else{
            return "tx  nonce";
        }
    },

    //预售是否已经打开 管理后台需要
    is_presell_open : function(){
        var self = this
        var p = new Promise(function(resolve,reject){
            self.mojoworld.isPresellOpen(function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            })
        })
        return p;
    },

    //取得已预售数量 管理后台需要
    get_preselled_count : function(){
        var self = this
        var p = new Promise(function(resolve,reject){
            self.mojoworld.getTotalPreSelled(function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            });
        })
        return p;
    },

    //查看待预售星级数组 管理后台需要
    get_wait_preselled_count : function(){
        var self = this
        var p = new Promise(function(resolve,reject){
            self.mojoworld.getWaitPreselled(function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            })
        })
        return p;
    },

//player area
    //取得玩家将领id数组
    get_player_general_ids : function(){
        var self = this
        var p = new Promise(function(resolve,reject){
            self.mojodata.getPlayerGenerals(self.acct,function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            });
        })
        return p;

    },
    //取得玩家某个将领数据
    get_player_general : function(id){
        var self = this
        var p = new Promise(function(resolve,reject){
            self.mojodata.getPlayerGeneralAll(id,function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            });
        })
        return p;
    },

    //免费领取一个将领
    get_free : function(wallet){
        var self = this;
        var p = new Promise(function(resolve,reject){
            self.mojoworld.getOneFree(wallet || 0x0,{from: self.acct},function(error,res){
                if(error == null){
                    tracker.start_tracking(res)
                }
                resolve({
                    tx_hash : res,
                    error   : error
                })
            })
        })
        return p;
    },

    //是否已免费领取过
    is_get_free : function(){
        var self = this;
        var p = new Promise(function(resolve,reject){
            self.mojodata.getPlayerHasGetFree(self.acct,function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            })
        })
        return p
    },

    get_general_in_market : function(){},
    //查询玩家信息
    get_player_state : function(){
        var self = this;
        var p = new Promise(function(resolve,reject){
            self.mojodata.getPlayerState(self.acct,function(error,res){
                if(error == null)
                    resolve(res)
                else
                    reject(error)
            })
        })
        return p
    },
    //预售
    presell : function(){
        var self = this;
        var p = new Promise(function(resolve,reject){
            self.mojoworld.presell({ from: self.acct , value: web3.toWei(0.01,'ether')},function(error,res){
                if(error == null){
                    tracker.start_tracking(res)
                }
                resolve({
                    tx_hash : res,
                    error   : error
                })
            })
        })
        return p;

    },

    niudan : function(){},

    detect : function(gids){
        return this.mojoworld.detect(gids);
    },

    train_general : function(gen_id,sgen_id){
        gen_id = gen_id || 0
        sgen_id = sgen_id || 0
        $.log(`contract: train ${gen_id} ${sgen_id}`)
        return this.mojoworld(gen_id,sgen_id,{from:self.acct})
    },

    sell_general : function(){},

    buy_general : function(){},

    start : function(){
        var self = this
        window.proxy = self
        console.log("reloaded")
    }
}
