let base_url = ''


if (process.env.NODE_ENV == 'development') {
	base_url = 'http://127.0.0.1:8000/api'

}else if(process.env.NODE_ENV == 'production'){
	base_url = 'http://127.0.0.1:8000/api'
}
const config = {
	base_url: base_url
}

export default config
