import {general_data as cfg_gen, cost_data as cfg_cost} from '@/data/data.js'
import Enum from '@/common/enum.js'

/***** 生命、武力、统率、智谋 属性四维计算 ******/
//将领最高等级
export const GEN_MAX_LV = 30	
// 将领各属性的不可达到的最大值（策划给定）
export const GEN_MAX_ATTR = { 
	hp: 2500,
	atk: 500,
	lead: 500,
	wit: 500
}

// 【公式】成长值 = 基础值 * 成长系数 / 10000 
export function calc_val_per_lv  (base_val, rate) {
	return base_val * rate  / 10000
}
// 计算给定等级的属性值
// 【公式】最终值 = 基础值 + 等级 * 成长值 + 陪练额外值
export function calc_val_by_lv (base_val, lv, val_per_lv, ex_val) {
	return base_val + (lv-1) * val_per_lv + ex_val
}
//  计算维度属性最大值
// 【公式】最终值 = 基础值 + Max等级 * 成长值 + 陪练额外值
export function calc_val_max_lv (base_val, val_per_lv, ex_val) {
	return base_val + GEN_MAX_LV * val_per_lv + ex_val
}

export function get_attr_key (attrType) {
	let key
	switch (attrType){
		case Enum.Attr.Hp:
			key = 'hp'
			break;
		case Enum.Attr.Atk:
			key = 'atk'
			break;
		case Enum.Attr.Lead:
			key = 'lead'
			break;
		case Enum.Attr.Wit:
			key = 'wit'
			break;
		default:
			key = undefined
	}
	return key
}

// 获取属性值
// id: 将领配置id，type: 属性类型，lv: 当前等级， rate: 当前属性成长系数， ex_val: 当前属性陪练附加值
export function get_gen_cur_val (id, attrType, lv, rate, ex_val = 0) {
	let cfg = cfg_gen.get(id)
	if (!cfg) {
		return 0
	}
	let key = get_attr_key(attrType)
	let base_val = cfg[key]
	let val_per_lv = calc_val_per_lv(base_val, rate)
	let ret = calc_val_by_lv(base_val, lv, val_per_lv, ex_val)
	return ret
}
export function get_gen_max_val (id, attrType, rate, ex_val = 0) {
	return get_gen_cur_val(id, attrType, GEN_MAX_LV, rate, ex_val)
}

// 【公式】评分 = （基础生命/5 + 另外三维基础值）/ 20 + 所有羁绊加成 / 4 + （生命成长值/5 + 另外三维成长值）/ 0.9 + 战法等级*7
export function get_gen_score (upd, cfg, relation, lv) {
	let part_1 = (cfg.hp/5 + cfg.atk + cfg.lead + cfg.wit)/20
	let part_2 = 0
	for (let i = 0; i < relation.length; i++) {
		part_2 += (relation[i].val/4)
	}
	let part_3 = (upd.hp/5 + upd.atk + upd.lead + upd.wit)/0.9
	let part_4 = lv*7
	return (part_1 + part_2 + part_3 + part_4)
}

