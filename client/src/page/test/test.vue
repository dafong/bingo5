<template>
  <div class="hello">
      <h1>加密三国-功能测试</h1>
      <div>
          <span>网络: {{ network }}</span>
      </div>
      <div class="funcarea">
          <h3>安全性</h3>
          <ui-button color="red" size="normal" @click="get_owner_of_contracts">所有合约owner</ui-button>
          <ui-button color="red" size="normal" @click="check_security_data">未授权用户访问data合约</ui-button>
          <ui-button color="red" size="normal" @click="check_security_world">未授权用户访问world合约</ui-button>
          <div>
              <ui-textbox
                floating-label
                label="钱包地址"
                class="inline"
                v-model="data_address"
                />
              <ui-button size="normal" color="red"  @click="add_address_to_data_auth">data合约添加权限</ui-button>
         </div>
         <div>
             <ui-textbox
              floating-label
              label="钱包地址"
              class="inline"
              v-model="world_address"
              />
             <ui-button size="normal" color="red"  @click="add_address_to_world_auth">world合约添加权限</ui-button> </div>
         </div>
         <div class="funcarea">
             <h3>例子</h3>
             <ui-button color="orange" size="normal" @click="load_config_js">加载js配置表</ui-button>
         </div>

         <div class="funcarea">
              <h3>配置部分(合约API)</h3>
              <ui-button color="green" size="normal" @click="get_config_general_list">将领列表</ui-button>
              <ui-button color="green" size="normal" @click="get_config_train_cost_list">训练费用表</ui-button>
              <ui-button color="green" size="normal" @click="get_config_skill_list">技能表</ui-button>
              <ui-button color="green" size="normal" @click="is_presell_open()">预售状态</ui-button>
              <ui-button color="green" size="normal" @click="open_presell(true)">开启预售</ui-button>
              <ui-button color="green" size="normal" @click="open_presell(false)">关闭预售</ui-button>
              <ui-button color="green" size="normal" @click="get_preselled_count">已预售数量</ui-button>
              <ui-button color="green" size="normal" @click="get_wait_preselled_count">待预售数量星级列表</ui-button>
         </div>
        <div class="funcarea">
            <h3>玩家</h3>

            <div>
              <span>用户: {{ user }}</span>
            </div>
            <ui-button size="normal" color="primary"  @click="login" v-if="!islogin">登录</ui-button>
            <ui-button size="normal" color="primary"  @click="is_get_free" >是否已免费领取</ui-button>
            <ui-button size="normal" color="primary"  @click="get_free" >免费领取</ui-button>
            <ui-button size="normal" color="primary"  @click="get_player_general_list">将领列表</ui-button>
            <ui-button size="normal" color="primary"  @click="get_player_state">玩家信息</ui-button>
            <ui-button size="normal" color="primary"  @click="presell">预售将领(0.01eth)</ui-button>
            <ui-button size="normal" color="primary"  @click="niudan">扭蛋</ui-button>
            <ui-button size="normal" color="primary"  @click="get_general_in_market">查看将领市场</ui-button>
            <div>
                <ui-textbox
                floating-label
                label="训练将领id,陪练将领id"
                class="inline"
                v-model="train_data"
                />
                <ui-button size="normal" color="primary"  @click="train_general">训练将领</ui-button>
            </div>
            <div>
                <ui-textbox
                  floating-label
                  label="探索将领id,探索将领id,(最多6个)"
                  class="inline"
                  v-model="detect_data"
                  />
                  <ui-button size="normal" color="primary"  @click="detect">探索</ui-button>
            </div>
            <div>
                <ui-textbox
                  floating-label
                  label="将领id,原始价格,最终价格,时间"
                  class="inline"
                  v-model="sell_data"/>
                <ui-button size="normal" color="primary"  @click="sell_general">出售将领</ui-button>
            </div>
            <div>
                <ui-textbox
                  floating-label
                  label="将领id"
                  class="inline"
                  v-model="buy_data"/>
                <ui-button size="normal" color="primary"  @click="buy_general">购买将领</ui-button>
            </div>
        </div>
  </div>
</template>

<script>
import 'keen-ui/dist/keen-ui.css';
import { UiAlert, UiButton,UiTextbox } from 'keen-ui';
import mojo from '@/util/mojo'
import { general_data } from '@/data/data'
import tracker from '@/util/tracker'
export default {

  mounted(){
      var self = this;
      mojo.on('network-changed',function(nw){
          self.network = nw;
      })
      mojo.on('account-changed',function(acct){
          self.user = acct
      })
      mojo.on('login-changed',function(islogin){
          self.islogin = true
      })
  },

  methods:{
      add_address_to_data_auth : function(){
          mojo.add_address_to_data_auth(this.data_address);
      },
      add_address_to_world_auth: function(){
          mojo.add_address_to_world_auth(this.world_address);
      },

      check_security_data : function(){
          mojo.check_security_data()
      },

      check_security_world : function(){
          mojo.check_security_world()
      },

      get_owner_of_contracts: function(){
          mojo.get_owner();
      },
      get_preselled_count : function(){
          mojo.get_preselled_count().then((val)=>{
               $.log(`contract: preselled ${val}`)
          })
      },

      is_get_free : function(){
          mojo.is_get_free().then((isget)=>{
              $.log(`contract: is this acct get free? = ${isget}`)
          })
      },

      get_wait_preselled_count : function(){
          mojo.get_wait_preselled_count().then((vals)=>{
              $.log(`contract: wait presell 5star=${vals[0]} 4star=${vals[1]} 3star${vals[2]}`)
          })
      },

      load_config_js : function(){
           $.log(`${general_data.get(1101).name}`)
      },

      get_config_general_list : function(){
          mojo.get_config_general_list()
      },

      get_config_train_cost_list : function(){
          mojo.get_config_train_cost_list()
      },

      get_config_skill_list : function(){
          mojo.get_config_skill_list()
      },
          // uint32 gid, uint32 sid, address owner, uint pots, uint8 lv,uint16 hp,uint16 atk, uint16 lead, uint16 wit
      get_player_general_list : function(){
          var self = this
          var cb = function(id){
              mojo.get_player_general(id).then((vals)=>{
                  $.log(`${id} gid=${vals[0]} sid=${vals[1]} owner=${vals[2]} pots=${vals[3]} lv=${vals[4]} hp=${vals[5]} atk=${vals[6]} lead=${vals[7]} wit=${vals[8]}`)
              })
          }
          mojo.get_player_general_ids().then((arr)=>{
              for(var i = 0; i < arr.length; i ++){
                  var id = arr[i]
                  cb(id)
              }
          })

      },
      get_general_in_market : function(){

      },
      get_player_state : function(){
          mojo.get_player_state().then((vals)=>{
                $.log(`玩家 代币余额=${vals[1].valueOf()} 荣誉点=${vals[2].valueOf()}`)
          })
      },
      login : function(){
          mojo.login()
      },
      presell : function(){
          mojo.presell().then((data)=>{
              if(data.error == null){
                  tracker.watch_tx(data.tx_hash,function(tx){
                      $.log("tx presell mined")
                  })
              }
          })
      },
      is_presell_open : function(){
          mojo.is_presell_open().then((isopen)=>{
              $.log(`contract: presell open ${isopen}`)
          })
      },
      niudan : function(){

      },
      train_general : function(){
          var self = this
          var ids = self.train_data.split(',')
          mojo.train_general(ids[0],ids[1])
      },
      detect : function(){

      },
      open_presell : function(isopen){
          mojo.open_presell(isopen).then((data)=>{
              if(data.error == null){
                  tracker.watch_tx(data.tx_hash,function(tx){
                      $.log("tx open_presell mined")
                  })
              }
          })
      },
      sell_general : function(){

      },
      buy_general : function(){

      },
      get_free : function(){
          mojo.get_free().then((data)=>{
              if(data.error == null){
                  tracker.watch_tx(data.tx_hash,function(tx){
                      $.log("tx get_free mined")
                  })
              }
          })
      }
  },

  components : {
      UiButton,UiTextbox
  },

  data () {
    return {
        user : "not login",
        network : "",
        islogin : false,
        train_data:undefined,
        detect_data:undefined,
        sell_data:undefined,
        buy_data:undefined,
        data_address: undefined,
        world_address: undefined
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
.funcarea{
    margin-top: 10px;
}
.ui-textbox {
    width: 400px;
}
.inline {
    display: inline-block;
}

a {
  color: #42b983;
}
</style>
