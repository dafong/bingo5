const getImg = function (name) {
	return require('../assets/image/' + name)
}

const uiutil = {
	img: getImg
}

export default uiutil
