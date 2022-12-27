<template>
  <div class="awards">
    <div class="awards__titleContainer">
      <img
        class="awards__titleContainer__title"
        src="../assets/Assets_Web_New/Titulo_premios.png"
        alt="Titulo premios"
      />
    </div>
    <div class="awards__margin">
      <div class="awards__contentBox">
        <h2 class="awards__contentBox-title">
          ¡Estos son los premios que tenemos para ti!
        </h2>
        <img 
        class="awards__contentBox__banner"
        v-if="!mobile"
        src="../assets/Assets_Web_New/img_premios.png" 
        alt="Premios"/>
        <img 
        class="awards__contentBox__banner__mobile"
        v-if="mobile"
        src="../assets/Assets_Mobile_New/img_premios.png" alt="Premios"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Awards",
  data() {
    return {
      dialog: false,
      type: 1,
    };
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
    winners() {
      return this.$store.getters.winners;
    },
  },
  methods: {
    openModal(type) {
      this.type = type;
      this.dialog = true;
    },
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.awards {
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
    &__title {
      height: 70px;
      @include mxHeight(600px) {
        height: 65px;
      }
      @include mnHeight(1000px) {
        height: 8vh;
      }
    }
  }
  &__margin {
    margin: 0px 15px;
  }

  &__title {
    width: 100%;
    text-align: center;
    margin: 0 15px;
  }

  &__contentBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 0 10px 0;
    @include mobile() {
      margin: 0px;
    }
    &-title {
      font-size: 20px;
      text-align: center;
      line-height: 16px;
      color: white;
      font-family: "NexaBold";
    }
    &__banner {
      width: 90%;
      @include lg() {
        width: 100%;
      }
      @include mnHeight(780px) {
      height: calc(90vh - 220px);
    }
      &__mobile {
      width: 80%;
      @include mxHeight(600px) {
        width: 70%;
      }
      }
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__contentImage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 10%;
    flex: 1;

    @include tablet() {
      flex-basis: 50%;
    }

    @include mobile() {
      flex-basis: 10%;
    }

    @include xs() {
      flex-basis: 100%;
    }

    &-title {
      margin: 20px 0;
      width: 190px;
      text-align: center;
      font-size: 17px;
      line-height: 17px;
      color: white;
      line-height: 17px;
      font-family: "NexaBold";
    }

    &-image {
      height: 130px;
    }
  }
  &__image {
    &-title {
      height: 80px;

      &-mobile {
        width: auto;
        height: 50px;
      }
    }
  }

  &__titleTwo {
    font-size: 15px;
    color: white;
    font-family: "NexaBold";
  }

  &__helperImage {
    margin-top: 10px;

    &-image {
      height: 80px;
      @include xs() {
        height: 80px;
      }
    }
  }

  &__borderBottom {
    border-bottom: 1px solid white;
    margin-bottom: 2px;
    padding-bottom: 5px;
  }

  &__resizeImage {
    padding: 20px 20px 0 20px;
  }

  &__resizeImageTwo {
    padding: 15px 15px 0 15px;
  }

  &__awards__moveText {
    text-align: start;
  }
}
</style>
