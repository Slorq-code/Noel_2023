<template>
  <div class="select">
    <div class="select__main-box">
      <span class="select__label">
        {{ label }}
        <span v-if="required" class="select__required">*</span>
      </span>
      <div
        class="select__field"
        @click="focus()"
        :class="{
          select__focus: open,
        }"
      >
        <span v-if="componentModel" class="select__text">{{
          componentModel
        }}</span>
        <span class="select__placeholder" v-else>{{ placeholder }}</span>
        <span class="select__icon-content" @click="focus()">
          <i class="fas fa-caret-down select__icon"></i>
        </span>
        <div v-if="open" class="select__pre-box">
          <div
            class="select__box"
            :class="{ select__scroll: items.length > 5 }"
          >
            <span
              @click.stop="select(item)"
              class="select__option"
              v-for="(item, i) in items"
              :key="i"
            >
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="select__messages">
      <div class="select__messages-box">
        <span class="select__error">{{ error || "" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      componentModel: "",
      open: false,
    };
  },
  mounted() {
    this.componentModel = "";
  },
  props: {
    field: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    model: {
      type: [String, Number],
      default: "",
    },
  },
  methods: {
    focus() {
      this.open = true;
      this.$emit("close-all");
    },
    blur() {
      this.open = false;
    },
    select(item) {
      this.componentModel = item.text;
      this.$emit("handle-input", {
        key: this.field,
        value: item.value,
      });
      this.blur();
    },
  },
  watch: {
    model: {
      handler(newVal) {
        this.componentModel = newVal;
      },
    },
    open: {
      handler() {},
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.select {
  height: 48px;
  width: 280px;
  margin: 0 10px 10px 0;
  
  @include xs() {
    margin: 0 0 5px 0;
    width: 100% !important;
  }
  @include mobile() {
    width: 270px !important;
    margin: 25px 10px;
  }
  @include lg() {
    width: 330px;
    height: 56px;
  }
  @include mxHeight(590px) {
    margin: 0 10px;
  }
  @include mnHeight(1000px) {
    width: 330px;
    height: 56px;
  }
  @include xlg() {
    width: 380px;
  }
  &__main-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__label-container {
    width: 140px;
    text-align: right;
    @include mobile() {
      width: 110px !important;
    }
  }
  &__field {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    padding: 2px 10px;
    text-align: center;
    cursor: pointer;
    position: relative;
    @include xs() {
      height: 30px;
    }
    @include mobile() {
      height: 38px;
      padding-top: 3px;
    }
    @include lg() {
      margin: 10px 0 0 0;
      height: 50px;
      border-radius: 32px;
    }
    @include mxHeight(590px) {
      margin: 0 0 0 0;
      height: 30px;
    }
  }
  &__label {
    margin: 0 10px 0px 10px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 15px;
    color: white;
    @include mobile() {
      text-align: center;
    }
    @include lg() {
      font-size: 18px;
    }
    @include xlg() {
      font-size: 20px;
    }
  }
  &__placeholder {
    color: #929292;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 12px;
  }
  &__icon-content {
    position: absolute;
    right: 12px;
  }
  &__icon {
    color: grey;
    font-size: 16px;
  }
  &__pre-box {
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    top: 36px;
    z-index: 4;
    cursor: pointer;
    border: 0.5px solid #9d9d9d;
    padding: 2px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  &__box {
    display: flex;
    flex-direction: column;
  }
  &__scroll {
    max-height: 115px;
    overflow-y: scroll;
  }
  &__option {
    font-size: 13px;
    color: black;
    padding: 3px 2px 1px 2px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    @include mobile() {
      font-size: 14px;
    }
  }
  &__option:hover {
    background: #eee;
  }
  &__text {
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 14px;
    @include xs() {
      font-size: 12px;
    }
  }
  &__error {
    color: #e31552;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 9px;
    @include mobile() {
      font-size: 10px;
    }
    @include lg() {
      font-size: 14px;
    }
    @include mxHeight(590px) {
      font-size: 10px;
    }
  }
  &__messages {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 11px !important;
    padding: 3px 0 0 10px;
  }
  &__messages-box {
    width: 100%;
  }
  &__required {
    color: white;
  }
}
</style>
