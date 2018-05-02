import Button from './button/button.js'
import Dialog from './dialog/dialog.js'
// import Waiting from './waiting/waiting.js'

const components = [
	Button,
	Dialog
]

function install (Vue) {
	if (install.installed) {
		return
	}
	install.installed = true

	components.forEach(
		(Comp) => {
			Comp.install(Vue)
		}
	)
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

const mojoui = {
	verson: '1.0.0',
	install
}

export default mojoui
