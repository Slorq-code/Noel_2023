<template>
  <div
    :class="['button', color === '1' ? 'button-1' : 'button-2' && color === '3' ? 'button-3' : 'button-2']"
    @click="click()"
  >
    <span class="button__text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  props: {
    type: {
      type: String,
      default: "primary",
    },
    color: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      if (!this.isLoading) {
        this.$emit("handle-click");
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.button {
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
    width: 260px;
    height: 45px;
  }
  @include xlg() {
    width: 290px;
    height: 50px;
  }
  &__text {
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 16px;
    line-height: 14px;
    color: white;
    @include lg() {
      font-size: 23px;
    }
    @include xlg() {
      font-size: 28px;
    }
  }
}
.button-1 {
  background-color: #e43f27;
}
.button-2 {
  background-color: #309f3a;
}
.button-3 {
  background-color: #f0b824;
}
.button:hover {
  transform: scale(1.1);
  transition: 0.3s ease-out;
  &__text {
    transition: 0.3s ease-out;
  }
}
</style>
