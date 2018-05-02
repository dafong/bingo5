import axios from 'axios'
import config from '@/common/config.js'
import qs from 'qs';

var baseURL = process.env.API_HOST
class Http {
	constructor () {
		this.init();
	}

	init () {
		console.log('Http 初始化')
		// axios.defaults.baseURL = 'http://127.0.0.1:8000';
		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	}

	get (url, params, sucCB, errCB) {
		axios.get(url, params).then(function (resp) {
			console.log(resp)
			if (sucCB && resp.data.ec === 0) {
				sucCB(resp)
			}
			if (errCB && resp.data.ec !== 0) {
				errCB(resp.ec)
			}
		}).catch(function (err) {
			alert(url + " 请求错误 >>> " + err)
		})
	}

	post (url, params, sucCB, errCB) {
		axios.post(url, qs.stringify(params)).then(function (resp) {
			console.log(resp)
			if (sucCB && resp.data.ec === 0) {
				sucCB(resp)
			}
			if (errCB && resp.data.ec !== 0) {
				errCB(resp.data.ec)
			}
		}).catch(function (err) {
			alert(url + " 请求错误 >>> " + err)
			console.log(err)
		})
	}

}

export default Http
