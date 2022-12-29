<template>
  <div class="signUp">
      <div class="back-content" @click="goTo('/ingresar')" v-if="false">
        <div class="back">
          <span class="back-text">Volver</span>
        </div>
      </div>
      <div class="signUp__content">
        <div class="">
          <img
            v-if="!mobile"
            class="signUp__title"
            src="../assets/Assets_Web_New/Titulo_registro_usuarios.png"
            alt="Como participar titulo"
          />
          <img
            v-if="mobile"
            class="signUp__title__titleMobile"
            src="../assets/Assets_Mobile_New/Titulo_registro_usuario.png"
            alt="Como participar"
          />
        </div>
        <span class="signUp__subtitle">Para participar completa tu registro.</span>
        <div class="signUp__form-row">
          <Input
            :model="user.name"
            @close-all="
              $refs.operator.open = false;
              $refs.department_state.open = false;
            "
            field="name"
            label="Nombres"
            @handle-input="setValue($event)"
            placeholder="Ingresar nombre completo"
            :required="true"
            :error="errors.name"
          />
          <Input
            :model="user.lastName"
            @close-all="
              $refs.operator.open = false;
              $refs.department_state.open = false;
            "
            field="lastName"
            label="Apellidos"
            @handle-input="setValue($event)"
            placeholder="Ingresar apellidos"
            :required="true"
            :error="errors.lastnAME"
          />
          <Input
          label="Cédula"
          field="idn"
          @close-all="
              $refs.operator.open = false;
              $refs.department_state.open = false;
            "
            :model="user.idn"
            @handle-input="setValue($event)"
            placeholder="Ingresa nº de cédula"
            :required="true"
            :error="errors.idn"
            :onlyNumbers="true"
            />
          </div>
          <div class="signUp__form-row">
          <Input
            :model="user.email"
            field="email"
            @close-all="
              $refs.operator.open = false;
              $refs.department_state.open = false;
            "
            label="Correo Electrónico"
            @handle-input="setValue($event)"
            placeholder="Ingresar correo electrónico"
            :required="true"
            :error="errors.email"
          />
          <Select
              ref="department_state"
              @close-all="$refs.operator.open = false"
              field="department_state"
              label="Departamento"
              :model="user.department_state"
              placeholder="Seleccionar departamento"
              :items="fomattedStates"
              @handle-input="setValue($event)"
              :required="true"
              :error="errors.department_state"
            />
            <Select
              ref="department_state"
              @close-all="$refs.operator.open = false"
              field="department_state"
              label="Futura ciudad"
              :model="user.department_state"
              placeholder="Relacionar con state"
              :items="fomattedStates"
              @handle-input="setValue($event)"
              :required="true"
              :error="errors.department_state"
            />
          </div>
          <div class="signUp__form-row">
            <Input
              field="phone"
              label="Celular"
              :model="user.phone"
              @close-all="
                $refs.operator.open = false;
                $refs.department_state.open = false;
              "
              @handle-input="setValue($event)"
              placeholder="Ingresa nº celular"
              :required="true"
              :error="errors.phone"
              maxlength="10"
              :onlyNumbers="true"
            />
            <Select
              ref="operator"
              field="operator"
              @close-all="$refs.department_state.open = false"
              label="Operador"
              :model="user.operator"
              placeholder="Seleccionar operador"
              :items="fomattedOperators"
              @handle-input="setValue($event)"
              :required="true"
              :error="errors.operator"
            />
            <Select
              style="opacity: 0;"
              ref="operator"
              field="operator"
              @close-all="$refs.department_state.open = false"
              label="Operador"
              :model="user.operator"
              placeholder="Seleccionar operador"
              :items="fomattedOperators"
              @handle-input="setValue($event)"
              :required="true"
              :error="errors.operator"
            />
          </div>
          <div class="signUp__radioBigBox" >
            <div class="signUp__radio-container">
              <div>
                <Radio @handle-click="toggleTerms()" :value="terms"/>
              </div>
              <span class="signUp__radio-text">Acepto los <span class="signUp__radio-text-action" @click="goToTerms()">términos y condiciones</span>.</span>
            </div>
            <div class="signUp__radio-container">
              <div style="width:40px;">
                <div>
                  <Radio @handle-click="toggleTerms4()" :value="terms4"/>
                </div>
              </div>
              <span class="signUp__radio-text" style="margin-left: -12px;">Acepto las <span class="signUp__radio-text-action" @click="goToPolo()">políticas de privacidad</span>.</span>
            </div>
          </div>
          <Button text="Registrarme" type="primary" @handle-click="send()"/>
      </div>
     <modal :dialog="dialog" @close="dialog = false" width="600">
      <signup-confirm
        v-if="dialog"
        :user="user"
        slot="component"
        @close="dialog = false"
        @close-success="closeSuccess($event)"
      ></signup-confirm>
    </modal>
  </div>
</template> 

<script>
import Radio  from '../components/Radio'
import Button  from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import Modal from '../components/Modal'
import SignupConfirm from '../components/SignUpConfirm'

export default {
  name: 'SignUp',
  data() {
    return {
      terms: false,
      terms4: false,
      user: {},
      loading: false,
      touch: false,
      errors: {},
      dialog: false,
      operators: [
        "Claro",
        "Movistar",
        "Tigo",
        "Virgin",
        "Avantel",
        "ETB",
        "Flash Mobile",
        "Móvil Éxito"
      ],
      states: [
        "AMAZONAS",
        "ANTIOQUIA",
        "ARAUCA",
        "ATLÁNTICO",
        "BOGOTÁ D.C.",
        "BOLÍVAR",
        "BOYACÁ",
        "CALDAS",
        "CAQUETA",
        "CAUCA",
        "CESAR",
        "CHOCÓ",
        "CÓRDOBA",
        "CUNDINAMARCA",
        "GUAINÍA",
        "GUAVIARE",
        "HUILA",
        "MAGDALENA",
        "NARIÑO",
        "RISARALDA",
        "NORTE DE SANTANDER",
        "QUINDIO",
        "SANTANDER",
        "SUCRE",
        "TOLIMA",
        "VALLE DEL CAUCA",
        "CASANARE",
        "LA GUAJIRA",
        "META",
        "SAN ANDRES",
        "PUTUMAYO",
        "VAUPÉS",
        "VICHADA"
      ]
    };
  },
  mounted() {},
  components: {
    Radio,
    Button,
    Input,
    Select,
    Modal,
    SignupConfirm
  },
  props: {},
  computed: {
    fomattedOperators() {
      return this.operators.map(o => ({
        value: o,
        text: o
      }));
    },
    fomattedStates() {
      return this.states.map(s => ({
        value: s,
        text: s
      }));
    },
    mobile() {
      return this.$store.getters.mobile;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    toggleTerms() {
      this.terms = !this.terms
    },
    toggleTerms4() {
      this.terms4 = !this.terms4
    },
    send() {
      if (
        !this.user.name ||
        !this.user.email ||
        !this.user.idn ||
        !this.user.operator ||
        !this.user.phone ||
        !this.user.department_state
      ) {
        this.touch = true;
        this.validate();
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type:'INFO',
          showClose: true,
          message: "¡Debes completar los campos requeridos!."
        });
      } else {
        if (!Object.keys(this.errors).length) {
          if (!this.terms) {
            this.$store.dispatch("setAlert", {
              buttonLabel: "Aceptar",
              type:'INFO',
              showClose: true,
              message: "¡Debes aceptar los términos y condiciones de la promoción!."
            });
          } else if (!this.terms4) {
            this.$store.dispatch("setAlert", {
              buttonLabel: "Aceptar",
              type:'INFO',
              showClose: true,
              message: "¡Debes aceptar las políticas de privacidad de la promoción!."
            });
          }else {
            this.dialog = true;
          }
        } else {
          const e = [];
          Object.keys(this.errors).forEach(key => {
            e.push(this.errors[key]);
          })
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type:'INFO',
            showClose: true,
            messages: e
          });
        }
      }
    },
    goTo(path) {
      if (this.$route.path !== `/${path}`) this.$router.push(path);
    },
    goToTerms() {
      this.$store.dispatch("setTermsAndConditions", true);
    },
    goToPolo() {
      this.$store.dispatch("setPrivacyPolicy", true);
    },
    setValue(e) {
      this.user[e.key] = e.value;
      this.validate();
    },
    closeSuccess(resp) {
      this.dialog = false;
      this.user = {
        name: "",
        email: "",
        idn: "",
        operator: "",
        phone: "",
        adult_registration: 1,
        department_state: "",
      };
      this.$store.dispatch("setToken", resp.token);
      this.$store.dispatch("setUser", resp.user);
      this.$store.dispatch("loadBalance");
      this.goTo("/ingresar-codigo");
    },
    validate() {
      if (this.user.phone) this.user.phone = this.user.phone.trim();
      if (this.user.idn) this.user.idn = this.user.idn.trim();
      if (this.user.email) {
        this.user.email = this.user.email.trim();
      }
      let errors = {};
      const emailReg = /^[a-zA-Z0-9_\-\.]{5,30}@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const idReq = /^([1-9]{1}[0-9]{6,9})$/;
      const phoneReq = /^(300|301|302|304|305|310|311|312|313|314|315|316|317|318|319|320|321|322|323|324|350|351){1}[0-9]{1}[0-9]{6}$/;
      if (this.user.email && !emailReg.test(this.user.email)) {
        errors.email = "Ingresa un correo válido.";
      }
      if (
        this.user.name &&
        !(this.user.name.length > 6 && this.user.name.length < 60)
      ) {
        errors.name = "El nombre debe tener entre 6 y 60 carácteres.";
      }
      if (this.user.phone && !phoneReq.test(this.user.phone)) {
        errors.phone = "Ingresa un número de celular válido.";
      }
      if (this.user.phone && !(this.user.phone.length === 10)) {
        errors.phone = "El celular debe tener 10 carácteres.";
      }
      if (this.user.idn && !idReq.test(this.user.idn)) {
        errors.idn = "Ingresa un número de cédula válido.";
      }
      if (this.user.idn && this.user.idn.length === 10) {
        if (!(+this.user.idn > 1000000000 && +this.user.idn < 1999999999))
          errors.idn = "Ingresa un número de cédula válido.";
      }
      if (this.touch) {
        if (!this.user.name) errors.name = "Este campo es obligatorio.";
        if (!this.user.email) errors.email = "Este campo es obligatorio.";
        if (!this.user.idn) errors.idn = "Este campo es obligatorio.";
        if (!this.user.phone) errors.phone = "Este campo es obligatorio.";
        if (!this.user.operator) errors.operator = "Este campo es obligatorio.";
        if (!this.user.department_state)
          errors.department_state = "Este campo es obligatorio.";
      }
      this.errors = errors;
    },
  },
  watch: {}
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.signUp {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 80%;
  padding: 10px 0;
  
  @include mobile() {
    flex-direction: column;
    align-items: center;
    padding: 10px 0 70px 0;
    width: 90%;
  }
  &__title{
    margin: 2% 0 0 0;
    height: 60px;
    @include mnHeight(1000px){
      height: 8vh;
    }
    &__titleMobile {
      width: 100%;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 0 20px 10px 20px;
    @include mobile() {
      width: 92%;
      padding-bottom: 20px;
    }
  }
  &__icon-content {
    width: 92%;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    justify-content: flex-start;
     cursor: pointer;
  }
  &__icon {
    height: 35px;
  }
  &__icon-text {
    color: white;
    font-family: BebasNeue;
    margin-left: 10px;
  }
  &__box {
    margin-top: 6px;
    background-color: #FFD800;
    border-radius: 30px;
    padding: 6px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  &__box-text {
    font-family: BebasNeue;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
  }
  &__text1 {
    color: white;
    font-family: BebasNeue;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
  }
  &__form-row {
    display: flex;
    align-items: center;
    height: auto;
    min-height: 100px;
    @include mobile() {
      flex-direction: column;
      padding: 0 20px;
      width: 100%;
    }
    @include xs() {
      padding: 0 6px;
    }
  }
  &__radioBigBox {
    margin: 30px 0 0 0;
    @include mobile() {
      margin: -100px 0 0 0;
    }
  }
  &__radio-text {
    color: white;
    font-family: MontserratRegular;
    font-size: 15px;
  }
  &__radio-text-action {
    color: white;
    cursor: pointer;
  }
  &__radio-container {
    display: flex;
    align-content: center;
    margin-bottom: 6px;
    width: 360px;
    @include mobile() {
      width: 100%;
      justify-content: center;
    }
  }
  &__subtitle {
    margin-bottom: 10px;
    font-family: NexaBold;
    color: white;
    font-size: 15px;
  }
}
</style>
