<template>
  <div>
    <MyCodesMobile v-if="mobile" :tableData="tableData" />
    <MyCodesWeb v-if="!mobile" :tableData="tableData" />
  </div>
</template>

<script>
import MyCodesMobile from "./MyCodesMobile";
import MyCodesWeb from "./MyCodesWeb";

export default {
  name: "MyCodes",
  mounted() {
    this.$store.dispatch("getCodes");
  },
  components: {
    MyCodesMobile,
    MyCodesWeb,
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    codes() {
      return this.$store.getters.codes;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    formatDate(date) {
      if(date === null ) {
        return " "
      }if (date){
        const splitDate = date.split(" ")[0].split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
      } else {
        return " "
      }
    },
    formatData(data) {
      const newData = data.map((item, index) => {
        const saltinCodeEmpty = !item.code && "Saltín";
        const ducalesCodeEmpty = !item.code_2 && "Ducales";
        const emptyCode = saltinCodeEmpty ? saltinCodeEmpty : ducalesCodeEmpty;
        const image = {
          noComplete: require(`../../assets/mobile/Pareja_incompleta_mis_codigos_respons.png`),
          tacoSaltin: require("../../assets/Assets_Mobile_New/pack_Saltin.png"),
          tacoDucales: require("../../assets/Assets_Mobile_New/pack_Ducales.png"),
          tacoSaltinDisabled: require("../../assets/Assets_Mobile_New/Saltin_gris.png"),
          tacoDucalesDisabled: require("../../assets/Assets_Mobile_New/Ducales_gris.png"),
          primeCompu: require(`@/assets/mobile/Premio_compus_mis_codigos_respons.png`),
          bonus: require("@/assets/mobile/Premio_tarjetas_mis_codigos_respons.png"),
          phone: require("@/assets/mobile/Premio_celulares_mis_codigos_respons.png"),
          computer: require("@/assets/mobile/Premio_compus_mis_codigos_respons.png"),
          charge: require("@/assets/mobile/Premio_recargas_mis_codigos_respons.png"),
          none: require("@/assets/mobile/Pareja_incompleta_mis_codigos_respons.png"),
          pending_saltin: require("@/assets/mobile/Pareja_incompleta_mis_codigos_respons.png"),
          pending_ducales: require("@/assets/mobile/Pareja_incompleta_mis_codigos_respons.png"),
          reversed: require("@/assets/mobile/Quitar_premio_mis_codigos_respons.png"),
        };
        const strings = {
          bonus: "¡T. REGALO!",
          computer: "¡COMPUTADOR!",
          charge: "¡RECARGA!",
          phone: "¡CELULAR!",
          none: "SIGUE INTENTANDO",
          reversed: "¡CANCELADO!",
        };
        const texts = {
          bonus: `¡Ganaste tarjeta regalo`,
          phone: `¡Ganaste celular!`,
          computer: `¡Ganaste computador!`,
          charge: `¡Ganaste recarga!`,
          none: `!Esta vez no ganaste premio!`,
          reversed: "¡CANCELADO!",
        };
        const results = {
          bonus: `¡Ganaste tarjeta regalo!`,
          phone: `¡Ganaste celular!`,
          computer: `¡Ganaste computador!`,
          charge: `¡Ganaste recarga!`,
          none: `¡SIGUE INTENTANDO!`,
          reversed: "¡CANCELADO!",
        };
        index === 0 && console.log("");

        return {
          cant: index + 1,
          saltinNoel: item.code,
          dateSaltin:  item.saltin_at ? this.formatDate(item.saltin_at) : "",
          ducales: item.code_2,
          dateDucales: item.ducales_at ? this.formatDate(item.ducales_at) : "",
          award:
            item.code && item.code_2
              ? strings[item.result]
              : "PAREJA INCOMPLETA",
          titleMobile:
            item.code && item.code_2 ? "¡PAREJA COMPLETA!" : "¡PAREJA INCOMPLETAL",
          titleMobileLitle:
          item.code && item.code_2 ? "Pareja Completa" : "Pareja Incompleta",
          resultCouple:
            item.code && item.code_2
              ? texts[item.result]
              : `¡Te falta un código de ${emptyCode}!`,
          complete: item.code && item.code_2,
          image:
            item.code && item.code_2 ? image[item.result] : image["noComplete"],
          result:
            item.code && item.code_2
              ? results[item.result]
              : "¡ingresa el código faltante y participa!",
          resultLine:
            item.code && item.code_2
              ? results[item.result]
              : "-",
          saltinTacoImage: item.code
            ? image["tacoSaltin"]
            : image["tacoSaltinDisabled"],
          ducalesTacoImage: item.code_2
            ? image["tacoDucales"]
            : image["tacoDucalesDisabled"],
        };
      });
      return newData;
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    codes(data) {
      this.tableData = this.formatData(data);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.myCodes {
  display: flex;
  justify-content: center;
}
</style>
