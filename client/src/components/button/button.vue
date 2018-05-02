<template>
  <button
    class="mojo-btn"
    :type="type"
    :class="btnClass"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
  const COMPONENT_NAME = 'mojo-btn'
  export default {
    name: COMPONENT_NAME,
    props: {
      icon: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      light: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'button'
      },
      tag: {
        type: String,
        default: ''
      }
    },
    computed: {
      btnClass () {
        let bc
        switch (this.tag) {
          case 'normal':
            bc = {
              'mojo-btn_active': this.active,
              'mojo-btn_disabled': this.disabled,
              'mojo-btn-normal-light': this.light,
              'mojo-btn-normal': !this.light
            }
            break
          default:
            bc = {
              'mojo-btn_active': this.active,
              'mojo-btn_disabled': this.disabled,
              'mojo-btn-light': this.light
            }
        }
        return bc
      }
    },
    methods: {
      handleClick (event) {
        if (this.disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        this.$emit('click', event)
      }
    }
  }
</script>

<style>
  .mojo-btn {
    display: block;
    margin: 0;
    padding: 17px 16px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 25px;
    line-height: 1;
    color: #fff;
    background: #4a4c5b;
    outline: none;
    border: none;
    border-radius: 2px;
    -webkit-tap-highlight-color: transparent
  }
  .mojo-btn-normal {
    /*background: url('../../assets/image/btns/btn_nor.png');*/
    width: 136px;
    height: 80px
}
  .mojo-btn-normal-light {
    /*background: url('../../assets/image/btns/btn_lig.png');*/
    width: 136px;
    height: 80px
  }
</style>
