import Waiting from './waiting.vue'
import Vue from 'vue'

var instance = undefined
var count = 0
class Wait {
	constructor () {
		if (instance) {
			return instance
		}
		instance = this
		this.init()
	}

	init () {
		this.waiting_vue = undefined
	}

	lazy_create () {
		if (this.waiting_vue === undefined) {
			let Wa = Vue.extend(Waiting)
			let $ist = new Wa()
			var el = $ist.$mount().$el
			document.body.appendChild(el)
			this.waiting_vue = $ist
		}
	}

	show () {
		count ++
		if (count > 0) {
			this.lazy_create()
			this.waiting_vue.show()
		}
	}

	hide () {
		count --
		if (count <= 0) {
			this.lazy_create()
			this.waiting_vue.hide()
		}
	}
}

export default Wait

// import Waiting from './waiting.vue'
// let $instance = undefined
// Waiting.install = function  (Vue) {
// 	Vue.component(Waiting.name, Waiting)
// 	Vue.prototype.$wait = {
// 		inst () {
// 			if ($instance  === undefined) {
// 				var Wa = Vue.extend(Waiting)
// 				var $ist = new Wa()
// 				var el = $ist.$mount().$el
// 				document.body.appendChild(el)
// 				$instance = $ist
// 			}
// 			return $instance
// 		}
// 	}
// }

// export default Waiting
