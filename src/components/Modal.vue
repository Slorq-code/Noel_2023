<template>
  <div v-if="dialog" class="modal" @click="permanentAction()">
    <div 
      :class="[color=='' ? 'modal__content' : 'modal__content1']" 
      :style="{width:`${width}px`}" 
      @click.stop
    >
      <div>
        <slot name="component"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "500",
    },
    permanent: {
      type: Boolean,
      false: true,
    },
    color: {
      type: String,
      default: "",
    }
  },
  methods: {
    permanentAction() {
      this.$emit("close");
      if (!this.permanent) {
        this.close();
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10 !important;
  background-color: rgba(0, 0, 0, 0.7);

  @include mxHeight(440px){
    @include mnWidth(500px) {
      padding: 15px 0 0 0;
    }
  }

  @include xs() {
    bottom: -30px;
  }

  &__content {
    background: transparent linear-gradient(180deg, rgba(241,201,26,1) 0%, rgba(245,102,48,1) 100%)
      0% no-repeat padding-box;
    box-shadow: 7px 7px 7px #00000059;
    border-radius: 25px;
    @include mobile() {
      width: 90% !important;
      margin: 20px 0 0 0;
    }
  }
  &__content1 {
    background: rgba(241,201,26,1);
    box-shadow: 7px 7px 7px #00000059;
    border-radius: 25px;
    @include mobile() {
      width: 90% !important;
      margin: 40px 0 0 0;
    }
  }
}
</style>
