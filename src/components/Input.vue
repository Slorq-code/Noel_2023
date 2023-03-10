<template>
  <div class="input">
    <div class="input__main-box">
      <span class="input__label" v-if="label">
        {{ label }}
        <span v-if="required" class="input__required">*</span>
      </span>
      <input
        v-if="onlyNumbers && !mask"
        v-model="componentModel"
        @input="input()"
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        @keypress="isNumber($event)"
        @focus="focus()"
        :maxlength="maxlength"
        :disabled="disabled"
        autocomplete="off"
      />
      <input
        v-if="onlyNumbers && mask"
        v-mask="mask"
        v-model="componentModel"
        @input="input()"
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        @keypress="isNumber($event)"
        @focus="focus()"
        :maxlength="maxlength"
        :disabled="disabled"
        autocomplete="off"
      />
      <input
        v-if="!onlyNumbers && !mask"
        v-model="componentModel"
        @input="input()"
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        @focus="focus()"
        :maxlength="maxlength"
        autocomplete="off"
        :disabled="disabled"
      />
      <input
        v-if="!onlyNumbers && mask"
        v-mask="mask"
        v-model="componentModel"
        @input="input()"
        class="input__field"
        :type="type"
        :placeholder="placeholder"
        @focus="focus()"
        :maxlength="maxlength"
        autocomplete="off"
        :disabled="disabled"
      />
    </div>
    <div class="input__messages">
      <div class="input__messages-box">
        <span class="input__error">{{ error || "" }}</span>
        <span v-if="hint && !error" class="input__hint">{{ hint }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      componentModel: "",
    };
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
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    model: {
      type: [String, Number],
      default: "",
    },
    onlyNumbers: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: String,
      default: "100",
    },
    mask: {
      type: String,
      default: "",
    },
  },
  methods: {
    input() {
      this.$emit("handle-input", {
        key: this.field,
        value: this.componentModel,
      });
    },
    focus() {
      this.$emit("close-all");
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  watch: {
    model: {
      immediate: true,
      handler(newVal) {
        this.componentModel = newVal;
      },
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.input {
  input::placeholder {
    color: #686868;
    font-family: superSlintGeneralLeter;
    font-size: 12px;
    text-shadow: none;
  }
  height: 46px;
  width: 275px;
  margin: 5px 10px 5px 0;
  @include xs() {
    width: 100% !important;
    margin-bottom: 5px;
  }
  @include mobile() {
    width: 270px !important;
    margin: 10px 10px;
  }
  @include mxHeight(650px) {
    margin: 5px 10px;
  }
  @include lg() {
    width: 330px;
    height: 56px;
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
  &__main-bo::first-letter {
    color: red;
  }
  &__field {
    border-style: none;
    background-color: white;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    padding: 2px 10px 2px 10px;
    text-align: center;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    @include xs() {
      height: 30px;
    }
    @include mobile() {
      font-size: 14px;
      height: 38px;
    }
    @include lg() {
      margin: 10px 0 0 0;
      height: 50px;
      border-radius: 32px;
    }
    @include mxHeight(650px) {
      margin: 0 0 0 0;
      height: 30px;
    }
  }
  input:focus {
    outline: 0;
  }
  &__messages {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    line-height: 11px !important;
    padding: 3px 0 0 10px;
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
    @include mxHeight(650px) {
      font-size: 10px;
    }
  }
  &__hint {
    color: white;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 11px;
    @include mobile() {
      font-size: 12px;
    }
  }
  &__label {
    margin: 0 10px 0px 10px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 14px;
    color: white;
    @include mobile() {
      text-align: center;
    }
    @include lg() {
      font-size: 18px;
    }
  }
  &__messages-box {
    width: 100%;
  }
  &__required {
    color: white;
  }
}
</style>
