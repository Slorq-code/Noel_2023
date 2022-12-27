<template>
  <div 
    :class="['button', color === '1' ? 'button-1' : 'button-2']"
    @click="click()"    
    >
    <span class="button__text" >{{text}}</span>
  </div>
</template> 

<script>
export default {
  name: 'Button',
  data() {
    return {
      
    };
  },
  mounted() {},
  components: {},
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    text: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
        if (!this.isLoading) {
            this.$emit('handle-click')
        }
    }
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.button {
  background-color: #309f3a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 36px;
  border-radius: 25px;
  cursor: pointer;
  padding-top: 2px;
  border: 3px white solid;
  @include lg() {
    width: 300px;
    height: 60px;
  }
  @include xlg() {
    width: 400px;
    height: 88px;
  }
  &__text {
    font-family: NexaBold;
    font-size: 16px;
    line-height: 14px;
    color: white;
    @include lg(){
      font-size: 25px;
    }
    @include xlg() {
      font-size: 35px;
    }
  }
}
.button:hover {
  transform: scale(1.1);
  transition: 0.3s ease-out;
  &__text {
    transition: 0.3s ease-out;
  }
}
</style>
