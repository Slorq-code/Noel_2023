<template>
  <div class="enterCode">
    <div v-if="!mobile" class="enterCode__counter-content">
      <img
        class="enterCode__counter-img"
        src="../assets/Assets_Web_New/Contador_premios.png"
      />
      <span class="enterCode__counter-text">3 0 0 1</span>
      <!-- {{ total | amount }}  dentro del span-->
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
              class="Uppercase"
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
                class="Uppercase"
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
            <vue-recaptcha
              sitekey=" 6Lfh6Y4aAAAAAI-8nSMl7mVqcaetUMQC9ZCDoqvK"
              @verify="verifyRecaptcha"
              :loadRecaptchaScript="true"
              @expired="expiredRecaptcha"
              ref="recaptcha"
              language="es"
              class="mb-1"
            ></vue-recaptcha>
            <div>
              <Button
              text="Registrar Código"
              type="primary"
              @handle-click="send()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mobile" class="enterCode-mobile">
      <img
        class="enterCode-mobile__title"
        src="../assets/Assets_Mobile_New/Titulo_bienvenido.png"
      />
      <span class="enterCode-web__mini-text">
        Ingresa aquí los códigos que encontraste en los stickers dentro de los
        empaques de Saltín Noel y Ducales.
      </span>
      <img
        class="enterCode-mobile__mini"
        src="../assets/Assets_Mobile_New/stickers_ingreso_codi.png"
      />
      <div
        style="
          margin-bottom: 4%;
          text-align: center;
          width: 270px;
          margin-right: 20px;
        "
      >
        <Input
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
          <!-- EN ESTE ESPACIO VA EL RECAPTCHA -->
          <vue-recaptcha
          :loadRecaptchaScript="true"
          sitekey=" 6Lfh6Y4aAAAAAI-8nSMl7mVqcaetUMQC9ZCDoqvK"
          @verify="verifyRecaptcha"
          class="mb-1"
          @expired="expiredRecaptcha"
          ref="recaptcha"
          language="es"
          ></vue-recaptcha> 
        </div>
      
      <div class="enterCode-mobile__button-wrapper">
        <Button text="Registrar Código" type="primary" @handle-click="send()" />
      </div>
    </div>
    <modal
      :dialog="dialog"
      @close="
        dialog = false;
        reset();
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
import VueRecaptcha from "vue-recaptcha";
import { SaveCodes, GetStatus } from "../api";
import RegisterCodeConfirm from "../components/RegisterCodeConfirm";
import Modal from "../components/Modal";

export default {
  name: "EnterCode",
  data() {
    return {
      loading: false,
      errors: {},
      recaptchaCode: "",
      count: 0,
      ducales: "",
      saltin: "",
      userStatus: "",
      respStatus: {
        ducales: "",
        saltin: "",
        saltinMsg: "",
        ducalesMsg: "",
      },
      dialog: false,
      code: "",
    };
  },
  components: {
    Input,
    Button,
    VueRecaptcha,
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
    send() {
      this.verifyCatptcha();
      if (this.saltin || this.ducales) {
        if (this.recaptchaCode) {
          this.save(
            this.mobile ? this.code : this.saltin,
            this.mobile ? this.code : this.ducales
          );
        } else {
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type: "INFO",
            showClose: true,
            message:
              "¡Para poder continuar, debes marcar la casilla de verificación (No soy un robot)!.",
          });
        }
      } else {
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type: "INFO",
          showClose: true,
          message: "¡Ingresa un código de Saltín Noel o Ducales válido!.",
        });
      }
    },
    save(saltin, ducales) {
      this.loading = true;
      SaveCodes({
        code_saltin: saltin,
        code_ducales: ducales,
      })
        .then((resp) => {
          GetStatus().then((resp2) => {
            this.loading = false;
            this.respStatus = {
              ducales: resp.data.ducales.res,
              saltin: resp.data.saltin.res,
              saltinMsg: resp.data.saltin.message,
              ducalesMsg: resp.data.ducales.message,
              status: resp2.data || "",
            };
            this.dialog = true;
            this.$refs.recaptcha.reset();
           // this.recaptchaCode = null;
            this.recaptchaCode = "null";
            this.$store.dispatch("loadBalance");
            this.ducales = "";
            this.saltin = "";
            this.code = "";
          });
        })
        .catch((err) => {
          if (err.response.status !== 401) {
            this.ducales = "";
            this.saltin = "";
            this.code = "";
            this.loading = false;
            this.$store.dispatch("setAlert", {
              buttonLabel: "Aceptar",
              type: "INFO",
              showClose: true,
              message:
                err.response.data.message.mensaje || "Error en el servicio.",
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
        this.$refs.recaptcha.reset();
        this.recaptchaCode = null;
        this.count = 0;
      } else {
        this.count = this.count + 1;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.rc-anchor-normal, 
.rc-anchor-pt{
  margin: 2px 80px 0 0 !important;
}
.rc-anchor-normal{
  margin: 2px 80px 0 0 !important;
}

.rc-anchor-pt{
  margin: 2px 80px 0 0 !important;
}
.Uppercase div input{ 
  letter-spacing: 2px;
  text-transform: uppercase;
}
.enterCode {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  &__counter-content {
    position: absolute;
    right: 10%;
    top: 5%;
    width: 180px;
    @include xlg() {
      width: 240px;
    }
  }
  &__counter-img {
    width: 100%;
  }
  &__counter-text {
    position: absolute;
    color: white;
    right: 38%;
    top: 44%;
    @include xlg() {
      font-size: 22px;
    }
  }
}
.enterCode-web {
  display: flex;
  flex-direction: column;
  width: 80%;
  text-align: center;
  align-items: center;
  &__mini-text {
    width: 80%;
    margin: 5% 0;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    color: white;
    font-size: 20px;
    line-height: 20px;
    @include mobile() {
      text-align: center;
      font-size: 18px;
    }
    @include xs() {
      font-size: 14px;
      line-height: 12px;
      margin: 10px 0px 15px 0px;
    }
  }
  &__flex {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__section-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__logo {
    margin: 2% 0 0 0;
    @include mxHeight(600px) {
      height: 60px;
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
      font-size: 1rem;
      @include lg() {
        font-size: 1.2rem;
      }
      @include mnHeight(1000px) {
        font-size: 1.2rem;
      }
    }
  }
  &__title {
    margin-top: -40px;
    @include lg() {
      width: 80vh;
    }
    @include xlg() {
      width: 40%;
    }
    @include mxHeight(550px) {
      margin-top: -25px;
      width: 61vh;
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
  &__saltin-image {
    width: 40%;
    @include lg() {
      width: 45%;
    }
    @include xlg() {
      width: 75%;
    }
    @include mxHeight(590px) {
      width: 35%;
    }
    @include mnHeight(1000px) {
      width: 60%;
    }
  }
  &__ducales-image {
    width: 40%;
    @include lg() {
      width: 45%;
    }
    @include xlg() {
      width: 75%;
    }
    @include mxHeight(590px) {
      width: 35%;
    }
    @include mnHeight(1000px) {
      width: 60%;
    }
  }
  &__box-text {
    margin-top: -24px;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    color: white;
    font-size: 16px;
  }
  &__rec {
    transform: scale(0.9);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @include xlg() {
      margin: 3% 0 0 5%;
    }
  }
  &__more {
    height: 40px;
    margin: 10px;
    @include lg() {
      height: 45px;
    }
    @include xlg() {
      height: 50px;
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
  &__title {
    height: 50px;

    @include xs() {
      height: 30px;
    }
  }
  &__mini {
    width: 90%;
    margin-bottom: 10px;
    @include xs() {
      height: 120px;
      width: initial;
      margin-bottom: 10px;
    }
  }
  &__counter {
    height: 80px;
  }
  .other {
    margin-top: -34px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  &__counter-content {
    position: relative;
    margin-top: 0px;
  }
  &__counter-text {
    position: absolute;
    bottom: 31px;
    right: 60px;
  }

  &__button-wrapper {
    height: 30px !important;

    *,
    *:after {
      font-size: 12px !important;
      height: 30px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
