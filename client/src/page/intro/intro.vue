<template>
	<div>
		<div class="presale">
			<video autoplay="" loop="" :poster="$g.uit.img('index/index-bg1.jpg')" >
		        <source :src="$g.uit.img('index/yushou1.webm')" type="video/webm">
		        <!-- <source :src="$g.uit.img('index/yushou1.mp4')" type="video/mp4"> -->
		    </video>
		    <!-- <video autoplay="" loop="" poster="image/index/index-bg1.jpg" >
		        <source src="image/index/yushou1.webm" type="video/webm">
		        <source src="image/index/yushou1.mp4" type="video/mp4">
		    </video> -->
		    <div class="presale-content">
		        <div class="presale-content-date">{{time_limit}}</div>
		        <div class="presale-content-saled">{{$t('common.sold')}}<span>{{sold_cnt}}</span>/{{sell_max}}</div>
		        <a href="javascript:void(0)" class="presale-conten-btn" @click="buy_general">
		            <div class="presale-conten-btn-p">{{desc_btn_buy}}</div>
		        </a>
		    </div>
		</div>
		<div class="apply" v-show="!is_got_free">
		    <div class="apply-content">
		        <div class="apply-content-box">
		            <div class="apply-card">
		                <div class="apply-card-cell"><img :src="$g.uit.img('card-pangtong.png')"></div>
		                <p>庞统</p>
		            </div>
		            <div class="apply-card">
		                <div class="apply-card-cell"><img :src="$g.uit.img('card-pangtong.png')"></div>
		                <p>庞统</p>
		            </div>
		            <div class="apply-card">
		                <div class="apply-card-cell"><img :src="$g.uit.img('card-pangtong.png')"></div>
		                <p>庞统</p>
		            </div>
		            <div class="apply-card">
		                <div class="apply-card-cell"><img :src="$g.uit.img('card-pangtong.png')"></div>
		                <p>庞统</p>
		            </div>
		            <div class="apply-card">
		                <div class="apply-card-cell"><img :src="$g.uit.img('card-pangtong.png')"></div>
		                <p>庞统</p>
		            </div>
		        </div>
		        <div class="apply-price">
		            <div class="apply-price-content">{{price_get}} </div>
		        </div>
		        <a href="javascript:void(0)" class="apply-btn" @click="get_free">{{desc_btn_get}}</a>
		    </div>
		    <div class="apply-yaoqing">
		        <div class="apply-yaoqing-content">
		            <div class="apply-yaoqing-p">
		                <span>邀请1人成功</span>领取免费将领或预购将领，即可获得<span> 1 Edom</span>，Edom是使用Erc20合约生成的数字币，之后可用于购买将领`流通等。
		            </div>
		            <div class="apply-yaoqing-https">
		                <div class="apply-yaoqing-https-p">邀请链接：</div>
		                <div id="invite_link" class="apply-yaoqing-https-kuang">{{invite_link}}</div>
		                <a href="javascript:void(0)" class="apply-yaoqing-btn" @click="copy_link">复制</a>
		            </div>
		            <div class="apply-yaoqing-earn">
		                <p>您已赚取：<span>{{earn}}</span></p>
		            </div>
		        </div>
		    </div>
		</div>
		<!--介绍-->
		<div class="intro">
		    <div class="intro-1">
		        <div class="intro-1-img">
		            <div class="intro-1-img-p">具特色的三国名将等待与你相遇，为你所用。每位将领出现时能力、成长与战法都有所不同，百名大将变化出千万种不同卡牌。枭雄曹操、卧龙孔明、战神吕布统统收入囊中。
		            </div>
		        </div>
		    </div>
		    <div class="intro-2">
		        <div class="intro-2-img">
		            <div class="intro-2-img-p">飞将鬼谋缘分各异、三十六计战法不同，种种都是你需要考量的策略。通过你的智慧，培养你的将领、搭配你的队伍，爆发更强战力，赢得更多战斗，获得更多奖励。
		            </div>
		        </div>
		    </div>
		    <div class="intro-3">
		        <div class="intro-3-img">
		            <div class="intro-3-img-p">
		                以太三国是架构在区块链技术上的三国战争游戏，每张名将卡牌都是不可销毁的收藏品。这里为你提供自由的交易平台，你可以通过自由交易获取你想要的将领，亦或出售你培养的卡牌赚取财富。
		            </div>
		        </div>
		    </div>
		</div>
	</div>
</template>
<script>
	import uit from '@/util/uiutil.js'
	import mojo from '@/util/mojo.js'
	import axios from 'axios'
	export default {
		data () {
			return{
				is_login: false,
				is_got_free: false,
				sell_max: 5000,
				sold_cnt: 0,
				edom: 0,
				invite_link:''
			}
		},
		created () {
			this.is_login = $g.login.is_login
			
			console.log($g.login)

			this.update_get_free()
			this.update_sold_cnt()
			this.update_edom()
			this.update_invite_link()

			$g.evt.$on('MOJO_ETH_NETWORK_CHANGED', (data)=>{this.on_mojo_net_changed(data)})
			$g.evt.$on('EK_USER_ALL_LOGIN_OK', ()=>{this.on_login_succ()})
		},
		computed: {
			time_limit () {
				return "6月21日23:59 (GMT+0)"
			},
			price_buy () {
				return 0.01
			},
			price_get () {
				return 0.00
			},
			earn () {
				return this.edom+' Edmo'
			},
			// invite_link () {
			// 	// return 'http://xxxx.com'
			// 	if (this.is_login) {
			// 		return 'http://localhost:8081/#/invite?' + $g.login.address
			// 	} else {
			// 		return this.$t('login.login_to_invite')
			// 	}
			// },
			desc_btn_buy () {
				if (this.is_login) {
					return this.price_buy + '' + this.$t('common.buy')
				} else {
					return this.$t('login.login_to_buy')
				}
			},
			desc_btn_get () {
				if (this.is_login) {
					return this.$t('common.get')
				} else {
					return this.$t('login.login_to_get')
				}
			},

			poster_bg () {
				return require('@/assets/image/index/index-bg1.jpg')
			}
		},

		methods: {
			buy_general () {
				if (this.is_login) {
					mojo.presell().then((data)=>{
			        	alert('成功购买了一个将领')
			        	this.update_sold_cnt()
			        })
				} else {
					this.$router.push('/login')
				}
			},
			get_free () {
				if (this.is_login) {
					mojo.get_free($g.login.be_invited_key).then((resp)=>{
						alert('免费领取了一个将领')
						this.is_got_free = true
					})
				} else {
					this.$router.push('/login')
				}
			},
			copy_link () {
				var txt=document.getElementById("invite_link").innerText;
		        var oInput = document.createElement('input');
		        oInput.value = txt;
		        document.body.appendChild(oInput);
		        oInput.select(); // 选择对象
		        document.execCommand("Copy"); // 执行浏览器复制命令
		        oInput.className = 'oInput';
		        oInput.style.display='none';
		        alert('复制成功');
		        document.body.removeChild(oInput);
		        this.update_invite_link()
			},
			update_get_free () {
				if (!mojo.isConnected || !this.is_login) { return }
				let self = this
				console.log(this.is_login)
				mojo.is_get_free().then((is_get)=>{
		            console.log('是否免费领取过 >>> ', is_get)
					self.is_got_free = is_get
		        })
			},
			update_sold_cnt () {
				if (!mojo.isConnected) { return }
				let self = this
				mojo.get_preselled_count().then((val)=>{
		            self.sold_cnt = Number(val)
		            console.log('一艘数量 >>> ', self.sold_cnt)
		        })
			},
			update_edom () {
				if (!mojo.isConnected || !this.is_login) { return }
				mojo.get_player_state().then((info)=>{
					console.log("玩家信息 >>> ", info)
					this.edom = Number(info[1])
				})
			},
			update_invite_link () {
				let self = this
				if (this.is_login) {
					let link = 'http://localhost:8081/%23/invite?' + $g.login.address
					// 新浪微博生成短地址，用的 iPad新浪客户端App Key：2849184197
					axios.get('/weibo/shorten.json?source=2849184197&url_long='+link, {}).then(function (resp) {
						console.log(resp)
						console.log(resp.data.urls[0].url_short)
						self.invite_link = resp.data.urls[0].url_short
					}).catch(function (err) {
						alert(url + " 请求错误 >>> " + err)
					})
				} else {
					self.invite_link = this.$t('login.login_to_invite')
				}
			},
			on_mojo_net_changed (data) {
				if (!data.is_ok) {return}
				this.update_get_free()
				this.update_sold_cnt()
				this.update_edom()
				this.update_invite_link()
			},
			on_login_succ () {
				this.is_login = true
				this.update_get_free()
				this.update_sold_cnt()
				this.update_edom()
				this.update_invite_link()
			}
		},
		beforeDestroy () {
			// $g.evt.$off("MOJO_ETH_NETWORK_CHANGED", this.on_mojo_net_changed)
			// $g.evt.$off('EK_USER_ALL_LOGIN_OK', this.on_login_succ)
		}
	}
</script>
<style type="text/css">

</style>