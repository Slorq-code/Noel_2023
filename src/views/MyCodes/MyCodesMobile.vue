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
        <h1 class="myCodesMobile__title-one">¡Bienvenido !</h1>
        <h2 class="myCodesMobile__title-two">
          Celular para premios:
        </h2>
        <h3 class="myCodesMobile__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesMobile__content">
        <div
          v-for="(item, index) in tableDatas"
          :key="index"
          class="myCodesMobile__content-items myCodesMobile__boxItem"
          @click="onClickElement(item)"
        >
          <div class="myCodesMobile__content-items-header">
            <span class="myCodesMobile__content-items-header-index">{{
              index + 1
            }}</span>
            <p class="myCodesMobile__content-items-header-title">
              {{ item.titleMobile }}
            </p>
          </div>
          <div class="myCodesMobile__content-items-content">
            <span
            class= "myCodesMobile__content-items-content__textSpan"
            >Te falta uno</span>
            <div class="myCodesMobile__content-items-content-action">
              <!-- <p class="myCodesMobile__content-items-content-action-text">
                {{ item.resultCouple }}
              </p> -->
              <Button text="Registrar Código" type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal width="600" v-if="item" :dialog="dialog">
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
          src="../assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png"
        />
        <h2 class="myCodesMobile__content-modal-title">Detalle Pareja</h2>
        <div class="myCodesMobile__content-modal-content">
          <div class="myCodesMobile__content-modal-content-item">
            <img
              class="myCodesMobile__content-modal-content-item-img-left-padding"
              :src="item.saltinTacoImage"
              alt="Taco Saltin"
            />
            <div class="myCodesMobile__content-modal-content-item-text">
              <p class="myCodesMobile__content-modal-content-item-text-one">
                {{ item.saltinNoel ? item.saltinNoel.titleOne : "SIN DATOS" }}
              </p>
              <p class="myCodesMobile__content-modal-content-item-text-two">
                {{ item.saltinNoel ? item.saltinNoel.titleTwo : "SIN DATOS" }}
              </p>
            </div>
          </div>
          <div class="myCodesMobile__content-modal-content-item">
            <img
              class="myCodesMobile__content-modal-content-item-img"
              :src="item.ducalesTacoImage"
              :alt="'Taco Ducales'"
            />
            <div class="myCodesMobile__content-modal-content-item-text">
              <p class="myCodesMobile__content-modal-content-item-text-one">
                {{ item.ducales ? item.ducales.titleOne : "SIN DATOS" }}
              </p>
              <p class="myCodesMobile__content-modal-content-item-text-two">
                {{ item.ducales ? item.ducales.titleTwo : "SIN DATOS" }}
              </p>
            </div>
          </div>
          <div class="myCodesMobile__award">
            <p class="myCodesMobile__award-title">Premio:</p>
            <p class="myCodesMobile__award-prime">{{ item.result }}</p>
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
      //actualItem: null,
      tableDatas: [
        {
          saltinNoel: {
            titleOne: "prueba1",
            titletwo: "prueba2",
          },
          ducales: {
            titleOne: "prueba3",
            titletwo: "prueba4",
          },
          award: "felicidaes",
        },
        {
          award: "felicidaes",
        },
        {
          award: "felicidaes",
        },
      ],
    };
  },
  mounted() {},
  updated() {
    console.log(this.actualItem);
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
      return { name: String(name).toUpperCase(), phone };
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    onClickElement(item) {
      console.log("actual", item);
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
    height: 120px;
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
      color: #d93d2c;
      font-size: 23px;
    }
    &-action {
      flex-basis: 80%;
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
  }
  &__image {
    height: 220px;
    margin-top: -100px;
    margin-bottom: 10px;
    @include mobile() {
      height: 160px;
      margin-top: -80px;
    }

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
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }

  &__content-modal {
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

      &-item {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        &:first-of-type {
          border-bottom: 1px dashed #ffb000;
        }
        &-img {
          height: 50px;
          margin-right: 10px;

          &-left-padding {
            height: 50px;
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

  &__award {
    background: #005aa7;
    color: white;
    margin-top: 10px;
    border-radius: 15px;
    padding: 10px 0px;

    &-title {
      margin: 0px !important;
      font-size: 16px;
    }

    &-prime {
      margin: 0px !important;
      text-transform: uppercase;
      font-size: 16px;
    }
  }
}
</style>
