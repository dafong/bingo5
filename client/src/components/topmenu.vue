<template>
    <div class="menu">
        <div class="menu-content">
            <div class="logo" @click="go_test()"></div>
            <ul>
                <li :class="{'current':selectedIdx===idx}" v-for="(op, idx) in links" >
                    <a href="javascript:void(0)" target="_self" @click="handleClick(idx)">{{op.name}}</a>
                    <img class="sanjiao" :src="$g.uit.img('menu-now.png')" v-show="selectedIdx===idx"></li>
                </li>
            </ul>
            <div class="menu-more"></div>
        </div>
        <div class="menu-line"></div>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                is_login: false,
                selectedIdx: 0
            }
        },
        computed: {
            links () {
                let ret = []
                if (this.is_login) {
                    if ($g.dmgr.is_pre_sale()) {
                        ret = [
                            {route: '/intro',   name: this.$t('common.intro')},
                            {route: '/general', name: this.$t('common.my_general')},
                            {route: '/record',  name: this.$t('common.record')}
                        ]
                    } else {
                        ret = [
                            {route: '/intro',   name: this.$t('common.intro')},
                            {route: '/general', name: this.$t('common.my_general')},
                            {route: '/trade',   name: this.$t('common.trade')},
                            {route: '/explore', name: this.$t('common.explore')},
                            {route: '/battle',  name: this.$t('common.battle')},
                            {route: '/team',    name: this.$t('common.team')},
                            {route: '/record',  name: this.$t('common.record')},
                        ]
                    }
                } else {
                    ret = [
                        {route: '/intro',   name: this.$t('common.intro')},
                        {route: '/login',   name: this.$t('common.login')}
                    ]
                }
                return ret
            }
        },
        created () {
            this.is_login = $g.login.is_login
            $g.evt.$on('EK_USER_ALL_LOGIN_OK', ()=>{this.on_login_succ()})
            $g.evt.$on('ROUTER_PATH_CHANGED', (path)=>{this.on_router_changed(path)})
        },
        methods: {
            handleClick (idx) {
                this.selectedIdx = idx
                console.log(this.links[this.selectedIdx].name)
                this.$router.push(this.links[this.selectedIdx].route)
            },
            go_test () {
                this.$router.push('/test')
            },
            on_login_succ () {
                console.log("TopMenu 收到 登录成功消息...")
                console.log($g.login)
                this.is_login = $g.login.is_login
                this.$nextTick(()=>{
                    this.selectedIdx = 0
                    this.$router.replace(this.links[this.selectedIdx].route)
                })
            },
            on_router_changed (path) {
                for (let i = 0; i < this.links.length; i++) {
                    if (path == this.links[i].route) {
                        this.selectedIdx = i
                        break
                    }
                }
            }
        },
        beforeDestroy () {
            // $g.evt.$off('EK_USER_ALL_LOGIN_OK', this.on_login_succ)
            // $g.evt.$on('ROUTER_PATH_CHANGED', this.on_router_changed)
        }
    }
</script>