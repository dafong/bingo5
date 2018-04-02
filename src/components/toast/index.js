import Toast from './toast.vue'
var ToastPlugin = {}
const install = function(Vue,options){
    if(document.getElementsByClassName('alertBox').length){
        return
    }
    var ToastTpl = Vue.extend(Toast)
    var $vm = new ToastTpl()
    var tpl = $vm.$mount().$el
    document.body.appendChild(tpl)
    Vue.prototype.$toast = {
        show(options){
            if(typeof options === 'string'){
                $vm.text = options
            }else if(typeof options === 'object'){
                Object.assign($vm,options)
            }
            $vm.show = true
        },
        hide(){
            $vm.show = false
        }
    }
}
ToastPlugin.install = install
export default ToastPlugin;
