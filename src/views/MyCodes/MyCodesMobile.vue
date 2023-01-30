<template>
  <div class="myCodesMobile">
    <div class="title-views-global">
      <img
        class="title-views-global__mobile"
        src="../../assets/Assets_Mobile_New/Titulo_mis_codigos.png"
        alt="Mis codigos titulo"
      />
    </div>

    <div class="myCodesMobile__margin-wrapper">
      <div class="myCodesMobile__title">
        <h1 class="myCodesMobile__title-one">¡Bienvenido {{user.name}}!</h1>
        <h2 class="myCodesMobile__title-two">
          Celular para premios: {{ user.phone }}
        </h2>
        <h3 class="myCodesMobile__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesMobile__content">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="myCodesMobile__content-items myCodesMobile__boxItem"
          @click="onClickElement(item)"
        >
          <div class="myCodesMobile__content-items-header">
            <span class="myCodesMobile__content-items-header-index">{{
              index + 1
            }}</span>
            <p class="myCodesMobile__content-items-header-title">
              {{ item.titleMobileLitle }}
            </p>
          </div>
          <div class="myCodesMobile__content-items-content">
            <span
            class= "myCodesMobile__content-items-content__textSpan"
            >{{ item.resultCouple }}</span>
            <div class="myCodesMobile__content-items-content-action">
              <Button text="Ver detalle" type="primary" color="3"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal width="600" v-if="actualItem" :dialog="dialog">
      <div class="myCodesMobile__modal-content" slot="component">
        <div class="myCodesMobile__close-container">
          <img
            @click="dialog = false"
            class="myCodesMobile__close-image"
            src="@/assets/web/btn_cerrar.png"
          />
        </div>
        <img
          class="myCodesMobile__image"
          src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png"
        />
        <div class="myCodesMobile__content-modal-HorizontalBox" >
          <h2 class="myCodesMobile__content-modal-title">Detalle de Pareja:</h2>
          <h2 class="myCodesMobile__content-modal-title">
            {{actualItem.titleMobile}}
          </h2>
        </div>
        <div class="myCodesMobile__content-modal-content">
          <div class="myCodesMobile__content-modal-content-box" >
            <div class="myCodesMobile__content-modal-content-item">
              <img
                class="myCodesMobile__content-modal-content-item-img-left-padding"
                :src="actualItem.saltinTacoImage"
                alt="Taco Saltin"
              />
              <div class="myCodesMobile__content-modal-content-item-text">
                <p class="myCodesMobile__content-modal-content-item-text-one">
                  {{ actualItem.saltinNoel ? actualItem.saltinNoel : "SIN DATOS" }}
                </p>
                <p class="myCodesMobile__content-modal-content-item-text-two">
                  {{ actualItem.saltinNoel ? actualItem.dateSaltin : "SIN DATOS" }}
                </p>
              </div>
            </div>
            <div class="myCodesMobile__content-modal-content-item">
              <img
                class="myCodesMobile__content-modal-content-item-img"
                :src="actualItem.ducalesTacoImage"
                :alt="'Taco Ducales'"
              />
              <div class="myCodesMobile__content-modal-content-item-text">
                <p class="myCodesMobile__content-modal-content-item-text-one">
                  {{ actualItem.ducales ? actualItem.ducales : "-" }}
                </p>
                <p class="myCodesMobile__content-modal-content-item-text-two">
                  {{ actualItem.ducales ? actualItem.dateDucales : "-" }}
                </p>
              </div>
            </div>
          </div>

          <div class="myCodesMobile__awardBox">
            <div class="myCodesMobile__award" @click="dialog = false">
              <p class="myCodesMobile__award-title">Premio:</p>
              <p class="myCodesMobile__award-prime">{{ actualItem.resultLine }}</p>
            </div>
          </div>

        </div>
      </div>
    </modal>
  </div>
</template>

<script>

import Modal from "../../components/Modal";
import Button from "../../components/Button.vue";

export default {
  name: "MyCodesMobile",
  data() {
    return {
      dialog: false,
      actualItem: null,
    };
  },
  mounted() {},
  updated() {
  },
  components: {
    Modal,
    Button,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    user() {
      const { name, phone } = this.$store.state.user;
      const newPhone = " +" + phone.slice(0, 2) + " (" + phone.slice(2, 5) + ") " + phone.slice(5);
      return { name: String(name).toUpperCase(), phone: newPhone };
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    onClickElement(item) {
      this.dialog = true;
      this.actualItem = item;
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.myCodesMobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__margin-wrapper {
    margin: 10px;
  }
  &__title {
    margin-top: 10px;
    text-align: center;
    line-height: 18px;
    &-one {
      font-size: 15px;
      color: white;
    }
    &-two {
      font-size: 15px;
      color: white;
    }
    &-three {
      font-size: 15px;
      color: white;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__content-items {
    margin-top: 10px;
    flex-basis: 20%;
    margin: 10px;
    &-header {
      display: flex;
      border-radius: 20px;
      background: #309f3a;
      height: 41px;
      align-items: center;
      position: relative;
      &-index {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0px !important;
        color: white;
        border: 3px solid white;
        border-radius: 50%;
        height: 43px;
        width: 43px;
        font-size: 25px;
        font-family: NexaBold;
      }
      &-title {
        margin: 0px !important;
        color: white;
        flex-basis: 90%;
        text-align: center;
        padding-left: 20px;
      }
    }
  }

  &__content-items-content {
    padding: 5px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 135px;
    &-image {
      margin: 10px 0px 10px 0px;
      height: 90px;
      flex-basis: 20%;
      @include mobile() {
        height: 110px;
      }
      @include xs() {
        height: 70px;
      }
    }
    &__textSpan {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 23px;
      text-align: center;
      color: #d93d2c;
    }
    &-action {
      flex-basis: 90%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &-text {
        margin: 0px !important;
        width: 80%;
        margin-left: 10px !important;
        color: #ffffff;
        @include mobile() {
          font-size: 15px;
          width: 90%;
        }
        @include xs() {
          font-size: 14px;
        }
      }

      &-arrow {
        height: 40px;
      }
    }
  }

  &__boxItem {
    background: transparent linear-gradient(180deg, #ffdd5d 0%, #ffb000 100%) 0%
      0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 30px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    opacity: 1;
  }
  &__modal-content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-height: 300px;
    padding: 10px 20px;
    @include mobile() {
      padding: 10px;
    }
    @include mxHeight(440px){
    @include mnWidth(500px) {
      min-height: 0px;
      height: 250px;
      }
    }
  }
  &__image {
    height: 120px;
    margin-top: -58px;
    margin-bottom: 10px;

    @include xs() {
      margin-bottom: -15px;
      height: 150px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;
  }
  &__close-image {
    z-index: 99;
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }

  &__content-modal {
    &-HorizontalBox{
      @include mxHeight(440px){
        @include mnWidth(500px) {
          display: flex;
          gap: 10px;
        }
      }
    }
    &-title {
      font-size: 17px;
      color: white;

      @include xs() {
        margin-bottom: -10px;
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      width: 90%;
      @include mxHeight(440px){
        @include mnWidth(500px) {
          flex-direction: row;
        }
      }

      &-box {
        @include mxHeight(440px){
          @include mnWidth(500px) {
            display: flex;
            flex-direction: column;
          }
        }
      }

      &-item {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;

        &:first-of-type {
          border-bottom: 1px dashed #ffb000;
          padding: 0 0 10px 0;
        }
        &:nth-child(2) {
          margin: 10px 0 0 0;
        }
        &-img {
          height: 55px;
          margin-right: 10px;
          &-left-padding {
            height: 55px;
            margin-right: 10px;
            margin-left: -5px !important;
          }
        }

        &-text {
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-self: center;
          line-height: 15px;
          min-width: 100px;
          &-one {
            font-size: 15px;
            margin: 0px !important;
          }

          &-two {
            font-size: 15px;
            margin: 0px !important;
          }
        }
      }
    }
  }
  &__awardBox {
    @include mxHeight(440px){
      @include mnWidth(500px) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 40%;
      }
    }
  }
  &__award {
    background-color: #309f3a;
    border: 3px solid white;
    color: white;
    margin: 20px 0 0 0;
    border-radius: 15px;
    padding: 10px 0px;
    cursor: pointer;

    &-title {
      margin: 0px !important;
      font-size: 16px;
    }

    &-prime {
      margin: 0px !important;
      text-transform: uppercase;
      font-size: 13.5px;
      text-shadow: 0px 3px 6px #00000029;
    }
  }
}
</style>
