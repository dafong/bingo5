<template>
	<div class="cell" :class="[{'cell-kong': !is_valid}]" @click="handle_card_clicked" >
        <div style="width:100%; height:100%" v-show="is_valid">
        	<div class="cell-title">
            <div class="country">
            	<img img :src="icon_country">
                <span>{{ info.cfg.name }}</span>
            </div>
            <div class="level">{{lv_desc}}</div>
	        </div>
	        <div class="cell-img" :style="{backgroundImage:'url('+img_card_bg+')'}">
	            <img :src="icon_card">
	            <div class="star">
	                <img v-for="n in info.star" :src="$g.uit.img('star.png')">
	            </div>
	            <div class="cell-count">
	                <div>1</div>
	                <div>2</div>
	                <div>3</div>
	                <div>4</div>

	            </div>
	        </div>
	        <div class="cell-jd">
	            <div class="jl-jd">
	                <div class="jdicon"><img :src="$g.uit.img('card-icon1.png')"></div>
	                <div class="jdt">
	                    <div class="jdman" :style="{width: get_progress('hp',true) + '%'}" :title="info.hp.max">
	                        <div class="jdnow" :style="{width: get_progress('hp',false) + '%'}" :title="info.hp.cur"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="jl-jd-2">
	                <div class="jdicon"><img :src="$g.uit.img('card-icon2.png')"></div>
	                <div class="jdt">
	                    <div class="jdman2" :style="{width: get_progress('atk',true) + '%'}" :title="info.atk.max">
	                        <div class="jdnow2" :style="{width: get_progress('atk',false) + '%'}" :title="info.atk.cur"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="jl-jd-3">
	                <div class="jdicon"><img :src="$g.uit.img('card-icon3.png')"></div>
	                <div class="jdt">
	                    <div class="jdman3" :style="{width: get_progress('lead',true) + '%'}" :title="info.lead.max">
	                        <div class="jdnow3" :style="{width: get_progress('lead',false) + '%'}" :title="info.lead.cur"></div>
	                    </div>
	                </div>
	            </div>
	            <div class="jl-jd-4">
	                <div class="jdicon"><img :src="$g.uit.img('card-icon4.png')"></div>
	                <div class="jdt">
	                    <div class="jdman4" :style="{width: get_progress('wit',true) + '%'}" :title="info.wit.max">
	                        <div class="jdnow4" :style="{width: get_progress('wit',false) + '%'}" :title="info.wit.cur"></div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="cell-footer">
	            <img class="left-img" :src="$g.uit.img('card-price.png')">
	            <p>{{score}}</p>
	            <img class="right-img" :src="$g.uit.img('card-rightbottom2.png')" v-show="is_explore">
	            <img class="right-img" :src="$g.uit.img('card-rightbottom1.png')" v-show="is_train_cd">
	            <img class="right-img1" :src="$g.uit.img('card-saleing.png')" v-show="is_on_sale">
	        </div>
        </div>
    </div>
</template>
<script>
	import Gen from '@/data/gen.js'
	export default {
		data () {
			return {

			}
		},
		props: {
			// 将领记录的相关信息
			info: {}
		},
		computed: {
			is_valid () {
				return this.info.is_valid
			},
			is_explore () {
				return true
			},
			is_train_cd () {
				return true
			},
			is_on_sale () {
				return false
			},
			lv_desc () {
				return 'Lv.' + this.info.base.lv
			},
			icon_country () {
				return $g.uit.img('card-country-shu.png')
			},
			icon_card () {
				return $g.uit.img('card-pangtong.png')
			},
			img_card_bg () {
				return $g.uit.img('card-img-bg.png')
			},
			price () {
				return 0.0306
			},
			score () {
				return this.info.score || 0
			}
		},
		methods: {
			handle_card_clicked () {
				console.log("卡牌点击了")
				// $g.wait.show()
				// let self = this
				// setTimeout(function  () {
				// 	$g.wait.hide()
				// }, 2000)
			},
			get_progress (key, isMax) {
				if (isMax) {
					return this.info[key].max_per
				} else {
					return this.info[key].cur_per
				}
			}
		},

	}
</script>