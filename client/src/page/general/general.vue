<template>
<div class="body-contant">
	<div class="jl-search">
        <div class="count">
            <div class="jl-count">{{gen_count_show}}</div>
            <div class="jl-count1" @click="on_recycle()"></div>
        </div>
        <div class="jl-sx">
            <div class="sx-unit">
                <div class="sx-unit1">
                    <div class="sx-unit-left">{{$t('common.star')}}</div>
                    <div class="sx-unit-right">{{star_show}}</div>
                </div>
                <div class="sx-unit1-content">
                    <div class="sx-unit1-content1">
                        <a href="javascript:void(0)" v-for="(s, s_idx) in stars" :key="s_idx" @click="on_flter_star_changed(s.tag)">{{s.name}}</a>
                    </div>
                </div>
            </div>
            <div class="sx-unit">
                <div class="sx-unit1">
                    <div class="sx-unit-left">{{$t('common.nation')}}</div>
                    <div class="sx-unit-right">{{nation_show}}</div>
                </div>
                <div class="sx-unit1-content">
                    <div class="sx-unit1-content1">
                        <a href="javascript:void(0)" v-for="(na, n_idx) in nations" :key="n_idx" @click="on_flter_nation_changed(na.tag)">{{na.name}}</a>
                    </div>
                </div>
            </div>
            <div class="sx-unit">
                <div class="sx-unit1">
                    <div class="sx-unit-left">{{$t('common.sort')}}</div>
                    <div class="sx-unit-right">{{sort_show}}</div>
                </div>
                <div class="sx-unit1-content">
                    <div class="sx-unit1-content1">
                        <a href="javascript:void(0)" v-for="(s, s_idx) in sorts" :key="s_idx" @click="on_sort_key_changed(s.tag)">{{s.name}}</a>
                    </div>
                </div>
            </div>
            <!-- <div class="sx-px"></div> -->
            <div class="sx-px" @click="sort_asc = !sort_asc" :class="{flipy: sort_asc}"></div>
        </div>
        <div class="jlsearch">
            <!-- <div class="jlsearch-left">{{$t('common.search_card')}}</div> -->
            <div class="jlsearch-left">
                <input type="text" class="search_input" :placeholder="$t('common.search_card')" v-model="search_word">
            </div>
            <div class="jlsearch-right" @click="on_search_word()"></div>
        </div>
    </div>
	<!--主体-->
	<div class="box">
	    <card v-for="(gen, idx) in gens_show" :key="idx" :info="gen" ></card>
	</div>
    <!--分页-->
    <div class="fenye" v-show="page_cnt > 1 ">
        <ul class="pagination">
            <li><a href="javascript:void(0)"><img class="left-arrow" :src="$g.uit.img('arrow-left.png')" @click="on_page_left_arrow()"></a></li>
            <li v-for="(page, idx) in page_show" :key="idx">
                <a href="javascript:void(0)" :class="{active:page_num === page}" @click="on_page_num_clicked(page)">
                    {{page}}
                </a>
            </li>
            <li><a href="javascript:void(0)"><img class="left-arrow" :src="$g.uit.img('arrow-right.png')" @click="on_page_right_arrow()"></a></li>
        </ul>
    </div>
	<div class="footer"></div>
</div>
</template>
<script>
	import card from '@/components/card/card.vue'
    import mojo from '@/util/mojo.js'
    import Enum from '@/common/enum.js'
    import Gen from '@/data/gen.js'
    const Max_PER_PAGE = 12
	export default {
		name: 'General',
        is_des: false,
        gens: undefined,
        data () {
            return {
                // 状态： show:将领列表, recycle：回收, sale:出售
                state: 'show',
                //将领实例id
                ids_all: [],
                // 过滤 星级 0 代表全部
                ft_star: 0,
                // 过滤 国家 0 代表全部
                ft_nation: 0,
                // 排序条件 ('lv','price','hp','atk', 'lead','wit')
                sort_key: 'lv',
                // 排序顺序
                sort_asc: false,
                // 将领数据是否获取完毕
                is_data_ok: false,
                // 当前页码
                page_num: 1,
                stars: [
                    {tag: 0, name: this.$t('common.all')},
                    {tag: 3, name: this.$t('common.star_3')},
                    {tag: 4, name: this.$t('common.star_4')},
                    {tag: 5, name: this.$t('common.star_5')}
                ],
                nations: [
                    {tag: 0, name: this.$t('common.all')},
                    {tag: 1, name: this.$t('common.nation_shu')},
                    {tag: 2, name: this.$t('common.nation_wei')},
                    {tag: 3, name: this.$t('common.nation_wu')},
                    {tag: 4, name: this.$t('common.nation_qun')}
                ],
                sorts: [
                    {tag: 'lv', name: this.$t('common.lv')},
                    {tag: 'price', name: this.$t('common.price')},
                    {tag: 'hp', name: this.$t('common.hp')},
                    {tag: 'atk', name: this.$t('common.atk')},
                    {tag: 'lead', name: this.$t('common.lead')},
                    {tag: 'wit', name: this.$t('common.wit')}
                ],
                search_word: ''
            }
        },
		components: {
			card
		},
        computed: {
            gen_count_show () {
                let ret = ''
                if (this.is_data_ok) {
                    ret = this.$t('common.has_gen') + this.gens.size + this.$t('common.ming')
                }
                return ret
            },
            star_show () {
                let s = ''
                for (let i = 0; i < this.stars.length; i++) {
                    if (this.ft_star === this.stars[i].tag) {
                        s = this.stars[i].name
                        break
                    }
                }
                return s
            },
            nation_show () {
                let s = ''
                for (let i = 0; i < this.nations.length; i++) {
                    if (this.ft_nation === this.nations[i].tag) {
                        s = this.nations[i].name
                        break
                    }
                }
                return s
            },
            sort_show () {
                let s = ''
                for (let i = 0; i < this.sorts.length; i++) {
                    if (this.sort_key === this.sorts[i].tag) {
                        s = this.sorts[i].name
                        break
                    }
                }
                return s
            },
            gens_show_all () {
                if (!this.is_data_ok) { return [] }

                console.log('刷新需要展示的将领 ...')

                let self = this
                let gens = []
                for (let gen of this.gens.values()) {
                    let flag_star = false
                    let flag_nation = false
                    let flag_search = false
                    // console.log(gen.star)
                    // console.log(this.ft_star)
                    if (this.ft_star === 0){
                        flag_star = true
                    } else {
                        flag_star = gen.star === this.ft_star
                    }
                    if (this.ft_nation === 0){
                        flag_nation = true
                    } else {
                        flag_nation = gen.cfg.country === this.ft_nation
                    }
                    let word = this.search_word.trim()
                    if (word === '') {
                        flag_search = true
                    } else {
                        flag_search = (gen.cfg.name.indexOf(word) >= 0)
                    }
                    if (flag_star && flag_nation && flag_search) {
                        gens.push(gen)
                    }
                }
                gens.sort(function  (a, b) {
                    let ret = a.base[self.sort_key] - b.base[self.sort_key]
                    if (!self.sort_asc) {
                        ret = ret * (-1)
                    }
                    return ret
                })
                
                console.log("当前所有满足条件显示的将领 >>> ")
                console.log(gens)
                return gens
            },
            gens_show () {
                let start = (this.page_num-1) * Max_PER_PAGE
                let gens = this.gens_show_all.slice(start, start + Max_PER_PAGE)
                console.log("当前显示的将领 >>> ")
                console.log(gens)
                return gens
            },
            page_cnt () {
                return Math.ceil(this.gens_show_all.length / Max_PER_PAGE)
            },
            page_show () {
                let ret = []
                if (this.page_cnt <= Max_PER_PAGE) {
                    for (let i = 1; i <= this.page_cnt; i++) {
                        ret.push(i)
                    }
                    return ret
                }
                let c = Math.floor(this.page_num / 10)
                let start = c * 10 + 1
                let count = this.page_cnt - start + 1
                if (count <= Max_PER_PAGE) {
                    for (let i = start; i <= this.page_cnt; i++) {
                        ret.push(i)
                    }
                } else {
                    for (let i = start; i <= start + 10; i++) {
                        ret.push(i)
                    }
                    ret.push('…')
                    ret.push(this.page_cnt)
                }
                return ret
            }
        },
        created () {
            this.init()
            this.req_gen_list()
        },
        methods: {
            init () {
                this.is_des = false
                this.is_data_ok = false
                this.gens = new Map()
                $g.evt.$on('EK_DTMGR_GEN_UPDATE', this.on_gen_update)
                $g.evt.$on('EK_DTMGR_GEN_UPDATE_ERR', this.on_gen_update_err)
                $g.evt.$on('EK_USER_ALL_LOGIN_OK', this.req_gen_list)
            },
            req_gen_list () {
                let self = this
                if (!$g.login.is_login) {return}
                $g.wait.show()
                $g.dmgr.get_player_gen_ids((ids)=>{
                    $g.wait.hide()
                    if (self.is_des) {
                        return
                    }
                    self.ids_all = ids || []
                    let gens = $g.dmgr.get_player_gen_by_ids(ids)
                    console.log('获取了缓存将领数据个数 = ' + gens.size)
                    for (let val of gens.values()) {
                        let gen = new Gen(val)
                        self.gens.set(val.id, gen)
                    }
                    self.check_is_data_ok()
                })
            },
            on_gen_update (data) {
                let gen = new Gen(data.gen)
                this.gens.set(data.id, gen)
                this.check_is_data_ok()
            },
            on_gen_update_err (data) {
                let gen = new Gen(data.gen)
                this.gens.set(data.id, gen)
                this.check_is_data_ok()
            },
            on_flter_star_changed (star) {
                this.ft_star = star
            },
            on_flter_nation_changed (nation) {
                this.ft_nation = nation
            },
            on_sort_key_changed(key) {
                this.sort_key = key
            },
            check_is_data_ok () {
                if (this.gens.size === this.ids_all.length) {
                    console.log('数据获取OK ...')
                    this.is_data_ok = true
                }
            },
            on_page_num_clicked (page) {
                if (page === '…') {return}
                this.page_num = page
            },
            on_page_left_arrow () {
                if (this.page_num === 1) {return}
                this.page_num --
            },
            on_page_right_arrow () {
                if (this.page_num === this.page_cnt) {return}
                this.page_num ++
            },
            on_recycle () {
                console.log("回收按钮")
            },
            on_search_word () {

            }
        },
        beforeDestroy () {
            this.is_des = true
            console.log('beforeDestroy ...')
            $g.evt.$off('EK_DTMGR_GEN_UPDATE', this.on_gen_update)
            $g.evt.$off('EK_DTMGR_GEN_UPDATE_ERR', this.on_gen_update_err)
        }
	}
</script>
<style type="text/css" scoped>

.flipy{
    -moz-transform:scaleY(-1);
    -webkit-transform:scaleY(-1);
    -o-transform:scaleY(-1);
    transform:scaleY(-1);
    /*IE*/
    filter:FlipV;
}
.search_input {
    position: relative;
    left: 0px;
    top: 0px;
    width: 190px;
    height: 36px;
    background-color: transparent;
    border-style: none;
    color: #d3dc00;
    font-size: 20px;
}
input:focus {
    outline: none;
}
</style>