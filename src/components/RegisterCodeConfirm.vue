<template>
  <div class="register-code-confirm">
    <div class="register-code-confirm__close-container">
      <img @click="close()" class="register-code-confirm__close-image" src="@/assets/web/btn_cerrar.png" />
    </div>
    <img class="register-code-confirm__image" src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png" />
    <span class="register-code-confirm__text"
      v-if="savedSaltin && !awardDucales && (mobile ? !savedDucales : !ducales) && user">
      Tu código de
      <span class="text-1">Saltín Noel</span> es
      válido.
    </span>
    <span class="register-code-confirm__text"
      v-if="savedDucales && !awardSaltin && (mobile ? !savedSaltin : !saltin) && user">
      Tu código de
      <span class="text-1">Ducales</span> es
      válido.
    </span>

    <div class="register-code-confirm__section">
      <img v-if="savedSaltin && !awardDucales && (mobile ? !savedDucales : !ducales)"
        class="register-code-confirm__saltin-image" src="../assets/Assets_Web_New/Empaque_Saltin_reflejo.png"
        alt="premio" />
      <img v-if="savedDucales && !awardSaltin && (mobile ? !savedSaltin : !saltin)"
        class="register-code-confirm__ducales-image" src="../assets/Assets_Web_New/Empaque_Ducales_reflejo.png"
        alt="premio" />
    </div>

    <div v-if="!mobile && ((savedSaltin && !validDucales) || (savedDucales && !validSaltin))"
      class="register-code-confirm__errors">
      <span class="register-code-confirm__text">{{ saltinMsg }}</span>
      <span class="register-code-confirm__text">{{ ducalesMsg }}</span>
    </div>

    <span class="register-code-confirm__text" v-if="message()">{{ message() }}</span>

    <div v-else>
      <div v-if="!mobile" class="register-code-confirm__errors">
        <span class="register-code-confirm__text" v-if="!validSaltin && !savedDucales">{{ saltinMsg }}</span>
        <span class="register-code-confirm__text" v-if="!validDucales && !savedSaltin">{{ ducalesMsg }}</span>
        <span class="register-code-confirm__text">{{ "¡" + SuperUser + "! " + status }}</span>
      </div>
      <div class="register-code-confirm__container" v-else>
        <span class="register-code-confirm__text" v-if="!validSaltin && !validDucales && !savedDucales && !savedSaltin">{{ mobileErrorMessage() }}</span>
        <div v-else class="register-code-confirm__errors">
          <span class="register-code-confirm__text" v-if="!validSaltin && !savedDucales">{{ saltinMsg }}</span>
          <span class="register-code-confirm__text" v-if="!validDucales && !savedSaltin">{{ ducalesMsg }}</span>
          <span class="register-code-confirm__text">{{ "¡" + SuperUser + "! " + status }}</span>
        </div>
      </div>
    </div>

    <div class="signup-confirm__buttons" style="margin-bottom: 10px"> <Button text="Aceptar" type="primary"
        @handle-click="close()" />
    </div>
  </div>
</template>

<script>
import Button from '../components/Button'
export default {
  name: "RegisterCodeConfirm",
  components: {
    Button
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    saltin: {
      type: String,
      required: ""
    },
    ducales: {
      type: String,
      required: ""
    },
    saltinMsg: {
      type: String,
      required: ""
    },
    ducalesMsg: {
      type: String,
      required: ""
    },
    status: {
      type: String,
      required: ""
    }
  },
  computed: {
    SuperUser() {
      let newName = this.user.short_name
      return newName.charAt(0).toUpperCase()+newName.slice(1);
    },  
    validSaltin() {
      return this.saltin !== "error";
    },
    validDucales() {
      return this.ducales !== "error";
    },
    savedSaltin() {
      return this.saltin && this.saltin === "saved";
    },
    savedDucales() {
      return this.ducales && this.ducales === "saved";
    },
    awardSaltin() {
      return ["charge", "computer", "bonus", "phone", "none"].includes(this.saltin);
    },
    awardDucales() {
      return ["charge", "computer", "bonus", "phone", "none"].includes(this.ducales);
    },
    mobile() {
      return this.$store.getters.mobile;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    goToMyCodes() {
      this.$router.push("/mis-codigos");
    },
    message() {
      if (this.awardSaltin || this.awardDucales) {
        if (this.awardSaltin) return this.saltinMsg;
        if (this.awardDucales) return this.ducalesMsg;
      } else {
        return '';
      }
    },
    mobileErrorMessage() {
      if (this.saltinMsg.includes("utilizado")) return this.saltinMsg;
      if (this.ducalesMsg.includes("utilizado")) return this.ducalesMsg;
      return "¡Lo sentimos! tu código es incorrecto.";
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.register-code-confirm {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 270px;
  padding: 10px 20px;

  @include mobile() {
    padding: 10px;
  }

  &__section {
    width: 100%;
    margin: 15px 0 -25px 0;
    @include mobile() {
      margin: 15px 0 -45px 0;
    }
  }

  &__image {
    height: 197px;
    margin-top: -100px;
    margin-bottom: 10px;

    @include mobile() {
      height: auto;
      width: 64%;
      margin-top: -54px;
      margin-bottom: 50px;
    }

    @include xs() {
      height: auto;
      width: 64%;
      margin-bottom: -10px;
    }
  }

  &__close-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    margin-top: -56px;

    @include xs() {
      margin-bottom: -40px;
      margin-top: -40px;
    }
  }

  &__close-image {
    height: 30px;
    cursor: pointer;
    margin-top: -20px;

    @include mobile() {
      height: 28px;
    }
  }

  &__ducales-image {
    height: 100px;
    @include mobile() {
      width: 85%;
      height: auto;
    }
    @include xs() {
      height: 60px;
    }
  }

  &__saltin-image {
    height: 100px;
    @include mobile() {
      width: 85%;
      height: auto;
    }
    @include xs() {
      height: 60px;
    }
  }

  &__text {
    font-family: generalLeter;
    text-shadow: 0px 3px 6px #00000029;
    color: white;
    font-size: 16px;

    @include xs() {
      font-size: 13px;
    }
  }
  &__container {
    margin: 50px 0 0 0;
  }

  &__buttons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 30px;
    padding: 0px 40px;

    @include mobile() {
      padding: 0px 10px;
    }
  }

  &__errors {
    display: flex;
    flex-direction: column;
  }
}
</style>
