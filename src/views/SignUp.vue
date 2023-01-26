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
      <span class="signUp__subtitle"
        >Para participar completa tu registro.</span
      >
      <div class="signUp__form-row">
        <Input
          @close-all="
            $refs.operator.open = false;
            $refs.department_state.open = false;
            "
          @handle-input="setValue($event)"
          field="names"
          label="Nombres"
          placeholder="Ingresa tus nombres"
          :model="user.names"
          :required="true"
          :error="errors.names"
        />
        <Input
          field="last_names"
          placeholder="Ingresa tus apellidos"
          label="Apellidos"
          @close-all="
            $refs.operator.open = false;
            $refs.department_state.open = false;
            "
          @handle-input="setValue($event)"
          :model="user.last_names"
          :required="true"
          :error="errors.last_names"
        />
        <Input
          label="Cédula"
          field="idn"
          maxlength="10"
          @close-all="
            $refs.operator.open = false;
            $refs.department_state.open = false;
          "
          @handle-input="setValue($event)"
          :model="user.idn"
          placeholder="Ingresa nº de cédula"
          :required="true"
          :error="errors.idn"
          :onlyNumbers="true"
        />
      </div>
      <div class="signUp__form-row">
        <Input
          label="Correo Electrónico"
          field="email"
          placeholder="Ingresar correo electrónico"
          @close-all="
            $refs.operator.open = false;
            $refs.department_state.open = false;
            "
          @handle-input="setValue($event)"
          :model="user.email"
          :required="true"
          :error="errors.email"
        />
        <Select
          ref="department_state"
          field="department_state"
          label="Departamento"
          placeholder="Ingresa departamento"
          :model="user.department_state"
          :items="GetDepartments"
          :required="true"
          :error="errors.department_state"
          @handle-input="setValue($event)"
          @close-all="$refs.operator.open = false"
        />
        <Select
          ref="city"
          field="city"
          label="Ciudad"
          placeholder="Seleccionar Ciudad"
          @handle-input="setValue($event)"
          :model="user.city"
          :items="formattedCities"
          :required="true"
          :error="errors.city"
        />
      </div>
      <div class="signUp__form-row">
        <Input
          field="phone"
          label="Celular"
          maxlength="10"
          placeholder="Ingresa nº celular"
          @close-all="
            $refs.operator.open = false;
            $refs.department_state.open = false;
            "
          @handle-input="setValue($event)"
          :model="user.phone"
          :required="true"
          :error="errors.phone"
          :onlyNumbers="true"
        />
        <Select
          ref="operator"
          field="operator"
          placeholder="Seleccionar operador"
          label="Operador"
          @close-all="$refs.department_state.open = false"
          @handle-input="setValue($event)"
          :model="user.operator"
          :items="fomattedOperators"
          :required="true"
          :error="errors.operator"
        />
        <Select
          v-if="!mobile"
          style="opacity: 0"
          ref="operator"
          field="operator"
          label="Operador"
          placeholder="Seleccionar operador"
          @close-all="$refs.department_state.open = false"
          @handle-input="setValue($event)"
          :model="user.operator"
          :items="fomattedOperators"
          :required="true"
          :error="errors.operator"
        />
      </div>
      <div class="signUp__radioBigBox">
        <div class="signUp__radio-container">
          <div>
            <Radio @handle-click="toggleTerms()" :value="terms" />
          </div>
          <span class="signUp__radio-text"
            >Acepto los
            <span class="signUp__radio-text-action" @click="goToTerms()"
              >términos y condiciones</span
            >.</span
          >
        </div>
        <div class="signUp__radio-container">
          <div class="signUp__radio-container__specific">
              <Radio @handle-click="toggleTerms4()" :value="terms4" />
          </div>
          <span 
            class="signUp__radio-text" 
            >Acepto las
            <span class="signUp__radio-text-action" @click="goToPolo()"
              >políticas de privacidad</span
            >.</span
          >
        </div>
      </div>
      <Button text="Registrarme" type="primary" @handle-click="send()" />
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
import Radio from "../components/Radio";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Modal from "../components/Modal";
import SignupConfirm from "../components/SignUpConfirm";
import json from "../assets/json/colombia.json";
export default {
  name: "SignUp",
  data() {
    return {
      terms: false,
      terms4: false,
      user: {
        names: "",
        last_names: "",
        idn: "",
        phone: "",
        email: "",
        department_state: "",
        city: "",
      },
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
        "Móvil Éxito",
      ],
      list_cities: [],
      data_colombia: json,
    };
  },
  mounted() {},
  components: {
    Radio,
    Button,
    Input,
    Select,
    Modal,
    SignupConfirm,
  },
  props: {},
  computed: {
    fomattedOperators() {
      return this.operators.map((o) => ({
        value: o,
        text: o,
      }));
    },
    GetDepartments() {
      return this.data_colombia.map((s) => ({
        value: s.departamento,
        text: s.departamento,
      }));
    },
    formattedCities() {
      return this.list_cities.map((s) => ({
        value: s,
        text: s,
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
      this.terms = !this.terms;
    },
    SetCities(department) {
      this.data_colombia.forEach((c) => {
        if (c.departamento == department) {
          this.list_cities = c.ciudades;
        }
      });
    },
    toggleTerms4() {
      this.terms4 = !this.terms4;
    },
    send() {
      if (
        !this.user.names ||
        !this.user.last_names ||
        !this.user.idn ||
        !this.user.email ||
        !this.user.department_state ||
        !this.user.city ||
        !this.user.phone ||
        !this.user.operator
      ) {
        this.touch = true;
        this.validate();
        this.$store.dispatch("setAlert", {
          buttonLabel: "Aceptar",
          type: "INFO",
          showClose: true,
          message: "¡Debes completar los campos requeridos!.",
        });
      } else {
        if (!Object.keys(this.errors).length) {
          if (!this.terms) {
            this.$store.dispatch("setAlert", {
              buttonLabel: "Aceptar",
              type: "INFO",
              showClose: true,
              message:
                "¡Debes aceptar los términos y condiciones de la promoción!.",
            });
          } else if (!this.terms4) {
            this.$store.dispatch("setAlert", {
              buttonLabel: "Aceptar",
              type: "INFO",
              showClose: true,
              message:
                "¡Debes aceptar las políticas de privacidad de la promoción!.",
            });
          } else {
            this.dialog = true;
          }
        } else {
          const e = [];
          Object.keys(this.errors).forEach((key) => {
            e.push(this.errors[key]);
          });
          this.$store.dispatch("setAlert", {
            buttonLabel: "Aceptar",
            type: "INFO",
            showClose: true,
            messages: e,
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
        names: "",
        last_names: "",
        idn: Number,
        email: "",
        department_state: "",
        city: "",
        phone: "",
        operator: "",
      };
      this.$store.dispatch("setToken", resp.token);
      this.$store.dispatch("setUser", resp.user);
      this.$store.dispatch("loadBalance");
      this.goTo("/ingresar-codigo");
    },
    validate() {
      let errors = {};
      const emailReg = /^[a-zA-Z0-9_\-\.]{2,30}@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const idReq = /^([1-9]{1}[0-9]{6,9})$/;
      const phoneReq =
        /^(300|301|302|304|305|310|311|312|313|314|315|316|317|318|319|320|321|322|323|324|350|351){1}[0-9]{1}[0-9]{6}$/;
      if (this.user.phone) {
        this.user.phone = this.user.phone.trim();
      }
      if (this.user.idn) {
        this.user.idn = this.user.idn.trim();
      }
      if (this.user.email) {
        this.user.email = this.user.email.trim();
      }
      if (this.user.email && !emailReg.test(this.user.email)) {
        errors.email = "Ingresa un correo válido.";
      }
      if (
        this.user.names &&
        !(this.user.names.length > 2 && this.user.names.length < 60)
      ) {
        errors.names = "El nombre debe tener entre 3 y 60 carácteres.";
      }
      if (
        this.user.last_names &&
        !(this.user.last_names.length > 2 && this.user.last_names.length < 60)
      ) {
        errors.last_names = "El apellido debe tener entre 3 y 60 carácteres.";
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
      if (this.user.idn && this.user.idn.length === 11) {
        if (!(+this.user.idn > 1000000000 && +this.user.idn < 1999999999))
          errors.idn = "Ingresa un número de cédula válido.";
      }
      if (this.touch) {
        if (!this.user.names) errors.names = "Este campo es obligatorio.";
        if (!this.user.names) errors.last_names = "Este campo es obligatorio.";
        if (!this.user.email) errors.email = "Este campo es obligatorio.";
        if (!this.user.idn) errors.idn = "Este campo es obligatorio.";
        if (!this.user.phone) errors.phone = "Este campo es obligatorio.";
        if (!this.user.operator) errors.operator = "Este campo es obligatorio.";
        if (!this.user.department_state)
          errors.department_state = "Este campo es obligatorio.";
        if (!this.user.city) errors.city = "Este campo es obligatorio.";
      }
      this.errors = errors;
    },
  },
  watch: {
    "user.department_state": function (v) {
      this.user.city = "";
      this.SetCities(v);
    },
  },
};
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
  &__title {
    margin: 2% 0 0 0;
    height: 60px;
    @include mnHeight(1000px) {
      height: 8vh;
    }
    &__titleMobile {
      height: 30px;
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
    background-color: #ffd800;
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
    margin: 0px 0 20px 0;
    @include mxHeight(640px) {
      min-height: 80px;
      margin: 0px 0 0px 0;
    }
    @include mnHeight(1000px) {
      margin: 10px 0 10px 0;
    }
    @include xs() {
      padding: 0 6px;
    }
    @include mobile() {
      flex-direction: column;
      padding: 0 20px;
      width: 100%;
      gap: 17px;
      margin: 0 0 17px 0;
    }
  }
  &__radioBigBox {
    display: flex;
    flex-direction: column;
    margin: 30px 0 30px 0;
    @include mobile() {
      margin: -0px 0 30px 0;
    }
    @include mxHeight(640px) {
      flex-direction: row;
      margin: 10px 0 0px 0;
    }
    @include mobile() {
      flex-direction: column;
    }
  }
  &__radio-text {
    color: white;
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    font-size: 15px;
    margin: 0 -12px 0 0;
  }
  &__radio-text-action {
    color: white;
    cursor: pointer;
  }
  &__radio-text-action:hover {
    color: rgb(156, 156, 156);
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
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    color: white;
    text-align: center;
    font-size: 15px;
    @include mxHeight(640px) {
      display: none;
    }
    @include mobile() {
      display: initial;
    }
  }
}
</style>