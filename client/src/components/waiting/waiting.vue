<template>
	<div class="waiting" :style="{'z-index': zIndex}" v-show="isShow">
		<span class="waiting-content">Loading ...</span>
	</div>
</template>
<script>
	export default {
		name: 'waiting',
		data () {
			return {
				isShow: false,
				zIndex: 100
			}
		},
		methods: {
			show () {
				this.isShow = true
			},
			hide () {
				let self = this
				setTimeout(function  () {
					self.isShow = false
				}, 1000)
			}
		}
	}
</script>
<style type="text/css">
.waiting {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.5);
}
.waiting-content {
	position: absolute;
	top: 50%;
	left: 0px;
	width: 100%;
	height: 50px;
	text-align: center;
	color: red;
	font-size: 50px;
}
</style>