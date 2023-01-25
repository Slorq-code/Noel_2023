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
        <h1 class="myCodesWeb__title-one">¡Bienvenido {{user.name}}!</h1>
        <h2 class="myCodesWeb__title-two">
          Celular para premios: {{ user.phone }}
        </h2>
        <h3 class="myCodesWeb__title-three">
          Éste es el estado de tus códigos:
        </h3>
      </div>

      <div class="myCodesWeb__table">
        <div class="myCodesWeb__table-header">
          <div class="myCodesWeb__table-header-titles"> <p> Cant.</p></div>
          <div class="myCodesWeb__table-header-titles myCodesWeb__table-header-titlesDiferent1"> <p> Saltín Noel</p></div>
          <div class="myCodesWeb__table-header-titles"> <p> Ducales</p></div>
          <div class="myCodesWeb__table-header-titles"> <p> Premios</p></div>
        </div>
        <div
          class="myCodesWeb__table-content"
          v-for="(item, index) in tableData"
          v-bind:key="index"
        >
        <div class="myCodesWeb__table__box">
          <div class="myCodesWeb__table__circle">
            <p class="myCodesWeb__table__numbers">{{item.cant }}</p>
          </div>
        </div>

        <div class="myCodesWeb__table__box myCodesWeb__table__box1">
          <p class="myCodesWeb__table__codes">{{ item.saltinNoel ? item.saltinNoel : "-" }}</p>
          <p class="myCodesWeb__table__date">{{ item.dateSaltin}}</p>
        </div>
        
        <div class="myCodesWeb__table__box">
          <div class="myCodesWeb__table__circle">
            <p class="myCodesWeb__table__symbols">+</p>
          </div>
        </div>
        
        <div class="myCodesWeb__table__box">
          <p class="myCodesWeb__table__codes">{{item.ducales ? item.ducales : "-"}}</p>
          <p class="myCodesWeb__table__date">{{item.dateDucales}}</p>
        </div>

        <div class="myCodesWeb__table__box">
          <div class="myCodesWeb__table__circle">
            <p class="myCodesWeb__table__symbols">=</p>
          </div>
        </div>

        <div class="myCodesWeb__table__box">
          <p class="myCodesWeb__table__award">{{item.award=="PAREJA INCOMPLETA" ? "-" : item.award}}</p>
        </div>
        
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
      const newPhone = " +" + phone.slice(0, 2) + " (" + phone.slice(2, 5) + ") " + phone.slice(5);
      return { name: String(name).toUpperCase(), phone: newPhone };
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
p {
  margin-bottom: 0px !important;
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
    justify-content: space-evenly;
    align-items: center;
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
    &__box {
    position: relative;
    min-width: 14%;
    max-width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    }
    &__box1 {
      margin: 0 0 0 80px;
    }
    &__circle {
      background-color: #309f3a;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 39.5px;
      height: 39.5px;
      border-radius: 50%;
      border: 2px solid white;
    }
    &__numbers {
      font-size: 24px;
      position: absolute;
      top: 4%;
    }
    &__symbols {
      font-size: 36px;
      position: absolute;
      top: -10px;
    }

    &__circle p{
      color: white;
      font-family: SlintGeneralLeter;
    }
    &__codes {
      color: #D93D2D;
      padding: 0 0 0px 0;
      font-size: 20px;
      height: 24px;
    }
    &__award {
      color: #D93D2D;
    }
    &__date {
      color: #D93D2D;
      font-family: SlintGeneralLeter;
      font-size: 14px;
      @include xlg() {
        font-size: 15.5px;
      }
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
    &-header-titles {
      margin: 0;
      height: 100%;
      padding: 4px 0 0 0;
    }
    &-header-titlesDiferent1 {
      margin: 0 10px 0 0;
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
      justify-content: space-between;
      width: 95%;
      border-bottom: 2.5px dashed #da412e;
      font-size: 20px;
      padding: 0 50px;
      margin: 15px 0 0 0;
    }
    &-content:last-child {
      border-bottom: 0px;
      margin: 15px 0 10px 0;
    }
    &-btn-equal svg{
      fill: #309f3a;
    }
  }
}
</style>
