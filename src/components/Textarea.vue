<template>
  <div class="textarea">
    <div class="textarea__main-box">
      <div class="textarea__label-container" v-if="label">
        <span class="textarea__label">
          {{ label }}
          <span v-if="required" class="textarea__required">*</span>
        </span>
      </div>
      <textarea
        v-model="componentModel"
        @input="input()"
        class="textarea__field"
        :type="type"
        :placeholder="placeholder"
        @focus="focus()"
        :maxlength="maxlength"
        autocomplete="off"
        :disabled="disabled"
      />
    </div>
    <div class="textarea__messages">
      <div class="textarea__messages-box">
        <span class="textarea__error">{{ error || "" }}</span>
        <span v-if="hint && !error" class="textarea__hint">{{ hint }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Textarea",
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
      default: "160",
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
.textarea {
  height: 68px;
  width: 100%;
  margin: 0 0px 10px 0;

  textarea::placeholder {
    color: #686868;
    font-family: superSlintGeneralLeter;
    font-size: 15.5px !important;
    @include mnHeight(1000px){
      font-size: 18px;
    }
    @include lg(){
      font-size: 16px;
    }
    @include xlg(){
      font-size: 18px;
    }
  }
  @include mobile() {
    width: 270px !important;
  }
  @include xs() {
    width: 100% !important;
  }
  &__main-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__field {
    border-style: none;
    background-color: white;
    width: 100%;
    height: 100px;
    border-radius: 11px;
    font-size: 14px;
    padding: 6px 10px;
    text-align: start;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    @include mobile() {
      font-size: 14px;
    }
  }
  textarea:focus {
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
    color:  red;
    font-family: generalLeter;
    text-shadow: 0px 3px 7px #ffffff73;
    font-size: 11px;
    @include mobile() {
      font-size: 12px;
    }
    @include lg() {
      font-size: 14px;
    }
    @include xlg() {
      font-size: 17px;
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
  &__label-container {
    margin: 0 0 10px 0;
  }
  &__label {
    margin-left: 10px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    margin-right: 10px;
    font-size: 15px;
    color: white;
    margin-bottom: 6px;
    @include mobile() {
      text-align: center;
    }
    @include lg() {
      font-size: 18px;
    }
    @include xlg() {
      font-size: 20px;
      margin: 0 0 10px 0;
    }
  }
  &__messages-box {
    width: 100%;
    @include lg() {
      margin: 10px 0 0 0;
    }
  }
  &__required {
    color: white;
  }
}
</style>
