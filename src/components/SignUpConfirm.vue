<template>
  <div class="signup-confirm">
    <div class="signup-confirm__close-container">
      <img @click="close()" class="signup-confirm__close-image" src="@/assets/web/btn_cerrar.png" />
    </div>
    <img class="signup-confirm__image" src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png" />
    <div class="signup-confirm__content">
      <div :class="[ 'wrapper', handleClick1 === true ? 'animate-signIn' : ' ' && handleClick2 === false ? 'animate-signUp' : ' ',]">
                <div class="form-wrapper sign-up" @click="handleClick1 = !handleClick1; handleClick2 = !handleClick2;">

                    <span class="signup-confirm__text">Nombre: {{ user.names }}</span>
                    <span class="signup-confirm__text">Apellido: {{ user.last_names }}</span>
                    <span class="signup-confirm__text">Cédula: {{ user.idn }}</span>
                    <span class="signup-confirm__text">Correo: {{ user.email }}</span>
                    <span class="signup-confirm__text">Dpto: {{ user.department_state }}</span>
                    <span class="signup-confirm__text">ciudad: {{ user.city }}</span>
                    <span class="signup-confirm__text"> N° Celular: {{ number }} </span>
                    <span class="signup-confirm__text"> Operador: {{ user.operator }} </span>
                  <br>
                  <div class="signup-confirm__buttonDecoration">
                    <p class="signup-confirm__buttonDecoration__text">
                      Atrás</p>
                </div>
              </div>
              <div 
                class="form-wrapper sign-in"
                @click="handleClick1 = !handleClick1; handleClick2 = !handleClick2;"
              >
                  <span class="signup-confirm__text1">
                    Por favor confirma que tus datos estén correctos. Espescialmente tu CELULAR y OPERADOR. Recuerda que si eres ganador se realizará la recarga celular a ese número registrado.
                  </span>
                  <br>
                  <div class="signup-confirm__buttonDecoration">
                    <p class="signup-confirm__buttonDecoration__text">
                    ¡Revisa los datos!
                    </p>
                  </div>
                </div>
        </div>
    </div>
    <div class="signup-confirm__buttons">
      <Button color="1" text="Editar" type="secondary" @handle-click="close()" />
      <Button text="Continuar " type="primary" :isLoading="loading" @handle-click="validateRecaptchaForSingUp()" />
    </div>
  </div>
</template>

<script>
import {
  Register,
  UpdateUser,
  Login,
} from "@/api";
import Button from "../components/Button"

export default {
  name: "SignupConfirm",
  components: {
    Button,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    
    name() {
      return this.user.names + " " + this.user.last_names;
    },
    number() {
      return `${this.user.phone.substring(0, 3)}-${this.user.phone.substring(
        3,
        6
      )}-${this.user.phone.substring(6, 10)}`;
    },
  },
  data() {
    return {
      loading: false,
      idn: "",
      handleClick1: false,
      handleClick2: false,
    };
  },
  methods: {
    //-----------------------------------------
    async validateRecaptchaForSingUp() {
      try {

        await this.$recaptchaLoaded()

        await this.$recaptcha('login');

        const token = await this.$recaptcha('login');

        this.recaptchaCode = token;

        this.loading = true;
        this.preRegister();
      } catch (error) {
        console.log("Sing Up error:", error);
      }
    },
    //-----------------------------------------


    close() {
      this.$emit("close");
    },
    closeSuccess(resp) {
      this.$emit("close-success", resp);
    },
    preRegister() {
      this.loading = true;
      this.edit ? this.update() : this.register();
    },
    capitalize(val, onlyFirstLetter = true) {
      const replacer = (match) => match.toUpperCase();
      if (typeof val !== "string") return "";
      const acronymRegex = /(([a-zA-Z]\.){2,})/g;
      const inLowerCase = val.toLowerCase();
      const capitalized = onlyFirstLetter
        ? inLowerCase.charAt(0).toUpperCase() + inLowerCase.slice(1)
        : inLowerCase.replace(/\b(\w)/g, (s) => s.toUpperCase());
      return capitalized.replace(acronymRegex, replacer);
    },

    register() {
      Register({
        ...this.user,
        adult_registration: 1,
        name: this.capitalize(this.name),
      })
        .then((resp) => {
          this.loading = false;
          this.closeSuccess(resp);
          this.$store.dispatch("setAlert", {
            buttonLabel: "CONTINUAR",
            type: "SUCCESS",
            showClose: true,
            title: "¡TU REGISTRO HA SIDO EXITOSO!",
            message: "¡Ya puedes comenzar a ingresar códigos!.",
          });
          this.LoginAfterRegister()
        })
        .catch((err) => {
          this.loading = false;
          this.close();
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type: "INFO",
            showClose: true,
            messages: err.response.data.errors,
          });
        });
    },

    LoginAfterRegister() {
      this.loading = true;
      Login(this.user.idn).then((resp) => {
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
              "¡El número de cédula esta en proceso de registro, intentalo en unos minutos!",
          });
        });
    },

    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },

    update() {
      UpdateUser({
        ...this.user,
        adult_registration: 1,
        name: this.capitalize(this.user.name),
      })
        .then((resp) => {
          this.loading = false;
          this.closeSuccess(resp);
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            title: "¡Felicitaciones!",
            message: "¡El registro se ha realizado exitosamente!",
          });
        })
        .catch((err) => {
          this.loading = false;
          this.close();
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            messages: err.response.data.errors,
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.signup-confirm {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 300px;
  height: 400px;
  padding: 10px 20px;
  @include mobile() {
    padding: 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    @include mobile() {
      overflow-y: auto;
      max-height: 300px;
    }
    @include xs() {
      margin-bottom: -6px;
    }
  }

  &__text1 {
    color: white;
    font-family: generalLeter;
    font-size: 18px;
    @include mobile() {
      font-size: 14px;
    }
  }

  &__text {
    color: white;
    margin: 0 !important;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    text-transform: capitalize;
    font-size: 13px;
    @include mobile() {
      font-size: 12px;
    }
    @include mobile() {
      font-size: 12.5px;
    }
  }
  &__buttonDecoration {
    background-color: #309f3a;
    border-radius: 25px;
    box-shadow: 0px 3px 6px #00000067;
    border: 3px solid white;
    height: 40px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__text {
      font-size: 14px;
      color: white;
    }
  }

  &__image {
    height: 137px;
    margin: -83px 0 15px 0;

    @include mobile() {
      height: 120px;
      margin: -56px 0 8px 0;
    }

    @include xs() {
      height: 110px;
      margin: -70px 0 -1px 0;
    }
  }

  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;
  }

  &__close-image {
    height: 30px;
    cursor: pointer;

    @include mobile() {
      height: 28px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
    margin-top: 20px;
    padding: 0px 40px;

    @include mobile() {
      padding: 0px 10px;
    }

    @include xs() {
      margin-top: 10px;
    }
  }
}

//------- de aqui en adelante es el css para la animacion

.home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logoProject {
    height: auto;
    width: 15%;
    margin: 0 0 35px 0;
}

.logoVue {
    position: absolute;
    top: 10px;
    left: 15px;
}

.wrapper {
    position: relative;
    width: 100%;
    height: 240px;
}

.form-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(85, 85, 85, 0.376);
    border-radius: 25px;
    border: 2px solid gray;
    transition: 1s ease-out;
}

.animate-signUp .form-wrapper.sign-in {
    cursor: pointer;
    transform: rotate(0deg);
    animation: animateRotate 0.7s ease-in-out forwards;
    animation-delay: 0.5s;
    border: 2px solid white;
    border-radius: 25px;
    padding: 0 10px;
    background: linear-gradient(180deg, rgba(242,186,31,1) 0%, rgba(244,122,46,1) 100%);
}

.animate-signIn .form-wrapper.sign-in {
    animation: animateSignIn 2s ease-in-out forwards;
}

@keyframes animateSignIn {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-450px);
    }

    100% {
        transform: translateX(0) rotate(0deg);
    }
}

.wrapper .form-wrapper.sign-up {
    transform: rotate(0deg);
}

.wrapper.animate-signIn .form-wrapper.sign-up {
    animation: animateRotate 0.7s ease-in-out forwards;
    animation-delay: 0.5s;
    border-radius: 25px;
    cursor: pointer;
    border: 2px solid white;
    background: linear-gradient(180deg, rgba(242,186,31,1) 0%, rgba(244,122,46,1) 100%);
}

@keyframes animateRotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0);
        z-index: 1;
    }
}

.wrapper.animate-signUp .form-wrapper.sign-up {
    animation: animateSignUp 2s ease-in-out forwards;
}

@keyframes animateSignUp {
    0% {
        transform: translateX(0);
        z-index: 1;
    }

    50% {
        transform: translateX(450px);
    }

    100% {
        transform: translateX(0) rotate(0deg);
    }
}

h2 {
    font-size: 30px;
    color: #555;
    text-align: center;
}

.input-group {
    position: relative;
    width: 320px;
    margin: 30px 0;
}

.input-group label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 16px;
    color: #333;
    padding: 0 5px;
    pointer-events: none;
    transition: 0.5s;
}

.input-group input {
    width: 100%;
    height: 40px;
    font-size: 16px;
    color: #333;
    padding: 0 10px;
    background: transparent;
    border: 1px solid #333;
    outline: none;
    border-radius: 5px;
}

.input-group input:focus~label,
.input-group input:valid~label {
    top: 0;
    font-size: 12px;
    background: #fff;
}

.forgot-pass {
    margin: -15px 0 15px;
}

.forgot-pass a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
}

.forgot-pass a:hover {
    text-decoration: underline;
}

.btn {
    position: relative;
    top: 0;
    left: 0;
    width: 342px;
    height: 40px;
    background: #35324a;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    outline: none;
}

.sign-link {
    font-size: 18px;
    text-align: center;
    margin: 25px 0;
}

.sign-link p {
    color: #333;
}

.sign-link p a {
    color: #ed1b2e;
    text-decoration: none;
    font-weight: 600;
}

.sign-link p a:hover {
    text-decoration: underline;
}









</style>