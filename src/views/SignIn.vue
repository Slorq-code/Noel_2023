<template>
  <div class="signIn__wrapper">
    <img class="signIn__titlePage" src="../assets/Assets_Web_New/Titulo_Bienvenido.png" alt="Bienvenida">
    <div class="signIn">
      <div class="signIn__image-content">
        <!-- <span class="signIn__title" v-if="!mobile">Bienvenido a</span> -->
        <img
          class="signIn__image"
          src="../assets/Assets_Web_New/IMG_LOGO_PAQUETES_LOGIN.png"
        />
        <img
          class="signIn__image-mobile"
          src="../assets/Assets_Mobile_New/img_login.png"
          alt="logo_mobile"
        />
      </div>
      <div class="signIn__content">
        <!-- <div class="signIn__section1">
          <div class="signIn__section1-button">
            <Button
              text="Ingresar"
              type="primary"
              :isLoading="loading"
              @handle-click="signIn()"
            />
          </div>
        </div> -->
        <div class="signIn__section2">
          <span class="signIn__section2-text">
            Para participar, completa tu registro.
          </span>
          <div class="signIn__section2-button">
            <Button
              text="Registrarme"
              type="primary"
              @handle-click="register()"
            />
          </div>
          <br>
          <span class="signIn__section2-singIn signIn__section2-text">
            ¿Ya estás registrado?
            <a  class="signIn__dispachModalSingIn" href="#" @click="boolSingIn = true">
              Inicia Sesión
            </a>
          </span>
        </div>
      </div>
    </div>
    <img
      class="signIn__image-login-bottom"
      src="@/assets/web/Caja_texto_login.png"
      alt="texto_login"
    />
    <modal :dialog="boolSingIn" width="600" @close="boolSingIn = false" :permanent="false">
      <sing-in-modal slot="component" @close="boolSingIn = false"></sing-in-modal>
    </modal>
  </div>
</template>

<script>
import Button from "../components/Button";
import { Login } from "../api";
import Modal from '../components/Modal';
import SingInModal from '../components/SingInModal.vue';

export default {
  name: "SignIn",
  data() {
    return {
      loading: false,
      idn: "",
      error: "",
      boolSingIn: false,
    };
  },
  mounted() {},
  components: {
    Button,
    Modal,
    SingInModal,
  },
  props: {},
  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
  },
  methods: {
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    register() {
      this.goTo("/registrarse");
    },
    signIn() {
      if (this.idn) {
        if (!this.error) {
          this.loading = true;
          Login(this.idn)
            .then((resp) => {
              this.loading = false;
              this.$store.dispatch("setToken", resp.token);
              this.$store.dispatch("setUser", resp.user);
              this.$store.dispatch("loadBalance");
              this.goTo("/ingresar-codigo");
            })
            .catch(() => {
              this.loading = false;
              this.$store.dispatch("setAlert", {
                buttonLabel: "Aceptar",
                showClose: true,
                type: "INFO",
                message:
                  "¡El número de cédula ingresado no se encuentra registrado!",
              });
            });
        }
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type: "INFO",
          showClose: true,
          message: "¡Ingresa un número de cédula válido!.",
        });
      }
    },
    setValue(e) {
      this.idn = e.value;
      this.validate();
    },
    validate() {
      if (this.idn) this.idn = this.idn.trim();
      const idReq = /^([1-9]{1}[0-9]{6,9})$/;
      this.error =
        this.idn && !idReq.test(this.idn)
          ? "Ingresa un número de cédula válido."
          : "";
    },
  },
  watch: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.signIn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  &__titlePage{
    margin: 2% 0 0 0;
    @include mxHeight (600px) {
      height: 69px;
    }
  }
  &__image-login-bottom {
    display: none;

    @include xs() {
      display: initial;
      height: 80px;
      margin-bottom: 10px;
    }
  }
  &__image-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__image {
    width: 70%;
    @include mxHeight(600px) {
      width: 60%;
    }
    @include mobile() {
      display: none;
    }

    &-mobile {
      display: none;
      height: 306px;
      margin-bottom: 10px;
      @include mobile() {
        height: 230px;
        display: initial;
      }
      @include xs() {
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 3px 6px #00000029;
    background-color: rgba(250, 250, 250, 0.2);
    padding: 18px 20px;
    border-radius: 20px;
    width: 35%;
    margin: 1% 0 0 0;

    @include mobile() {
      margin: 10px 0px;
    }

    @include xs() {
      margin-top: -15px;
    }
  }
  &__section1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__section1-text {
    font-family: NexaBold;
    color: #253e87;
    line-height: 12px;
    font-size: 12px;
    margin-bottom: 10px;
    text-align: center;
  }
  &__section1-button {
    margin-top: -25px;
  }
  &__section2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__section2-text {
    font-family: NexaBold;
    color: #ffffff;
    line-height: 12px;
    font-size: 12px;
    margin-bottom: 15px;
    text-align: center;
  }
  &__dispachModalSingIn{
    color: white !important;
  }
  &__title {
    font-family: NexaBold;
    font-size: 36px;
    margin-right: 60px;
    color: #131f45;
  }
  &__line {
    margin: 0 40px;
    height: 80px;
    border-right: 3px solid #131f45;
    @include mobile() {
      margin: 20px 0;
      height: 10px;
      width: 140px;
      border-right: none;
      border-top: 3px solid #131f45;
    }

    @include xs() {
      margin: 10px 0;
    }
  }
}
</style>
