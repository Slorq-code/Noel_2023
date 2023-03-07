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
              
              
              <!-- ---------------------- marca de agua ---------------------- -->


              <img
                v-if="false"
                class="enterCode-web__saltin-image"
                src="../assets/Assets_Web_New/circulo_noel.png"
              />
              <img
                v-if="true"
                class="enterCode-web__saltin-image"
                src="../assets/Assets_Web_New/circulo_noel2.png"
              />
              
              
              <!-- ---------------------- marca de agua ---------------------- -->


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
              
              
              <!-- ---------------------- marca de agua ---------------------- -->


              <img
                v-if="false"
                class="enterCode-web__ducales-image"
                src="../assets/Assets_Web_New/circulo_ducales.png"
              />
              <img
                v-if="true"
                class="enterCode-web__ducales-image"
                src="../assets/Assets_Web_New/circulo_ducales2.png"
              />
              
              
              <!-- ---------------------- marca de agua ---------------------- -->


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
    this.$store.dispatch("setAlert", {
      buttonLabel: "CONTINUAR",
      type: "SUCCESS",
      showClose: true,
      title: "¡ATENCIÓN!",
      message: "Saltín Noel y Ducales quiere informarte que en ninguna promoción de producto, ni ien proceso de selección liderador por nuestra Compañia se exige dinero, consignaciones o algún tipo de pago por ningún concepto. Personas mal intencionadas estan haciendo uso de nuestra marca para ganar dinero, ENGAÑANDO A LAS PERSONAS que no están relacionadas con NOEl.",
    });
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
  margin: .125rem 5rem 0 0 !important;
}

.rc-anchor-normal {
  margin: .125rem 5rem 0 0 !important;
}

.rc-anchor-pt {
  margin: .125rem 5rem 0 0 !important;
}

.uppercase div input {
  letter-spacing: .125rem;
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
    margin: 0 0 -15.1875rem 0;
    height: 15rem;
  }
  &__counterBox {
    position: relative;
    margin: 0 7.625rem 0 0;
    width: 13.125rem;
    height: auto;
  }
  &__counter-img {
    width: 13.125rem;
    height: auto;
  }

  &__counter-text {
    position: absolute;
    color: white;
    right: 4.6875rem;
    top: 5.125rem;
    font-size: 1.75rem;
  }
  &__ad {
    border-radius: 1.5625rem;
    border: .1563rem solid white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.239);
    height: 6.25rem;
    width: 11.5625rem;
    margin: 0 0 2.125rem 7.625rem;
    @include xlg() {
      top: 10.5%;
      height: calc(6.25rem + 3.125rem);
      width:  calc(11.5625rem + 4.375rem);
      padding: 0 .625rem;
      margin: 0 0 .625rem 7.625rem;
    }
    &__text {
      font-size: 16px;
      color: white;
      @include xlg() {
        font-size: 24px;
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
    height: 2.1875rem;
    margin: .625rem;

    @include lg() {
      height: 2.5rem;
    }

    @include xlg() {
      height: 2.8125rem;
    }
  }

  &__mini-text {
    width: 80%;
    margin: 2% 0 5% 0;
    font-family: generalLeter;
    text-shadow: 0rem .1875rem .375rem #00000029;
    color: white;
    font-size: 1.25rem;
    line-height: 1.25rem;
    @include mobile() {
      text-align: center;
      font-size: 1rem;
    }

    @include xs() {
      font-size: .875rem;
      line-height: .9375rem;
      margin: .625rem 0rem .9375rem 0rem;
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
    height: 3.125rem;
    margin: 5% 0 0 0;
    @include xlg() {
      height: 4.0625rem;
    }
    @include lg() {
      height: 3.75rem;
      margin: 11% 0 15% 0;
    }
    @include mxHeight(37.5rem) {
      height: 3.625rem;
      margin: .625rem 0 .8125rem 0;
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
      margin: .625rem 0rem;

      @include xlg() {
        width: 60%;
        margin: 1.875rem 0rem;
      }
    }

    &__middleTitle span {
      font-size: 12.8px;
      text-shadow: 0rem .1875rem .375rem #00000029;

      @include lg() {
        font-size: 16px;
      }

      @include mnHeight(62.5rem) {
        font-size: 24px;
      }
    }
  }

  &__title {
    margin: -0.625rem 0 0 0;
    width: 40%;
    @include lg() {
      width: 40%;
    }
    @include xlg() {
      width: 35%;
    }
    @include mxHeight(40.625rem) {
      margin: -1.25rem 0 0 0;
      width: 58vh;
    }
  }

  &__box {
    display: flex;
    align-items: center;

    @include xlg() {
      margin-top: 3.75rem;
    }
  }

  &__mini {
    height: 3.375rem;
    margin: .625rem;
  }

  &__subtitle-box {
    display: flex;
    align-items: center;
    width: 31.25rem;
  }

  &__box-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include lg() {
      @include mnHeight(62.5rem) {
        margin: 0 1.875rem;
      }
    }

    @include xlg() {
      margin: 0 5rem;
    }
  }

  &__ducales-image,
  &__saltin-image {
    width: 8.4375rem;
    height: 4.375rem;

    @include mxHeight(40.625rem) {
      width: 12.5rem;
      height: 6.125rem;
    }

    @include lg() {
      width: 14.375rem;
      height: 7.5rem;

      @include xlg() {
        width: 24.875rem;
        height: 13rem;
      }
    }

    &__box-text {
      margin-top: -1.5rem;
      font-family: generalLeter;
      text-shadow: 0rem .1875rem .375rem #00000029;
      color: white;
      font-size: 1rem;
    }
  }
}

.enterCode-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .625rem 1.25rem;
  width: 100%;

  @include xs() {
    padding: .625rem 0rem;
  }
  &__strange {
    margin-bottom: 4%; 
    text-align: center; 
    width: 16.875rem; 
    margin-right: 1.25rem;
  }
}

.enterCode-mobile__title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.25rem 0 0rem 0;
  height: 2.8125rem;
  width: 16.25rem;
  &__counter {
    color: rgb(255, 255, 255);
    margin: 0 .3125rem;
    text-decoration: underline;
  }
}

.enterCode-mobile__mini {
  width: 90%;
  margin-bottom: .625rem;
  @include xs() {
    height: 7.5rem;
    width: initial;
    margin-bottom: .625rem;
  }
  @include mxHeight(27.5rem){
      @include mnWidth(31.25rem) {
        width: 50%;
      }
  }
}

.enterCode-mobile__counter {
  height: 5rem;
}

.other {
  margin-top: -2.125rem;
  font-size: .75rem;
  margin-bottom: .625rem;
}

.enterCode-mobile__counter-content {
  position: relative;
  margin-top: 0rem;
}

.enterCode-mobile__counter-text {
  position: absolute;
  bottom: 1.9375rem;
  right: 3.75rem;
}

.enterCode-mobile__button-wrapper {
  height: 1.875rem !important;

  *,
  *:after {
    font-size: .75rem !important;
    height: 2.1875rem;
    display: flex;
    align-items: center;
  }
}

.containerAnimation {
  display: none;

  @media (max-height: 46.25rem) {
    display: flex;
    justify-content: center;
    left: 0%;
    bottom: 25%;
    position: fixed;
    width: 9.375rem;
    height: 9.375rem;
    margin: auto;
  }
}

.containerAnimation:hover {
  opacity: 0;
  transition: opacity 4s ease-in-out;
}

.objetAnimation {
  display: none;

  @media (max-height: 46.25rem) {
    display: block;
    height: 2.5rem;
    width: 1.25rem !important;
    position: relative;
    animation: bounce 1.5s infinite;
  }
}

@keyframes bounce {
  10% {
    height: 2.5rem;
    width: 1.25rem;
  }

  30% {
    height: 2.5rem;
    width: .9375rem;
  }

  50% {
    height: 2.1875rem;
    width: 1.5625rem;
    transform: translateY(6.875rem);
  }

  75% {
    height: 2.5rem;
    width: 1.4375rem;
  }

  100% {
    transform: translateY(0rem);
  }
}
</style>
