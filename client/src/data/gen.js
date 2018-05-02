import {general_data as cfg_gen, cost_data as cfg_cost} from '@/data/data'
import * as calc from '@/data/calc.js'
import Enum from '@/common/enum.js'

class gen {
	constructor (op) {
		this.init()
		this.refresh(op)
	}
	init () {
		this.base = undefined,
		this.upd = {hp:0, atk:0, lead:0, wit:0}
		this.cfg  = {name: ''}
		this.hp   = {cur: 0, max: 0, curPer: 0, max_per: 0}
		this.atk  = {cur: 0, max: 0, curPer: 0, max_per: 0}
		this.lead = {cur: 0, max: 0, curPer: 0, max_per: 0}
		this.wit  = {cur: 0, max: 0, curPer: 0, max_per: 0}
		this.star = 0
		this.score= 0
		this.relation = []
		this.skill_lv = 1
		this.is_valid = false
	}

	refresh (op) {
		this.base = op
		if (!op || op.gid===0) {
			return
		}
		// 配置信息
		this.cfg  = cfg_gen.get(op.gid)
		// ------ 四维属性 ------
		let keys = ['hp', 'atk', 'lead', 'wit']
		// 四维成长值
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			this.upd[key] = calc.calc_val_per_lv(this.cfg[key], this.base[key])
		}
		//四维总值
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			let e_attr = i + 1
			let curVal = calc.get_gen_cur_val(op.gid, e_attr, op.lv, op[key], 1)
			let maxVal = calc.get_gen_max_val(op.gid, e_attr, op[key], op.exp)
			let curPer = curVal * 100 / calc.GEN_MAX_ATTR[key]
			let maxPer = maxVal * 100 / calc.GEN_MAX_ATTR[key]
			this[key] = {
				cur: curVal.toFixed(2),
				max: maxVal.toFixed(2),
				cur_per: curPer.toFixed(2),
				max_per: maxPer.toFixed(2)
			}
			
		}
		// 星级
		this.star = 6 - this.cfg.rarity
		// 羁绊关系
		let rela = []
		let relas = this.cfg.relation.split(';')
		for (let i = 0; i < relas.length; i++) {
			let r = relas[i]
			if (r.trim() === "") {continue}
			let t = r.split('|')
			if (t.length === 3) {
				rela.push({
					id: Number(t[0]),
					type: Number(t[1]),
					val: Number(t[2])
				})
			} else {
				console.error("将领羁绊配置错误 >>> id = " + this.cfg.gid + " relation = " + this.cfg.relation)
			}
		}
		this.relation = rela
		// 评分
		this.score = calc.get_gen_score(this.upd, this.cfg, this.relation, this.skill_lv).toFixed(2)
		this.is_valid = true
	}

}

export default gen

