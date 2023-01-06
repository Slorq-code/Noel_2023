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
        v-for="(item, index) in tableWinnerss"
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
    <modal width="950" :dialog="dialog">
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
        <div class=" winners__table winners__table-modal">
          <div class="winners__table-header">
            <div class="winners__table-header-item">
              {{ mobile ? "Nombre" : "Nombre del Participante" }}
            </div>
            <div v-if="!mobile" class="winners__table-header-item">Ciudad</div>
            <div class="winners__table-header-item">Premio</div>
          </div>
          <div class="winners__wrapper-table-row">
            <div
              class="winners__table-content-row"
              v-for="(item, index) in tableWinnersModal"
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
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
  name: "Winners",
  data() {
    return {
      tableWinners: [],
      tableWinnersModal: [
        {
          name: "Martín Barrera",
          city: "Bogota",
          result: "recarga"
        },
        {
          name: "Pablo prueba",
          city: "Felipe López",
          result: "Tarjeta Regalo"
        },
        {
          name: "Giovanni Ruíz",
          city: "Bogota",
          result: "recarga"
        },
        {
          name: "Luciana Torres",
          city: "Bogota",
          result: "Tarjeta Regalo"
        },
        {
          name: "Adriana Rodriguez",
          city: "Bogota",
          result: "Tarjeta Regalo"
        },
      ],
      dialog: false,
      tableWinnerss: [
        {
          name: "Martín Barrera",
          city: "Bogota",
          result: "recarga"
        },
        {
          name: "Pablo prueba",
          city: "Felipe López",
          result: "Tarjeta Regalo"
        },
        {
          name: "Giovanni Ruíz",
          city: "Bogota",
          result: "recarga"
        },
        {
          name: "Luciana Torres",
          city: "Bogota",
          result: "Tarjeta Regalo"
        },
        {
          name: "Adriana Rodriguez",
          city: "Bogota",
          result: "Tarjeta Regalo"
        },
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getWinners");
  },
  components: {
    Modal,
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
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {
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

      this.tableWinners = dataTable.slice(0, 6);
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
      margin-top: 3vh;
    }
  @include lg() {
    width: 80%;
    margin-top: 3vh;
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
  &__wrapper-table-row {
    height: 86%;
    padding: 0 20px 0 0;
    overflow-y: auto;
    @include mobile() {
      height: 250px;
      padding: 0 0px 0 0;
    }
    @include mxHeight(701px){
      height: 71%;
    }
  }

  &__table {
    margin-top: 10px;
    flex: 1;
    width: 800px;
    padding: 0px !important;
    background-color: rgba(255, 255, 255, 0.371);
    border-radius: 28px;
    @include mobile() {
      width: 50vh;
    }
    @include lg() {
      width: 60%;
    }
    @include xlg() {
      width: 70%;
    }
  }
  &__table-modal {
    background-color: initial;
  }
  &__table-header {
    display: flex;
    justify-content: space-around;
    padding: 5px 50px;
    margin: 0 0 0 0;
    background: #309f3a;
    border-radius: 30px;
    @include mobile() {
      padding: 5px 10px;
      margin: 0 10px 0 10px;
    }
    @include lg () {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @include xlg() {
      height: 70px;
    }

    &-item {
      color: white;
      flex-basis: 33.3%;
      text-align: center;
      font-size: 15px;
      @include mobile() {
        flex-basis: 50%;
        font-size: 13px;
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
    padding: 5px 50px;
    border-bottom: 1px dashed #fff581;

    @include mobile() {
      padding: 5px 10px;
    }

    &:last-of-type {
      margin-bottom: 10px;
      border-bottom: none;
    }
  }

  &__color {
    color: rgb(173, 36, 30);
    @include mobile() {
      font-size: 18px;
    }
  }

  &__color-dark {
    color: rgb(173, 36, 30);
    @include mobile() {
      font-size: 18px;
    }
  }

  &__reset-padding {
    padding: 5px 10px;
  }

  &__winners-button {
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
    }
    @include lg() {
      margin: 40px 0px 0px 0px;
      width: 30%;
      height: 60px;
      font-size: 20px;
    }
    @include xlg() {
      margin: 60px 0px 0px 0px;
      height: 70px;
      font-size: 25px;
    }
    @include mxHeight(550px) {
      margin: 25px 0 0 0 ;
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
    @include mnHeight(1000px) {
      height: 70vh !important;
    }
    margin-bottom: 20px;
    @include mobile() {
      padding: 10px;
    }

    @include xs() {
      height: 340px;
    }
  }
  &__image {
    height: 220px;
    margin-top: -100px;
    @include xs() {
      height: 140px;
      margin-bottom: -25px;
      margin-top: -65px;
    }
    @include mobile() {
      height: 160px;
      margin-top: -80px;
    }
    @include mxHeight(590px) {
      height: 120px;
    }
  }
  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -60px;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
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
