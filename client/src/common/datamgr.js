
import Vue from 'Vue'
import mojo from '@/util/mojo.js'
import {general_data as cfg_gen, cost_data as cfg_cost} from '@/data/data'
var inst = undefined
class DataMgr {
	constructor () {
		if (inst) {
			return inst
		}
		inst = this;
		this.init();
	}

	init () {
		console.log('DataMgr 初始化 >>>')
		// 玩家将领数据{id:gen}
		this.gen_cache = new Map()
		this.gen_ids = []
	}

	get_player_gen_ids (cb) {
		let self = this
		mojo.get_player_general_ids().then((ids)=>{
			self.gen_ids = []
			for (let i = 0; i < ids.length; i++) {
				self.gen_ids.push(Number(ids[i]))
			}
            cb(self.gen_ids)
        }, (err)=>{
        	alert('将领列表 ids 获取失败 ec = ' + err)
        })
	}

	get_player_gen_by_ids (ids) {
		let self = this
		let gen_has  = new Map()
		let ids_not_has = []
		for (let i = 0; i < ids.length; i++) {
			let id = Number(ids[i])
			let gen = self.gen_cache.get(id)
			if (gen) {
				gen_has.set(id, gen)
			} else {
				ids_not_has.push(id)
			}
		}
		for (let i = 0; i < ids_not_has.length; i++) {
			let id = ids_not_has[i]
            mojo.get_player_general(id).then((vals)=>{
                let t = {
                	id: id,
                    gid: Number(vals[0]),
                    sid: Number(vals[1]),
                    owner: String(vals[2]),
                    pots: Number(vals[3]),
                    lv: Number(vals[4]),
                    hp: Number(vals[5]),
                    atk: Number(vals[6]),
                    lead: Number(vals[7]),
                    wit: Number(vals[8])
                }
                self.gen_cache.set(id, t)
                $g.evt.$emit('EK_DTMGR_GEN_UPDATE', {id:id, gen:t})
                // setTimeout(function  () {
                //     $g.evt.$emit('EK_DTMGR_GEN_UPDATE', {id:id, gen:t})
                // }, 3000)
            }, (err)=>{
            	let et = {
            		id: id,
                    gid: 0,
                    lv: 1,
                    hp: 0,
                    atk: 0,
                    lead: 0,
                    wit: 0
            	}
            	$g.evt.$emit('EK_DTMGR_GEN_UPDATE_ERR', {id:id, err:err, gen:et})
            })
        }
        return gen_has
	}

	// -------------- 配置数据 -----------------
	get_cfg_gen_by_ids (cids) {
		let ret = new Map()
		for (let i = 0; i < cids.length; i++) {
			let cid = cids[i]
			let gen = cfg_gen.get(cid)
			ret.set(cid, gen)
		}
		return ret
	}

	is_pre_sale () {
		return true
	}

}

export default DataMgr
