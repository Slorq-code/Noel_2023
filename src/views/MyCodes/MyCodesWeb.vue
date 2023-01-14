<template>
  <div class="myCodesWeb">
    <div class="title-views-global">
      <img
        class="myCodesWeb__web"
        src="../../assets/Assets_Mobile_New/Titulo_mis_codigos.png"
        alt="Mis codigos titulo"
      />
    </div>

    <div class="myCodesWeb__content">
      <div class="myCodesWeb__title">
        <h1 class="myCodesWeb__title-one">¡Bienvenido Carlos Moran!</h1>
        <h2 class="myCodesWeb__title-two">
          Celular para premios: (311) 522 3148
        </h2>
        <h3 class="myCodesWeb__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesWeb__table">
        <div class="myCodesWeb__table-header">
          <div class="myCodesWeb__table-header-titles"> <p> Cant.</p></div>
          <div class="myCodesWeb__table-header-titles"> <p> Saltín Noel</p></div>
          <div class="myCodesWeb__table-header-titles"> <p> Ducales</p></div>
          <div class="myCodesWeb__table-header-titles"> <p> Premios</p></div>
        </div>
        <div
          class="myCodesWeb__table-content"
          v-for="(item, index) in tableDatas"
          v-bind:key="index"
        >
          <div class="myCodesWeb__table-content-element">
            <p class="myCodesWeb__table-cant">{{ item.cant }}</p>
          </div>
          <div class="myCodesWeb__table-content-element myCodesWeb__text-row">
            <div
              v-if="item.saltinNoel && item.saltinNoel.titleOne"
              class="myCodesWeb__table-text-content"
            >
              <p class="myCodesWeb__table-text-content-one">
                {{ item.saltinNoel.titleOne }}
              </p>
              <p class="myCodesWeb__table-text-content-two">
                {{ item.saltinNoel.titletwo }}
              </p>
            </div>
            <div
              v-else
              class="myCodesWeb__table-text-content myCodesWeb__table-text-content-alignEmpty"
            >
              -
            </div>
            <div class="myCodesWeb__table-btn-plus">
              <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
              <div class="myCodesWeb__table-btn-plus__background"></div>
            </div>
          </div>
          <div class="myCodesWeb__table-content-element myCodesWeb__text-row">
            <div
              v-if="item.ducales && item.ducales.titleOne"
              class="myCodesWeb__table-text-content"
            >
              <p class="myCodesWeb__table-text-content-one">
                {{ item.ducales.titleOne }}
              </p>
              <p class="myCodesWeb__table-text-content-two">
                {{ item.ducales.titletwo }}
              </p>
            </div>
            <div
              v-else
              class="myCodesWeb__table-text-content myCodesWeb__table-text-content-alignEmpty"
            >
            </div>
            <div class="myCodesWeb__table-btn-equal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-3v-10h3v10zm5 0h-3v-10h3v10z"/></svg>
              <div class="myCodesWeb__table-btn-plus__background"></div>
            </div>
          </div>
          <div class="myCodesWeb__table-content-element">
            <p
              style="text-align: center"
              class="myCodesWeb__table-text-content-award myCodesWeb__alignmentText"
            >
              {{ item.award }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCodesWeb",
  data() {
    return {
      tableDatas: [
        {
          saltinNoel: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          ducales: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          award: "¡RECARGA!",
          cant: 2,
        },
        {
          saltinNoel: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          ducales: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          award: "¡RECARGA!",
          cant: 2,
        },
        {
          saltinNoel: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          ducales: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          award: "¡T. REGALO!",
          cant: 3,
        },
        {
          saltinNoel: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          ducales: {
            titleOne: "ZET82F",
            titletwo: "12/12/2022",
          },
          award: "¡T. REGALO!",
          cant: 4,
        },
      ],
    }
  },
  mounted() {
    console.log("actual2", this.tableData[1]);
  },
  components: {},
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
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

* {
  font-family: generalLeter;
  text-shadow: 0px 3px 6px #00000029;
}

.myCodesWeb {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__web {
    margin: 10px 0 0 0;
    height: 70px;
    @include mxHeight(600px) {
      height: 57px;
    }
    @include mnHeight(1000px) {
      height: 8vh;
      margin: 3vh 0 0 0;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px !important;
    margin-bottom: 10px !important;
    width: 100%;
  }

  &__title {
    margin-top: 10px;
    text-align: center;
    line-height: 15px;

    &-one {
      font-size: 15px;
      color: white;
      @include lg() {
        font-size: 20px;
        margin: 18px 0;
      }
    }

    &-two {
      font-size: 10px;
      margin-bottom: 5px;
      color: white;
      @include lg() {
        font-size: 20px;
        margin: 18px 0;
      }
    }

    &-three {
      font-size: 14px;
      color: white;
      @include lg() {
        font-size: 20px;
        margin: 18px 0;
      }
    }
  }

  &__table {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.371);
    border-radius: 25px;
    width: 100%;
    @include lg() {
        width: 850px;
      }
      @include xlg() {
        width: 955px;
      }

    &-header {
      background: #309f3a;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-radius: 50px;
      height: 38px;
      width: 100%;
    }
    &-cant {
      @include lg() {
        margin-left: 10px !important;
      }
    }
    &-header-titles {
      margin: 0 !important;
      height: 100%;
      padding: 4px 0 0 0;
    }
    &-header-titles p{
      color: white;
      font-size: 20px;
      @include lg() {
        font-size: 23px;
      }
      @include xlg() {
        padding: 3px 0 0 0;
        font-size: 25px;
      }
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 95%;
      border-bottom: 2.5px dashed #da412e;
      font-size: 20px;
      @include lg() {
        margin: 10px 0 10px 0;
        font-size: 25px;
      }
      &:last-of-type {
        margin-bottom: 20px;
        font-size: 30px;
      }
    }

    &-content-element {
      flex-basis: 20%;
      display: flex;
      justify-content: center;
    }
    &-content-element:nth-child(1) {
      @include lg() {
      }
    }

    &-cant {
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px 0px 0px 10px !important;
      background: #309f3a;
      color: white;
      padding-top: 7px;
      border-radius: 50px;
      font-size: 15px;
    }

    &-text-content {
      margin-left: 15px;
      margin-right: 25px;
      margin-top: 5px;
      margin-bottom: 5px;
      line-height: 14px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 5px;

      &-alignEmpty {
        margin-left: 40px !important;
      }

      &-one {
        color: #da412e;
        font-size: 14px;
        margin: 0px !important;
        letter-spacing: 1.5px;
        @include lg() {
          font-size: 20px;
        }
      }

      &-two {
        color: #da412e;
        font-size: 11px;
        font-family: "SlintGeneralLeter";
        margin: 0px !important;
        @include lg() {
          font-size: 13px;
        }
      }

      &-award {
        text-align: start;
        color: #da412e;
        font-size: 11px;
        margin: 0px !important;
        @include lg() {
          font-size: 18px;
        }
      }
    }

    &-btn-plus {
      position: relative;
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px !important;
      padding: 0px;
      border-radius: 50px;
      &__background {
        background-color: white;
        position: absolute;
        height: 24px;
        width: 24px;
        top:4px;
        left: 4px;
        border-radius: 50%;
      }
    }
    &-btn-plus svg{
      z-index: 99;
      top:0;
      left: 0;
      position: absolute;
      fill: #309f3a;
      height: 35px;
      width: 35px;
  }
  &-btn-equal {
    position: relative;
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px !important;
      padding: 0px;
      border-radius: 50px;
    }
    &-btn-equal svg{
      z-index: 99;
      top:0;
      left: 0;
      position: absolute;
      fill: #309f3a;
      height: 30px;
      width: 30px;
      transform: rotate(90deg);
  }

  &__text-row {
    margin-left: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__alignmentText {
    margin-right: 25px !important;
  }
}
}
</style>
