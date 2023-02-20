<template>
  <div class="winners">
    <img
      v-if="!mobile"
      class="winners__title"
      src="../assets/Assets_Web_New/Titulo_ganadores.png"
      alt="Ganadores titulo"
    />
    <img
      v-if="mobile"
      class="title-views-global__mobile"
      src="../assets/Assets_Mobile_New/Titulo_ganadores.png"
      alt="Ganadores titulo"
    />
    <div class="winners__table">
      <div class="winners__table-header">
        <div class="winners__table-header-item">
          {{ mobile ? "Nombre" : "Nombre del Participante" }}
        </div>
        <div v-if="!mobile" class="winners__table-header-item">Ciudad</div>
        <div class="winners__table-header-item">Premio</div>
      </div>
      <div
        class="winners__table-content-row"
        v-for="(item, index) in tableWinners"
        :key="index"
      >
        <div class="winners__table-header-item winners__color">
          {{ item.name }}
        </div>
        <div v-if="!mobile" class="winners__table-header-item winners__color">
          {{ item.city }}
        </div>
        <div class="winners__table-header-item winners__color-dark">
          {{ item.result }}
        </div>
      </div>
    </div>

    <button
      @click="dialog = true"
      v-if="tableWinners"
      class="winners__winners-button"
    >
      Ver los ganadores
    </button>

    <modal color="si" width="640" :dialog="dialog">
      <div class="winners__modal-content" slot="component">
        <div class="winners__close-container">
          <img
            @click="dialog = false"
            class="winners__close-image"
            src="@/assets/web/btn_cerrar.png"
          />
        </div>
        <img
          class="winners__image"
          src="../assets/Assets_Mobile_New/Logo_Juntos_Premiarte_2022_modales.png"
        />
        <img
          class="winners__title2"
          src="../assets/Assets_Web_New/Titulo_ganadores.png"
          alt="Ganadores titulo"
        />
        <div class="winners__table winners__table-modal">
          <div class="winners__table-header">
            <div class="winners__table-header-item">
              Participante
            </div>
            <div v-if="!mobile" class="winners__table-header-item">Ciudad</div>
            <div class="winners__table-header-item">Premio</div>
          </div>
          <div class="winners__wrapper-table-row">
            <div
              class="winners__table-content-row"
              v-for="(item, index) in datosPaginados"
              :key="index"
            >
              <div class="winners__table-header-item winners__color">
                {{ item.name }}
              </div>
              <div
                v-if="!mobile"
                class="winners__table-header-item winners__color"
              >
                {{ item.city }}
              </div>
              <div class="winners__table-header-item winners__color-dark">
                {{ item.result }}
              </div>
            </div>
          </div>
        <Pagination/>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
// import { GetPage } from "@/api";

export default {
  name: "Winners",
  data() {
    return {
      tableWinners: [],
      tableWinnersModal: [],
      tableWinnersTest: [
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
        {
          name: "andres",
          city: "bogota",
          result: "ganaste",
        },
      ],
      dialog: false,
      datosPaginados: [],
    };
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    getPage(page) {
      this.$store.setPage( page )
    },
  },

  mounted() {
    this.$store.dispatch("getWinners")
    this.$store.dispatch("setClients")

    //------------------------ datos de prueba --------------------------------
    console.log( this.datosPaginados, "este es los datos paginados")
    //------------------------ datos de prueba --------------------------------

  },
  components: {
    Modal,
    Pagination,
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.winners;
    },
    formatDate(date) {
      if (date) {
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return "";
      }
    },
    winners() {
      return this.$store.getters.winners;
    },
    clients() {
      return this.$store.getters.clientsModal;
    },
  },
  watch: {
    
    clients(data) {
      const strings = {
        bonus: "Tarjeta Regalo",
        computer: "Computador",
        phone: "Celular",
        charge: "Recarga",
      };
      const dataTablePaginada = data.map((item) => ({
        ...item,
        result: strings[item.result],
      }));

      this.datosPaginados = dataTablePaginada;
      console.log(dataTablePaginada, "estoy en el watch" )
    },


    winners(data) {
      const strings = {
        bonus: "Tarjeta Regalo",
        computer: "Computador",
        phone: "Celular",
        charge: "Recarga",
      };
      const dataTable = data.map((item) => ({
        ...item,
        result: strings[item.result],
      }));

      this.tableWinners = dataTable.slice(0, 8);
      this.tableWinnersModal = dataTable;
    },





  },
};


</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.winners {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @include mnHeight(1000px) {
    margin: 3vh 0 0 0;
  }
  @include lg() {
    width: 80%;
    margin: 3vh 0 0 0;
  }
  @include mxHeight(600px) {
    margin: 3vh 0 7vh 0;
  }
  &__title {
    height: 70px;
    @include mxHeight(600px) {
      height: 65px;
    }
    @include mnHeight(1000px) {
      height: 8vh;
    }
  }
  &__title2 {
      height: 55px;
      width: auto;
      @include mxHeight(440px){
        @include mnWidth(500px) {
          height: 40px;    
        }
      }
  }
  &__wrapper-table-row {
    height: 490px;
    padding: 0 0px 0 15px;
    margin: 0 0 20px 0;
    overflow-y: auto;
    @include mobile() {
      height: 250px;
      padding: 0 0px 0 0;
    }
    @include mxHeight(701px) {
      height: 57%;
    }
    @include mxHeight(640px) {
      height: 50%;
    }
  }

  &__table {
    margin-top: 10px;
    flex: 1;
    width: 800px;
    padding: 0px !important;
    background-color: rgba(255, 255, 255, 0.256);
    border-radius: 28px;
    @include mobile() {
      width: 50vh;
    }
    @include lg() {
      width: 60%;
    }
    @include xlg() {
      width: 50%;
    }

    @include mxHeight(440px){
      @include mnWidth(500px) {
        width: 100vh;
      }
  }
    // @include mnHeight(1000px) {
    //   width: 90%;
    // }
  }
  &__table-modal {
    background-color: initial;
    width: 100%;
    @include mobile() {
      margin: 15px 0 0 0;
    }
  }
  &__table-header {
    display: flex;
    justify-content: space-around;
    padding: 5px 8px;
    margin: 0 0 0 0;
    height: 38px;
    background: #309f3a;
    border-radius: 30px;
    @include mobile() {
      padding: 5px 10px;
      height: 30px;
    }
    @include lg() {
      height: 41px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @include xlg() {
      height: 50px;
    }

    &-item {
      color: white;
      flex-basis: 33.3%;
      text-align: center;
      text-shadow: none;
      font-size: 15px;
      @include mobile() {
        flex-basis: 50%;
      }
      @include lg() {
        font-size: 16px;
      }
      @include xlg() {
        font-size: 19px;
      }
    }
  }

  &__table-content-row {
    display: flex;
    justify-content: space-around;
    padding: 5px 12px;
    border-bottom: 1px dashed #fff581;
    &:last-of-type {
      margin-bottom: 10px;
      border-bottom: none;
    }
  }

  &__color {
    color: rgb(173, 36, 30);
    @include mobile() {
      font-size: 13px;
    }
  }

  &__color-dark {
    color: rgb(173, 36, 30);
    @include mobile() {
      font-size: 13px;
    }
  }

  &__reset-padding {
    padding: 5px 10px;
  }

  &__winners-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    font-size: 16px;
    background-color: #309f3a;
    border: 2px white solid;
    box-shadow: 0px 3px 6px #00000067;
    border-radius: 30px;
    color: white;
    padding: 10px 50px;
    margin: 20px 0px 0px 0px;
    font-size: 13px;
    @include xs() {
      margin: 10px;
      padding: 10px;
      font-size: 14px;
    }
    @include mobile() {
      font-size: 15px;
      height: 40px;
    }
    @include lg() {
      margin: 40px 0px 0px 0px;
      width: 30%;
      height: 45px;
      font-size: 20px;
    }
    @include xlg() {
      margin: 60px 0px 0px 0px;
      height: 50px;
      font-size: 25px;
    }
    @include mxHeight(550px) {
      margin: 25px 0 0 0;
    }
  }

  &__modal-content {
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-height: 300px;
    padding: 10px 20px;
    height: 71vh;
    margin-bottom: 20px;
    @include mobile() {
      padding: 10px;
      height: 57vh;
    }
    @include mnHeight(1000px) {
      height: 70vh !important;
    }
    @include xs() {
      height: 340px;
    }
    @include mxHeight(440px){
      @include mnWidth(500px) {
        margin-bottom: -48px;
      }
    }
  }


  //------------------------
  &__image {
    height: 150px;
    margin-top: -30px;

    @include mobile() {
      height: 120px;
      margin-top: -20px;
    }
    @include xs() {
      margin-top: -25px;
      margin-bottom: -10px;
    }

    @include mxHeight(650px) {
      height: 120px;
      margin-bottom: 0px;
    }

    @include mxHeight(440px){
      @include mnWidth(500px) {
        height: 82px;
      }
    }
  }


  //------------------------
  &__close-container {
    width: 100%;
    padding: 10px;
    margin-top: -60px;
    position: relative;
  }
  &__close-image {
    position: absolute;
    top: 15px;
    right: -40px;
    height: 30px;
    cursor: pointer;
    @include mobile() {
      right: -11px;
      height: 28px;
      z-index: 999;
    }
  }
  /* width */
  ::-webkit-scrollbar {
    width: 8px !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #ffffff !important;
    border-radius: 10px !important;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: white !important;
    border: 1px solid black;
  }
}
</style>
