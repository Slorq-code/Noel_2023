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
          v-for="(item, index) in tableData"
          v-bind:key="index"
        >
        <p>{{ }}</p>
        <p></p>
        <p></p>
        <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCodesWeb",
  data() {return {}},

  mounted() {
    console.log("actual2", this.tableData[1]);
    this.tableData;
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
    &-content div{
      min-width: 192px;
    }


    &-content-element {
      display: flex;
      justify-content: center;
      min-width: 22%;
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
        min-width: 24px !important;
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
    min-width: 23%;
  }

  &__alignmentText {
    margin-right: 25px !important;
  }
}

//----

}
</style>
