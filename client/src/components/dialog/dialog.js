import Dialog from './dialog.vue'

Dialog.install = function (Vue) {
	Vue.component(Dialog.name, Dialog)
	Vue.prototype.$dialog = {
		create () {
			var Dlg = Vue.extend(Dialog)
			var $ist = new Dlg()
			var el = $ist.$mount().$el
			document.body.appendChild(el)
			return $ist
		}
	}
}

export default Dialog
