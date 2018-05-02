<template>
	<div class="mojo-dlg" :style="{'z-index': zIndex}" :class="dlgClass" v-show="isVisible">
		<div class="mojo-dlg-mask" v-show="isMask" @click="maskClick">
			<slot name="mask"></slot>
		</div>
		<div class="mojo-dlg-container">
			<button class="close-btn" :click="closeBtnClick"></button>
			<h2 v-if="title" class="mojo-dlg-title">{{title}}</h2>
			<div class="mojo-dlg-content" v-if="$slots.default">
				<slot></slot>
			</div>
			<div class="mojo-dlg-content" v-else v-html="content">
			</div>
			<mojo-btn class="mojo-dlg-btn-left" tag="normal" @click="clickBtnL">{{tipBtnL}}</mojo-btn>
			<mojo-btn class="mojo-dlg-btn-mid" tag="normal" @click="clickBtnM">{{tipBtnM}}</mojo-btn>
			<mojo-btn class="mojo-dlg-btn-right" tag="normal" @click="clickBtnR">{{tipBtnR}}</mojo-btn>
		</div>
	</div>
</template>
<script>
	const COMPONENT_NAME = 'mojo-dlg'
	export default {
		name: COMPONENT_NAME,
		data () {
			return {
				isVisible: false
			}
		},
		props: {
			isMask: {
				type: Boolean,
				default: true
			},
			zIndex: {
				type: Number,
				default: 100
			},
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			tipBtnL: {
				type: String,
				default: '取消'
			},
			tipBtnM: {
				type: String,
				default: '确定'
			},
			tipBtnR: {
				type: String,
				default: '确定'
			},
			btnStyle: {
				// 1: 一个中间按钮 2: 左右两个按钮
				type: Number,
				default: 1
			},
			clickBtnL: {
				type: Function,
				default: function () { alert('点击了左边按钮') }
			},
			clickBtnM: {
				type: Function,
				default: function () { alert('点击了中间按钮') }
			},
			clickBtnR: {
				type: Function,
				default: function () { alert('点击了右边按钮') }
			}

		},
		computed: {
			dlgClass () {
				return ''
			},
			isShowBtnL () {
				return this.btnStyle !== 1
			},
			isShowBtnR () {
				return this.btnStyle !== 1
			},
			isShowBtnM () {
				return this.btnStyle === 1
			}
		},
		methods: {
			show (ops) {
				this.isVisible = true
				for (let op in ops) {
					let val = ops[op]
					if (val !== undefined) {
						this[op] = val
					}
				}
				console.log(this.someTest)
			},
			hide () {
				this.isVisible = false
			},
			closeBtnClick () {
				this.hide()
			},
			maskClick (event) {
				this.$emit('mask-click', event)
			}
		}
	}
</script>
<style>
.mojo-dlg {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
}
.mojo-dlg-mask {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background-color: rgba(37, 38, 45, .4)
}
.mojo-dlg-container {
	position: absolute;
	top: 25%;
	left: 25%;
	width: 50%;
	height: 50%;
	background-color: white;
}
.mojo-dlg-content {
	position: absolute;
	top: 80px;
	left: 10%;
	width: 80%;
	height: 60%;
	background-color: purple;
	text-align: center;;
	font-size: 30px;
	padding-top: 10px;
}
.mojo-dlg-title {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 50px;
	text-align: center;
}
.mojo-dlg-btn-left {
	position: absolute;
	bottom: 50px;
	left: 20%;
	text-align: center;
}
.mojo-dlg-btn-mid {
	position: absolute;
	bottom: 50px;
	left: 40%;
	text-align: center;
}
.mojo-dlg-btn-right {
	position: absolute;
	bottom: 50px;
	left: 60%;
	text-align: center;
}
</style>
