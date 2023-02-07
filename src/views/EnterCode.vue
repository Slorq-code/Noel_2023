<template>
  <div class="enterCode">
    <div v-if="!mobile" class="enterCode__counter-content">
      <div v-if="!mobile" class="enterCode__ad">
        <span class="enterCode__ad__text">
          ¡Recuerda guardar los stickers que registraste!
        </span>
      </div>
      <div class="enterCode__counterBox" >
        <img
          class="enterCode__counter-img"
          src="../assets/Assets_Web_New/Contador_premios.png"
        />
        <span class="enterCode__counter-text">{{ total | amount }}</span>
      </div>
    </div>
    <div v-if="!mobile" class="enterCode-web">
      <div class="enterCode-web__section-1">
        <img
          class="enterCode-web__logo"
          src="../assets/Assets_Web_New/Titulo_Bienvenido.png"
        />
      </div>
      <div class="enterCode-web__section-2">
        <img
          class="enterCode-web__title"
          src="../assets/Assets_Web_New/Img_juntos_premiarte_ingreso_codigos.png"
        />
        <div class="enterCode-web__section-2__middleTitle">
          <span>
            Ingresa aquí los códigos que encontraste en los stickers dentro de
            los empaques de Saltín Noel y Ducales.
          </span>
        </div>
        <div class="enterCode-web__flex">
          <div class="enterCode-web__box">
            <div class="enterCode-web__box-item">
              <img
                class="enterCode-web__saltin-image"
                src="../assets/Assets_Web_New/circulo_noel.png"
              />
              <Input
                class="uppercase"
                field="saltin"
                :model="saltin"
                :error="errors.saltin"
                @handle-input="setValue($event)"
                maxlength="9"
                placeholder="Ingresar código Saltín Noel"
              />
            </div>
            <img
              class="enterCode-web__more"
              src="../assets/Assets_Web_New/circulo_mas.png"
            />
            <div class="enterCode-web__box-item">
              <img
                class="enterCode-web__ducales-image"
                src="../assets/Assets_Web_New/circulo_ducales.png"
              />
              <Input
                class="uppercase"
                field="ducales"
                :model="ducales"
                :error="errors.ducales"
                maxlength="9"
                @handle-input="setValue($event)"
                placeholder="Ingresar código Ducales"
              />
            </div>
            <img
              class="enterCode-web__more"
              src="../assets/Assets_Web_New/circulo_mas.png"
            />
          </div>
          <div class="enterCode-web__rec">
            <div>
              <Button
                text="Registrar Código"
                type="primary"
                @handle-click="validateRecaptcha()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mobile" class="enterCode-mobile">
      <span class="enterCode-web__mini-text">
        Ingresa aquí los códigos que encontraste en los stickers dentro de los
        empaques de Saltín Noel y Ducales.
      </span>
      <img
        class="enterCode-mobile__mini"
        src="../assets/Assets_Web_New/Img_juntos_premiarte_ingreso_codigos.png"
      />
      <div class="enterCode-mobile__strange">
        <Input
          class="uppercase"
          :field="'code'"
          :model="code"
          maxlength="9"
          :error="errors.code"
          @handle-input="setValue($event)"
          placeholder="Ingresar tu código aquí"
        />
        <span class="enterCode-web__mini-text">
          Recuerda guardar los stickers que registraste.
        </span>
      </div>
      <div class="enterCode-web__rec">
      </div>
      <div class="enterCode-mobile__button-wrapper">
        <!-- <Button text="Registrar Código" type="primary" @handle-click="send()" /> -->
        <Button text="Registrar Código" type="primary" @handle-click="validateRecaptcha()" />
      </div>
      <div class="enterCode-mobile__title">
        <span class="enterCode-mobile__title__counter">Premios disponibles: {{ total | amount }}</span>
      </div>
    </div>
    <modal
      :dialog="dialog"
      @close="
        dialog = true;
      "
      width="550"
    >
    <Alert :show="show" @close="show = false" :data="alert" />
    </modal>
    <modal
      :dialog="dialog"
      @close="
        dialog = false;
      "
      width="550"
    >
      <register-code-confirm
        v-if="dialog"
        :user="user"
        :saltin="respStatus.saltin"
        :ducales="respStatus.ducales"
        :saltinMsg="respStatus.saltinMsg"
        :ducalesMsg="respStatus.ducalesMsg"
        :status="respStatus.status"
        slot="component"
        @close="dialog = false"
      ></register-code-confirm>
    </modal>
  </div>
</template>

<script>
import Input from "../components/Input";
import Button from "../components/Button";
import { SaveCodes, GetStatus } from "../api";
import RegisterCodeConfirm from "../components/RegisterCodeConfirm";
import Modal from "../components/Modal";
// import Alert from "../components/Alert";



export default {
  name: 'EnterCode',
  data() {
    return {
      loading: false,
      errors: {},
      recaptchaCode: null,
      count: 0,
      ducales: "",
      saltin: "",
      userStatus: "",
      respStatus: {
        ducales: "",
        saltin: "",
        saltinMsg: "",
        ducalesMsg: ""
      },
      dialog: false,
      code: ''
    };
  },
  components: {
    Input,
    Button,
    RegisterCodeConfirm,
    Modal,
    // Alert
  },
  filters: {
    amount(value) {
      if (value) {
        const req = /(\d)(?=(\d{3})+(?!\d))/g;
        const formattedValue = value.toString();
        let endValue = formattedValue.replace(req, "$1.");
        return endValue;
      }
      return "0.00";
    },
  },
  mounted() {
    this.$store.dispatch("loadBalance");
  },

  computed: {
    mobile() {
      return this.$store.getters.mobile;
    },
    total() {
      return this.$store.getters.total;
    },
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {


    //-----------NUEVA LOGICA RECAPCHA----------------------
    
    validateRegister() {
      if (this.id.length == 8) {
        this.validateRecaptcha();
      } else {
        this.$store.dispatch("app/setAlert", {
          buttonLabel: "Aceptar",
          type: "INFO",
          showClose: false,
          message: "¡Ingresa un código válido!.",
        });
        return false;
      }
    },

    async validateRecaptcha() {
      try {
        
        await this.$recaptchaLoaded()

        await this.$recaptcha('login');

        const token = await this.$recaptcha('login');

        this.recaptchaCode = token;

        this.loading=true;
        this.send();
      } catch (error) {
        console.log("Login error:", error);
      }
    },

    send() {
      if (this.saltin || this.ducales) {
        this.save(
            this.mobile ? this.code : this.saltin,
            this.mobile ? this.code : this.ducales
          );
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
          message: "¡Ingresa un código de Saltín Noel o Ducales válido!."
        });
      }
    },
    //------------------------------------------------------

    // para este punto ya se valido el recaptcha
    save(saltin, ducales) {
      this.loading = true;
      SaveCodes({
        code_saltin: saltin,
        code_ducales: ducales
      })
        .then((resp) => {
          GetStatus().then(resp2 => {
              this.loading = false;
              this.respStatus = {
                ducales: resp.data.ducales.res,
                saltin: resp.data.saltin.res,
                saltinMsg: resp.data.saltin.message,
                ducalesMsg: resp.data.ducales.message,
                status: resp2.data || ''
              };
              this.dialog = true;
              //this.$refs.recaptcha.reset()
              this.recaptchaCode = null;
              this.$store.dispatch("loadBalance");
              this.ducales = "";
              this.saltin = "";
              this.code = ""
          });
        })
        .catch((err) => {
          if (err.response.status !== 401) {
            this.ducales = "";
            this.saltin = "";
            this.code = ""
            this.loading = false;
            this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type:'INFO',
            showClose: true,
            message: err.response.data.message.mensaje || "Error en el servicio.",
          });
          }
        });
    },
    verifyRecaptcha(token) {
      this.recaptchaCode = token;
    },
    expiredRecaptcha() {
      this.recaptchaCode = null;
    },
    setValue(e) {
      e.key === "saltin" ? (this.saltin = e.value) : (this.ducales = e.value);
      this.code = e.value;
    },
    verifyCatptcha() {
      if (this.count === 3) {
        //this.$refs.recaptcha.reset()
        this.recaptchaCode = null;
        this.count = 0
      } else {
        this.count = this.count + 1;
      }
    }
  }
}
















</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";


.rc-anchor-normal,
.rc-anchor-pt {
  margin: 2px 80px 0 0 !important;
}

.rc-anchor-normal {
  margin: 2px 80px 0 0 !important;
}

.rc-anchor-pt {
  margin: 2px 80px 0 0 !important;
}

.uppercase div input {
  letter-spacing: 2px;
  text-transform: uppercase;
}

.enterCode {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  &__counter-content {
    display: flex;
    z-index: -1;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin: 0 0 -243px 0;
    height: 240px;
  }
  &__counterBox {
    position: relative;
    margin: 0 122px 0 0;
    width: 210px;
    height: auto;
  }
  &__counter-img {
    width: 210px;
    height: auto;
  }

  &__counter-text {
    position: absolute;
    color: white;
    right: 75px;
    top: 82px;
    font-size: 28px;
  }
  &__ad {
    border-radius: 25px;
    border: 2.5px solid white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.239);
    height: 100px;
    width: 185px;
    margin: 0 0 34px 122px;
    @include xlg() {
      top: 10.5%;
      height: calc(100px + 50px);
      width:  calc(185px + 70px);
      padding: 0 10px;
      margin: 0 0 10px 122px;
    }
    &__text {
      font-size: 1rem;
      color: white;
      @include xlg() {
        font-size: 1.5rem;
      }
    }
  }
}

.enterCode-web {
  display: flex;
  flex-direction: column;
  width: 80%;
  text-align: center;
  align-items: center;

  &__rec {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @include xlg() {
      margin: 3% 0 0 5%;
    }
  }

  &__more {
    height: 35px;
    margin: 10px;

    @include lg() {
      height: 40px;
    }

    @include xlg() {
      height: 45px;
    }
  }

  &__mini-text {
    width: 80%;
    margin: 2% 0 5% 0;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    color: white;
    font-size: 20px;
    line-height: 20px;
    @include mobile() {
      text-align: center;
      font-size: 16px;
    }

    @include xs() {
      font-size: 14px;
      line-height: 15px;
      margin: 10px 0px 15px 0px;
    }
  }

  &__flex {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  &__section-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__logo {
    height: 50px;
    margin: 5% 0 0 0;
    @include xlg() {
      height: 65px;
    }
    @include lg() {
      height: 60px;
      margin: 11% 0 15% 0;
    }
    @include mxHeight(600px) {
      height: 58px;
      margin: 10px 0 13px 0;
    }
  }

  &__section-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;

    &__middleTitle {
      color: white;
      width: 50%;
      margin: 10px 0px;

      @include xlg() {
        width: 60%;
        margin: 30px 0px;
      }
    }

    &__middleTitle span {
      font-size: 0.8rem;
      text-shadow: 0px 3px 6px #00000029;

      @include lg() {
        font-size: 1rem;
      }

      @include mnHeight(1000px) {
        font-size: 1.5rem;
      }
    }
  }

  &__title {
    margin: -10px 0 0 0;
    width: 40%;
    @include lg() {
      width: 40%;
    }
    @include xlg() {
      width: 35%;
    }
    @include mxHeight(650px) {
      margin: -20px 0 0 0;
      width: 58vh;
    }
  }

  &__box {
    display: flex;
    align-items: center;

    @include xlg() {
      margin-top: 60px;
    }
  }

  &__mini {
    height: 54px;
    margin: 10px;
  }

  &__subtitle-box {
    display: flex;
    align-items: center;
    width: 500px;
  }

  &__box-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include lg() {
      @include mnHeight(1000px) {
        margin: 0 30px;
      }
    }

    @include xlg() {
      margin: 0 80px;
    }
  }

  &__ducales-image,
  &__saltin-image {
    width: 135px;
    height: 121px;

    @include mxHeight(650px) {
      width: 105px;
      height: 98px;
    }

    @include lg() {
      width: 130px;
      height: 117px;

      @include xlg() {
        width: 232px;
        height: 208px;
      }
    }

    &__box-text {
      margin-top: -24px;
      font-family: generalLeter;
      text-shadow: 0px 3px 6px #00000029;
      color: white;
      font-size: 16px;
    }
  }
}

.enterCode-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  width: 100%;

  @include xs() {
    padding: 10px 0px;
  }
  &__strange {
    margin-bottom: 4%; 
    text-align: center; 
    width: 270px; 
    margin-right: 20px;
  }
}

.enterCode-mobile__title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 0px 0;
  height: 45px;
  width: 260px;
  &__counter {
    color: rgb(255, 255, 255);
    margin: 0 5px;
    text-decoration: underline;
  }
}

.enterCode-mobile__mini {
  width: 90%;
  margin-bottom: 10px;
  @include xs() {
    height: 120px;
    width: initial;
    margin-bottom: 10px;
  }
  @include mxHeight(440px){
      @include mnWidth(500px) {
        width: 50%;
      }
  }
}

.enterCode-mobile__counter {
  height: 80px;
}

.other {
  margin-top: -34px;
  font-size: 12px;
  margin-bottom: 10px;
}

.enterCode-mobile__counter-content {
  position: relative;
  margin-top: 0px;
}

.enterCode-mobile__counter-text {
  position: absolute;
  bottom: 31px;
  right: 60px;
}

.enterCode-mobile__button-wrapper {
  height: 30px !important;

  *,
  *:after {
    font-size: 12px !important;
    height: 35px;
    display: flex;
    align-items: center;
  }
}

.containerAnimation {
  display: none;

  @media (max-height: 740px) {
    display: flex;
    justify-content: center;
    left: 0%;
    bottom: 25%;
    position: fixed;
    width: 150px;
    height: 150px;
    margin: auto;
  }
}

.containerAnimation:hover {
  opacity: 0;
  transition: opacity 4s ease-in-out;
}

.objetAnimation {
  display: none;

  @media (max-height: 740px) {
    display: block;
    height: 40px;
    width: 20px !important;
    position: relative;
    animation: bounce 1.5s infinite;
  }
}

@keyframes bounce {
  10% {
    height: 40px;
    width: 20px;
  }

  30% {
    height: 40px;
    width: 15px;
  }

  50% {
    height: 35px;
    width: 25px;
    transform: translateY(110px);
  }

  75% {
    height: 40px;
    width: 23px;
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
