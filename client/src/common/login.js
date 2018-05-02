import mojo from '@/util/mojo.js'
var instance = undefined
class Login {
	constructor () {
		if (instance) {
			return instance
		}
		instance = this
		this.init()
	}

	init () {
		console.log("Login 初始化 >>>")
		// localStorage.clear()
		
		this.is_eth_login  = false

		this.is_login = false 
		this.is_user_login = false 

		this.init_info()

		this.is_user_login = this.token !== ''
		this.is_login = this.is_eth_login && this.is_user_login

		this.be_invited_key = undefined

		
		$g.evt.$on("MOJO_ETH_ACC_CHANGED", (data)=>{
			this.on_mojo_eth_acc_changed(data)
		})
	}

	login_srv (addr, name, email, sign, sucCB, errCB) {

		let params = {
			address: addr,
			name: name,
			email: email,
			sig: sign
		}
		let self = this
		$g.http.post('/api/player/login', params, function  (resp) {
			if (resp.data.ec === 0) {
				let rsp = resp.data.data
				let data   = {}
				data.address = rsp.address
				data.token = rsp.token
				data.name  = name
				data.email = email
				data.sign  = sign
				self.on_login_srv_succ(data)
				if (sucCB) {
					sucCB(resp)
				}
			} else {
				if (errCB) {
					errCB(resp.data.ec)
				}
			}
		}, function  (ec) {
			if (errCB) {
				errCB(ec)
			}
		})
	}

	login_crypto (sucCB, errCB) {
		mojo.login().then((resp)=>{
			if (resp.ec === 0) {
				sucCB(resp)
			} else {
				errCB(resp)
			}
		})
	}

	on_login_srv_succ (data) {
		// console.log(data)
		this.reset_info(data)

		this.check_is_login_ok()
	}

	on_mojo_eth_acc_changed (data) {
		let self = this
		self.is_eth_login = data.is_login
		self.init_info()

		self.check_is_login_ok()

		$g.evt.$emit('LOGIN_ETH_ACC_CHANGED', {is_login: self.is_eth_login})
	}

	check_is_login_ok () {
		let self = this

		self.is_user_login = self.token !== ''
		console.log(self.token)
		console.log(self.address)
		self.is_login = self.is_eth_login && self.is_user_login

		if (self.is_login) {
			$g.evt.$emit('EK_USER_ALL_LOGIN_OK')
		}
		console.log($g.evt)
	}

	// get_acc_storage_key () {
	// 	let key = 'MoJo_Login_' + mojo.acct
	// 	console.log('key >>> ', key)
	// 	return key
	// }

	init_info () {
		let self = this
		self.address  = ''
		self.token = ''
		self.name  = ''
		self.email = ''
		self.sign  = ''
		let acc = mojo.acct
		if (acc!==undefined) {
			self.address  = localStorage.getItem('address_' + acc) || ''
			self.token = localStorage.getItem('token_' + acc) || ''
			self.name  = localStorage.getItem('name_' + acc) || ''
			self.email = localStorage.getItem('email_' + acc) || ''
			self.sign  = localStorage.getItem('sign_' + acc) || ''
		}
	}

	reset_info (data) {
		let self = this
		let acc = mojo.acct
		self.address  = data.address
		self.token = data.token
		self.name  = data.name
		self.email = data.email
		self.sign  = data.sign
		localStorage.setItem('address_' + acc, data.address)
		localStorage.setItem('token_' + acc, data.token)
		localStorage.setItem('name_' + acc, data.name)
		localStorage.setItem('email_' + acc, data.email)
		localStorage.setItem('sign_' + acc, data.sign)
	}
}

export default Login
