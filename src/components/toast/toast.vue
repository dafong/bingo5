<template>
    <transition :name="fadeIn">
    <div class="alertBox" v-show="show">
      <div class="box" ref="boxid" id="box" :class="position" v-show="show">
       {{text}}
      </div>
    </div>
   </transition>
</template>
<script>
export default {
    props: {
  show: { // 是否显示此toast
   default: false
  },
  text: { // 提醒文字
   default: 'loading'
  },
  position: { // 提醒容器位置，默认剧中
   default: 'center'
  },
  time: { // 显示时间
   default: 1000
  },
  transition: { // 是否开启动画
   default: true
  }
 },
 //监听显示状态
 watch:{
   show:function(){
     //状态为true时 几秒后隐藏状态，网络上也有他人贡献，但是有bug，因此我改成这种监听的方式，可以无限放心地点
     if(this.show){
      //让toast实时计算高宽剧中
      setTimeout(()=>{
       this.$refs.boxid.style.marginLeft=-(this.$refs.boxid.clientWidth/2)+"px";
       this.$refs.boxid.style.marginTop=-(this.$refs.boxid.clientHeight/2)+"px";
      },10)
      setTimeout(() => {
         this.show = false
      }, this.time)
     }
   }
 },
 computed: {
  translate() { // 根据props，生成相对应的动画
   if (!this.transition){
    return ''
   } else {
    if (this.position === 'top') {
     return 'translate-top'
    } else if (this.position === 'middle') {
     return 'translate-middle'
    } else if (this.position === 'bottom') {
     return 'translate-bottom'
    }
   }
  },
  fadeIn() { // show时来个渐显的效果
   if (!this.transition) {
    return ''
   } else {
    return 'fadeIn'
   }
  }
 }

}


</script>
<style scoped>
.box{
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  background: rgba(0,0,0,.5);
  text-align: center;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
  font-size: .8rem;
  z-index: 2000;
  color: #fff;
 }
 .box.top{
  top: 50px;
  margin-top: 0;
 }
 .box.center{
  top: 50%;
  margin-top: -100px;
 }
 .box.bottom{
  top: auto;
  bottom: 50px;
  margin-top: 0;
 }
 .fadeIn-enter-active, .fadeIn-leave-active{
  transition: opacity .3s;
 }
 .fadeIn-enter, .fadeIn-leave-active{
  opacity: 0;
 }
 .translate-top-enter-active, .translate-top-leave-active{
  transition: all 0.3s cubic-bezier(.36,.66,.04,1);
 }
 .translate-top-enter, .translate-top-leave-active{
  transform: translateY(-50%);
  opacity: 0;
 }
 .translate-middle-enter-active, .translate-middle-leave-active{
  transition: all 0.3s cubic-bezier(.36,.66,.04,1);
 }
 .translate-middle-enter, .translate-middle-leave-active{
  transform: translateY(80%);
  opacity: 0;
 }
 .translate-bottom-enter-active, .translate-bottom-leave-active{
  transition: all 0.3s cubic-bezier(.36,.66,.04,1);
 }
 .translate-bottom-enter, .translate-bottom-leave-active{
  transform: translateY(100%);
  opacity: 0;
 }

</style>
