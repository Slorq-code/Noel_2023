<template>
  <div class="howToTakePart">
    <div class="howToTakePart__titleContainer">
      <img
        v-if="!mobile"
        class="howToTakePart__titleContainer__title__web"
        src="../assets/Assets_Web_New/Titulo_como_participar.png"
        alt="Como participar titulo"
      />
      <img
        v-if="mobile"
        class="howToTakePart__titleContainer__title__mobile"
        src="../assets/Assets_Mobile_New/Titulo_como_participar.png"
        alt="Como participar"
      />
    </div>
      <div class="howToTakePart__contentBox">
        <h2 class="howToTakePart__contentBox-title">
          ¡Participar es muy fácil! Solo sigue estos sencillos pasos:
        </h2>
        <img
          v-if="!mobile"
          class="howToTakePart__image-content"
          src="../assets/Assets_Web_New/img_como_participar.png"
          alt="Como participar contenido"
        />
        <img
          v-if="mobile"
          class="howToTakePart__image-content-mobile"
          src="../assets/Assets_Mobile_New/Como_particiapr.png"
          alt="Como participar contenido"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: "HowToTakeƒart",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
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

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.howToTakePart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__titleContainer {
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include mnHeight(1000px) {
      margin-top: 3vh;
    }
    &__title__web {
      height: 70px;
      @include mxHeight(600px) {
        height: 65px;
      }
      @include mnHeight(1000px) {
        height: 8vh;
      }
    }
    &__title__mobile {
      width: 70%;
    }
  }
  &__title {
    width: 100%;
    text-align: center;
  }

  &__contentBox {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    @include mobile() {
      margin: 10px;
    }
    // @include mxHeight(885) {
    //   height: calc(100vh-200px);
    // }
    &-title {
      font-size: 16px;
      line-height: 16px;
      color: white;
      font-family: "NexaBold";

      @include mobile() {
        font-size: 15px;
        line-height: 15px;
        text-align: center;
        margin-bottom: 5px;
      }

      @include xs() {
        font-size: 15px;
        line-height: 15px;
        margin-bottom: 5px;
      }
    }
  }

  &__image {
    &-title {
      height: 70px;
      &-mobile {
        height: 70px;
      }
    }
  }

  &__image-content {
    margin: 10px 0;
    width: 65%;
    @include mnHeight(780px) {
      height: calc(90vh - 220px);
      width: 90%;
    }
    &-mobile {
      height: 640px;
      @include xs() {
	height: 650px;
      }
    }
  }
}
</style>
