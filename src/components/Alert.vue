<template>
  <modal :dialog="show" :permanent="false" @close="close()">
    <div slot="component" class="alert">
      <div v-if="data &&data.showClose"  class="alert__close-container">
        <img
          @click="close()"
          class="alert__close-image"
          src="@/assets/web/btn_cerrar.png"
        />
      </div>
      <img
        class="alert__image"
        src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png"
      />
      <div class="alert__content" v-if="data">
        <span v-if="true" class="alert__title">{{ data.title }}</span>
        <span v-if="data.message" class="alert__message" v-html="data.message"></span>
        <div v-if="data.messages" class="alert__messages-content">
          <span
            class="alert__message"
            v-for="(message, i) in data.messages"
            :key="i"
            v-html="message"
          >
          </span>
        </div>
        <div class="alert__btn">
          <div style="margin: 20px 10px 0 10px;" v-if="data && data.buttonLabel" >
            <Button :text="data.buttonLabel" @handle-click="close()"/>
          </div>
          <div style="margin: 15px 10px 0 10px;" v-if="data && data.codesButton">
            <Button type="tertiary" text="Ver mis códigos" @handle-click="goToMyCodes()"/>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "./Modal";
import Button from "./Button";

export default {
  name: "Alert",
  components: {
    Modal,
    Button
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  methods: {
    close() {
      this.$emit("close");
    },
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    goToMyCodes() {
      this.close()
      this.goTo('/mi-cuenta')
    }
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.alert {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  &__content {
    padding: 20px 30px 10px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
    @include mobile() {
      padding: 20px 10px 10px 10px;
    }
  }
  &__messages-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__message {
    font-size: 18px;
    color: white;
    text-shadow: 0px 3px 6px #00000029;
    text-align: center;
    text-align: center;
    @include mobile() {
      font-size: 16px;
    }
  }
  &__title {
    margin-bottom: 10px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    text-align: center;
    color: white;
    font-size: 28px;
    @include mobile() {
      font-size: 22px;
    }
  }
  &__btn {
    display: flex;
    @include mobile() {
      flex-direction: column;
    }
  }




  //------------------------


  &__image {
    height: 150px;
    margin-top: -100px;
    margin-bottom: 10px;

    @include mobile() {
      height: 120px;
      margin-top: -80px;
    }
    @include xs() {
      margin-top: -25px;
      margin-bottom: 10px;
    }
    @include mxHeight(440px){
      @include mnWidth(500px) {
        height: 82px;
        margin-top: -29px;
      }
    }

  }



  //------------------------




  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -46px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }
  &__info-image {
    height: 180px;
    margin-top: -66px;
  }
  &__ckeck-image{
    height: 100px;
    margin-top: -22px;
    margin-bottom: 48px;
  }
}
</style>