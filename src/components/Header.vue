<template>
  <div class="header">
    <img
      class="header__menu"
      src="@/assets/mobile/btn_menu.png"
      v-if="mobile"
      @click="onClickDrawer"
    />
    <img
      class="header__logo"
      @click="logoClick()"
      src="../assets/Assets_Web_New/logos_header.png"
      v-if="!token"
    />
    <img
      class="header__logo__logoCurva1"
      @click="logoClick()"
      src="../assets/Assets_Web_New/logos_header_barriga.png"
      alt="logos"
      v-if="!token"
    />
    <img
      class="header__logo__second"
      @click="logoClick()"
      src="../assets/Assets_Web_New/Logo_header_Juntos_Premiarte_2022.png"
      v-if="token && !mobile"
    />
    <div class="header__web-routes" v-if="!this.mobile">
      <div
        v-for="(route, k) in webRoutes"
        :key="k"
        :class="{
          'header--web-route-selectedBorder': route.path === selectedRoute,
        }"
      >
        <img
          src="../assets/Assets_Web_New/moneda_hover_header.png"
          alt="Modena"
          :class="{
            'header--web-route-selected-img header--web-route-selected':
              route.path === selectedRoute,
          }"
          v-if="selectedRoute == route.path"
        />
        <div
          v-if="route.isVisible()"
          @click="click(route)"
          class="header__web-route"
          :class="{
            'header--web-route-selected': route.path === selectedRoute,
          }"
        >
          <span
            class="header__web-route-text"
            :class="{
              'header--web-route-text-selected': route.path === selectedRoute,
            }"
            >{{ route.name }}
          </span>
        </div>
      </div>
      <br v-if="!token" />
      <br v-if="!token" />
      <br v-if="!token" />
      <br v-if="!token" />
    </div>
    <img
      class="header__logo__logoCurva2"
      @click="logoClick()"
      src="../assets/Assets_Web_New/logos_header_barriga.png"
      alt="logos"
      v-if="token"
    />
    <div v-if="dialog" class="modal-mobile-navigator">
      <div class="modal-mobile-navigator__content">
        <div
          :class="[
            'modal-mobile-navigator__modal-content',
            active === true
              ? 'modal-mobile-navigator__modal-content modal-mobile-navigator__modal-content__active'
              : 'modal-mobile-navigator__modal-content',
          ]"
        >
          <div class="modal-mobile-navigator__centerBox">
            <img
              class="modal-mobile-navigator__imageHeader"
              src="../assets/Assets_Web_New/logos_header.png"
              alt="informacion"
              @click="logoClick()"
            />
          </div>
          <img
            class="modal-mobile-navigator__image"
            src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png"
          />
          <div class="modal-mobile-navigator__close-container">
            <img
              @click="dialog = false"
              class="modal-mobile-navigator__close-image"
              src="@/assets/web/btn_cerrar.png"
            />
          </div>
          <div class="container-routes-mobile">
            <div
              v-for="(route, k) in webRoutes"
              :key="k"
              class="header__web-route header__web-route-mobile"
            >
              <div
                v-if="route.isVisible()"
                @click="click(route)"
                :class="{
                  'header--web-route-selected': route.path === selectedRoute,
                }"
              >
                <span
                  class="header__web-route-text"
                  :class="{
                    'header--web-route-text-selected':
                      route.path === selectedRoute,
                  }"
                  >{{ route.name }}
                </span>
              </div>
            </div>
          </div>
          <div class="header__container">
            <div class="header__container__social">
              <img
                @click="gotoSaltin()"
                class="footer1__facebook footer2__facebook"
                src="../assets/Assets_Mobile_New/facebook.png"
              />
              <span class="" @click="gotoSaltin()">galletassaltinnoel</span>
            </div>
            <div class="header__container__social">
              <img
                @click="gotoDucales()"
                class="footer1__facebook footer2__facebook"
                src="../assets/Assets_Mobile_New/facebook.png"
              />
              <span class="" @click="gotoDucales()">ducalesgruponutresa</span>
            </div>
          </div>
          <img
            class="modal-mobile-navigator__col-juegos"
            src="@/assets/web/Logo_coljuegos.png"
            alt="Col juegos"
            @click="gotoColjuegos()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClearSession } from "../api";
export default {
  name: "Header",
  data: () => ({
    drawer: false,
    routes: [],
    selectedRoute: "",
    dialog: false,
    active: false,
  }),
  watch: {
    "$route.path": {
      handler: function (path) {
        this.selectedRoute = path;
      },
      deep: true,
      immediate: true,
    },
    mobile(old) {
      if (!old) this.dialog = false;
    },
  },
  mounted() {
    this.routes = [
      {
        name: "Iniciar Sesión",
        path: "/ingresar",
        isVisible: () => !this.token,
      },
      {
        name: "Registrarme",
        path: "/registrarse",
        isVisible: () => !this.token && this.mobile,
      },
      {
        name: "Ingresar código",
        path: "/ingresar-codigo",
        isVisible: () => this.token,
      },
      {
        name: "Cómo Participar",
        path: "/como-particiar",
        isVisible: () => true,
      },
      {
        name: "Ganadores",
        path: "/ganadores",
        isVisible: () => this.token,
      },
      {
        name: "Premios",
        path: "/premios",
        isVisible: () => true,
      },
      {
        name: "Mis Códigos",
        path: "/mis-codigos",
        isVisible: () => this.token,
      },
      {
        name: "Términos y Condiciones",
        path: "/terminos-y-condiciones",
        isVisible: () => !this.token || this.mobile,
        clickAction: () => {
          this.dialog = false;
          this.$store.dispatch("setTermsAndConditions", true);
        },
      },
      {
        name: "Contáctanos",
        path: "/contactenos",
        isVisible: () => this.token && this.mobile,
      },
      {
        name: "Cerrar Sesión",
        path: "/ingresar",
        // clickAction: () => {
        //   this.dialog = false
        //   this.logout();
        // },
        isVisible: () => this.token,
      },
    ];
  },
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
    webRoutes() {
      return this.routes.filter((r) => r.isVisible());
    },
    user() {
      return this.$store.getters.user;
    },
    show() {
      const idn = this.user.identification || this.user.idn;
      return this.selectedRoute !== "/editar-cuenta" && this.user.name && idn;
    },
  },
  methods: {
    logout() {
      ClearSession().then(() => {
        this.$store.dispatch("logout");
        this.goTo("/contactenos");
      });
    },
    logoClick() {
      this.token ? this.goTo("/ingresar-codigo") : this.goTo("/ingresar");
    },
    toggle() {
      this.drawer = !this.drawer;
    },
    goTo(path) {
      if (this.$route.path !== `${path}`) this.$router.push(path);
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
    gotoColjuegos() {
      window.open(`https://www.coljuegos.gov.co/`, "_blank");
    },
    click(item) {
      if (item.clickAction) {
        item.clickAction();
      } else {
        this.goTo(item.path);
        this.dialog = false;
      }
    },
    gotoYoutube() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    gotoInstagram() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    gotoFacebook() {
      window.open(`https://yupi.com.co/`, "_blank");
    },
    onClickDrawer() {
      this.dialog = true;
      console.log("Click");
      this.active = true;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: radial-gradient(
    circle,
    rgba(222, 62, 40, 1) 0%,
    rgba(129, 36, 26, 1) 100%
  );
  height: 60px;
  border-radius: 35px;
  padding: 0 0 0 20px;
  margin: 10px 10px 0 10px;
  position: relative;
  @include mxHeight(600px) {
    height: 55px;
  }
  @include tablet() {
    padding: 0 0px 0 40px;
  }
  @include mobile() {
    padding: 0 0px 0 20px;
  }
  &__logo {
    height: 90%;
    cursor: pointer;
    @include mobile() {
      height: auto;
      width: 70%;
      display: none;
    }
    &__logoCurva1 {
      height: 100% !important;
      display: none;
      @include mobile() {
        display: initial;
      }
    }
    &__logoCurva2 {
      height: 100% !important;
      cursor: pointer;
    }
    &__second {
      width: 15%;
      padding: 5% 0 0 0;
      margin: 0 0 0 20px;
      @include lg() {
        width: 17%;
      }
    }
  }
  &__menu {
    height: 30px;
    z-index: 99;
    cursor: pointer;
  }
  &__web-routes {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 20px 0 0px;
    margin: 0 0px 0 40px;
    height: 22px;
    @include tablet() {
      margin-left: 20px;
    }
  }
  &__web-routes div {
    display: flex;
    gap: 7px;
  }
  &__web-route {
    display: flex;
    cursor: pointer;
    padding: 0px 10px 0px 10px;
    text-align: center;
    line-height: 14px;
  }

  &__web-route-mobile {
    margin: 5px 0px 10px 0px;
  }
  &--web-route-selected {
    padding: 0 0 4px 0;
  }
  &--web-route-selectedBorder {
    border-bottom: 2px #eeb024 solid;
  }
  &--web-route-selected-img {
    height: 17px;
  }
  &__web-route-text {
    display: flex;
    align-items: center;
    color: white;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 0.9rem;
    text-align: center;
    @include mxHeight(650px) {
      font-size: 0.8rem;
    }
    @include xlg() {
      font-size: 1.2rem;
    }
  }
  &--web-route-text-selected {
    transform: scale(1.01);
    transition: 1s ease-out;
    color: #eeb024;
  }
  &__container {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 15%;
    width: 100%;
    padding: 0px 15px;
    z-index: 999;
    @include mobile() {
      @include mxHeight(650px) {
        bottom: 20%;
      }
      @include mxHeight(850px) {
        bottom: 25%;
      }
    }
    &__social {
      display: flex;
      justify-content: flex-start;
    }
    &__social span {
      cursor: pointer;
      color: white;
      @include xs() {
        font-size: 14px;
      }
    }
  }
}

.modal-mobile-navigator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  &__content {
    max-height: 70% !important;
    width: 600px;
    background: radial-gradient(
      circle,
      rgba(222, 62, 40, 1) 0%,
      rgba(129, 36, 26, 1) 100%
    );
    position: relative;
    box-shadow: 0px 0px 15px #0000004d;
    border-radius: 15px;
    @include mobile() {
      width: 90% !important;
    }
    @include xs() {
      max-height: 100% !important;
    }
  }

  &__modal-content {
    position: absolute;
    top: -50vh !important;
    left: -50vh;
    height: 100vh;
    width: 40vh;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: flex-start;
    background: radial-gradient(
      circle,
      rgba(222, 62, 40, 1) 0%,
      rgba(129, 36, 26, 1) 100%
    );
    min-height: 300px;
    padding: 10px 20px;
    transition: transform 0.7s ease-out;
    transform: translateX(46vh);
    @include mobile() {
      padding: 11.0% 0px 10px 10px;
    }
    // &__active {
    //   informacion
    // }
  }

  &__image {
    width: 80%;
    margin-top: -100px;
    margin-bottom: 10px;
    @include mobile() {
      margin: 10px 0 0 11%;
    }
    @include mxHeight(650px) {
      width: 60%;
      margin: 10px 0 0 20%;
    }
  }
  &__centerBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  &__imageHeader {
    height: 100%;
    width: 100%;
    margin: 0 0px 20px 0;
    cursor: pointer;
  }
  &__close-container {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px 0px;
    left: 15%;
    top: 6%;
  }
  &__close-image {
    height: 30px;
    cursor: pointer;
    @include mobile() {
      height: 28px;
    }
  }

  &__col-juegos {
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    @include mxHeight(850px) {
      bottom: 50px;
    }
  }
}
.container-routes-mobile {
  margin: 100px 0 0 0px;
  max-height: 70% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  @include mobile() {
    margin: 21px 0 5% 10%;
    @include mxHeight(850px) {
      margin: 15px 0 0% 10%;
    }
  }
}
</style>
