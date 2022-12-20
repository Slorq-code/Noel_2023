<template>
  <div 
    class="button"
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
  border: 2px white solid;
  &__text {
    font-family: NexaBold;
    font-size: 16px;
    line-height: 14px;
    color: white;
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
