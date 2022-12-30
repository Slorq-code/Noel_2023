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
        <h1 class="myCodesWeb__title-one">
          ¡Bienvenido Carlos Moran!
        </h1>
        <h2 class="myCodesWeb__title-two">
          Celular para premios: (311) 522 3148
        </h2>
        <h3 class="myCodesWeb__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesWeb__table">
        <div class="myCodesWeb__table-header">
          <p class="myCodesWeb__table-header-titles">Cant.</p>
          <p class="myCodesWeb__table-header-titles">Saltín Noel</p>
          <p class="myCodesWeb__table-header-titles">Ducales</p>
          <p class="myCodesWeb__table-header-titles">Premios</p>
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
                {{ item.saltinNoel.titleTwo }}
              </p>
            </div>
            <div
              v-else
              class="myCodesWeb__table-text-content myCodesWeb__table-text-content-alignEmpty"
            >
              -
            </div>
            <div class="myCodesWeb__table-btn-action">
              <p>
                +
              </p>
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
                {{ item.ducales.titleTwo }}
              </p>
            </div>
            <div
              v-else
              class="myCodesWeb__table-text-content myCodesWeb__table-text-content-alignEmpty"
            >
              -
            </div>
            <div class="myCodesWeb__table-btn-action">
              <p>=</p>
            </div>
          </div>
          <div class="myCodesWeb__table-content-element">
            <p
              style="text-align: center;"
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
            titleOne: "prueba1",
            titletwo: "prueba2",
          },
          ducales: {
            titleOne: "prueba3",
            titletwo: "prueba4",
          },
          
          award: "felicidaes",
          cant:1
        },
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
          cant:2
        },
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
          cant:3
        },
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
          cant:4
        }
      ]
    };
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
  font-family: "NexaBold";
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
    padding-bottom: 10px !important;
    margin-bottom: 10px !important;
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
    background-color: rgba(255,255,255,0.21380427170868344);

    &-header {
      background: #309f3a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1px 10px;
      border-radius: 50px;
      height: 40px;
      @include lg() {
        width: 1100px;
        height: 50px;
      }
      @include xlg() {
        width: 1500px;
        height: 70px;
      }
    }
    &-cant {
      @include lg() {
        margin-left: 10px !important;
      }
    }
    &-header-titles {
      margin: 0 !important;
      color: white;
      margin: 0px 60px 0px 60px !important;
      font-size: 20px;
      @include lg() {
        font-size: 25px;
        margin: 0px 90px 0px 40px !important;
      }
      @include xlg() {
        font-size: 30px;
      }
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 20px 0px 20px;
      border-bottom: 1px dashed #da412e;
      font-size: 20px;
      @include lg() {
        margin: 10px 0;
        font-size: 25px;
      }
      &:last-of-type {
        margin-bottom: 20px;
        font-size: 30px;
      }
    }

    &-content-element {
      flex-basis: 20%;
      padding: 0px 0px 2px 0px;
      display: flex;
      justify-content: center;
    }
    &-content-element:nth-child(1) {  
      @include lg() {
        padding: 0px 100px 2px 0px;
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
      font-size: 10px;
    }

    &-text-content {
      margin-left: 15px;
      line-height: 14px;
      margin-right: 25px;
      margin-top: 5px;
      text-align: center;

      &-alignEmpty {
        margin-left: 40px !important;
      }

      &-one {
        color: #da412e;
        font-size: 12px;
        margin: 0px !important;
        @include lg() {
          font-size: 18px;
        }
      }

      &-two {
        color: #da412e;
        font-size: 12px;
        font-family: "MyriadProRegular";
        margin: 0px !important;
        @include lg() {
          font-size: 18px;
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

    &-btn-action {
      height: 26px;
      width: 26px;
      text-align: center;
      margin: 0px !important;
      padding: 0px;
      border-radius: 50px;

      p {
        margin: 0px !important;
        margin-top: -1px !important;
        font-size: 20px !important;
        color: white;
        background-color: #309f3a;
        border-radius: 50%;
      }
    }
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
</style>
