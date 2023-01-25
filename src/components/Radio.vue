<template>
  <div class="radio" @click="click()">
    <div v-if="value" class="radio__value">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    click() {
        this.$emit('handle-click')
    }
  }
}
</script>

<style lang="scss">
.radio {
    background-color: white;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    margin-top: -2px;
    cursor: pointer;
    &__value {
        background-color: #309f3a;
        height: 15px;
        width: 15px;
        border-radius: 50%;
    } 
}
</style>
