<template>
	<div class="login-body">
		<div class="login">
		    <div class="login-div">
		        <div class="login-div-unit">
		            <p>{{$t('login.wallet')}}</p>
		            <div class="login-div-unit-kuang">{{wallet}}</div>
		            <!-- <div class="login-div-unit-kuang">
		            	<input type="text" class="login-input" :placeholder="$t('login.wallet_tip')" v-model="wallet">
		            </div> -->
		        </div>
		        <div class="login-div-unit">
		            <p>{{$t('login.set_name')}}</p>
		            <div class="login-div-unit-kuang">
		            	<!-- <span>请设定您的昵称</span> -->
		            	<input type="text" class="login-input" :placeholder="$t('login.set_name_tip')" v-model="name">
		            </div>
		        </div>
		        <div class="login-div-unit">
		            <p>{{$t('login.email')}}</p>
		            <div class="login-div-unit-kuang">
		            	<!-- <span>请输入您的邮箱地址</span> -->
		            	<input type="text" class="login-input" :placeholder="$t('login.email_tip')" v-model="email">
		            </div>
		        </div>

		    </div>
		    <a class="login-btn" @click="on_login">{{$t('common.sure')}}</a>
		    <div class="login-ps">
		        {{$t('login.import_title')}}</br>
		        {{$t('login.import_msg')}}
		    </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import mojo from '@/util/mojo.js'
	export default {
		data () {
			return {
				is_eth_login: false,
				name: '',
				email: ''
			}
		},
		created () {
			this.is_eth_login = $g.login.is_eth_login
			$g.evt.$on("LOGIN_ETH_ACC_CHANGED", (data)=>{this.on_login_eth_changed(data)})
		},
		computed: {
			wallet () {
				let ret = ''
				if (!this.is_eth_login) {
					ret = '请先登录 MetaMask'
				} else {
					ret = mojo.acct
				}
				return ret
			}
		},
		methods: {
			on_login () {
				console.log('wallet = ' + this.wallet, 'name = ' + this.name, 'email = ' + this.email)
				let self = this
				$g.login.login_crypto((resp)=>{
					let data = resp.data
					$g.login.login_srv(self.wallet, self.name, self.email, data.sign, (rsp)=>{
						console.log('登录成功...')
					}, (er)=>{
						console.log('登录失败 er = ', er)
					})
				}, (ec)=>{
					console.log('Sign获取失败 ec = ', ec)
				})
			},
			on_login_eth_changed (acct) {
				this.is_eth_login = acct.is_login
			}
		}
	}
</script>
<style type="text/css" scoped>
.login-input {
	width: 435px;
    height: 42px;
    border-style: none;
    color: #ffc546;
    font-size: 22px;
    line-height: 42px;
    background-color: transparent;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color: rgba(255,197,70,.3);
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color: rgba(255,197,70,.3);
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color: rgba(255,197,70,.3);
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
   color: rgba(255,197,70,.3);
}
input:focus {
	outline: none;
}
</style>