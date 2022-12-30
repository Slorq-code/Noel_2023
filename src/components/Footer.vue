<template>
  <div class="footer">
    <div class="footer__facebook-content">
      <img
        @click="gotoSaltin()"
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text" @click="gotoSaltin()"
        >galletassaltinnoel</span
      >
      <img
        @click="gotoDucales()"
        class="footer__facebook"
        src="@/assets/web/ico_facebook.png"
      />
      <span class="footer__facebook-text" @click="gotoDucales()"
        >ducalesgruponutresa</span
      >
    </div>
    <span class="footer__text">Noel - 2023</span>
    <div class="footer__routes" v-if="token">
      <img class="footer__coljuegos" src="@/assets/web/Logo_coljuegos.png" />
      <span
        v-if="token"
        style="margin: 20px"
        class="footer__text cp"
        @click="gotoTerms()"
        >Términos y Condiciones</span
      >
      <span
        v-if="token"
        style="margin: 20px"
        class="footer__text cp"
        @click="gotoContacts()"
        >Contáctanos</span
      >
    </div>
    <img v-if="!token" class="footer__coljuegos" src="@/assets/web/Logo_coljuegos.png" />
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      selectedRoute: "",
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
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    gotoContacts() {
      this.goTo("/contactenos");
    },
    gotoTerms() {
      this.$store.dispatch("setTermsAndConditions", true);
    },
    gotoSaltin() {
      window.open(
        `https://www.facebook.com/galletassaltinnoel/?epa=SEARCH_BOX`,
        "_blank"
      );
    },
    gotoDucales() {
      window.open(`https://www.facebook.com/ducalesgruponutresa/`, "_blank");
    },
  },
  watch: {
    "$route.path": {
      handler: function(path) {
        this.selectedRoute = path;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  z-index: 3;
  background-color: #882518;
  padding: 0 0;
  @include lg() {
    height: 60px;
  }
  @include xlg() {
    height: 70px;
  }
  &__coljuegos {
    height: 59.3px;
  }
  &__facebook {
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  &__facebook-content {
    display: flex;
    align-items: center;
  }
  &__facebook-text {
    color: #f0b824;
    font-size: 13px;
    margin-right: 20px;
    cursor: pointer;
    @include lg() {
      font-size: 15px;
    }
    @include xlg() {
      font-size: 22px;
    }
  }
  &__text {
    font-size: 13px;
    color: #f0b824;
    text-align: center;
    @include lg() {
      font-size: 15px;
    }
    @include xlg() {
      font-size: 22px;
    }
  }
  .cp {
    cursor: pointer;
    text-decoration: underline;
  }
  &__routes {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
}
</style>
