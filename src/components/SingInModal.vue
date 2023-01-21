<template>
    <div class="SingIngModal">
        <div class="SingIngModal-container SingIngModal__close-container">
            <img @click="close()" class="SingIngModal__close-image" src="../assets/Assets_Mobile_New/btn_cerrar.png" />
        </div>
        <img class="SingIngModal__image" src="@/assets/Assets_Web_New/Logo_modales_Juntos_Premiarte_2022.png" />
        <div class="SingIngModal__content">
            <div class="SingIngModal__contentCenter">
                <span style="color: white;">Ingresa al portal para que puedas participar</span>
            </div>
            <div class="SingIngModal__contentCenter">
                <Input field="idn" @handle-input="setValue($event)" placeholder="Número de cédula" :onlyNumbers="true"
                    :error="error" maxlength="10" />
            </div>
            <div class="SingIngModal__space"></div>
            <div class="SingIngModal__contentCenter">
                <Button text="Ingresar" type="primary" :isLoading="loading" @handle-click="validateRecaptchaForLogin()" />
            </div>
        </div>
    </div>
</template>

<script>
import Button from "../components/Button";
import Input from "../components/Input";
import { Login } from "../api";
export default {
    name: "SingInModal",
    data() {
        return {
            loading: false,
            error: "",
        };
    },
    mounted() { },
    components: {
        Input,
        Button,
    },
    props: {},
    computed: {},
    methods: {

        //-----------------------------------------
        async validateRecaptchaForLogin() {
            try {
                
                await this.$recaptchaLoaded()

                await this.$recaptcha('login');

                const token = await this.$recaptcha('login');

                //console.log(token);
                this.recaptchaCode = token;


                console.log("Execute recaptcha for login");

                this.loading=true;
                this.signIn();
            } catch (error) {
                console.log("Login error:", error);
            }
        },
        //-----------------------------------------

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
            const idReq = /^([1-9]{1}[0-9]{5,9})$/;
            this.error =
                this.idn && !idReq.test(this.idn)
                    ? "Ingresa un número de cédula válido."
                    : "";
        },
        close() {
            this.$emit("close");
        },
        goTo(path) {
            if (this.$route.path !== `/${path}`) this.$router.push(path);
        },
    },
    watch: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.SingIngModal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &__space {
        display: none;
    }
    &__content {
        display: flex;
        justify-content: space-evenly;
        align-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 230px;
        position: relative;

        @include mnHeight(1000px) {
            height: 250px;
        }
    }

    &__content:nth-child(2) {
        margin: 0 0 0 0;
        background-color: red;
    }

    &__contentCenter {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 17%;
    }

    &__contentCenter span {
        text-align: center;
    }

    &__box {
        position: absolute;
        top: 20px;
        left: 30px;
        right: 30px;
        bottom: 20px;

        @include mobile() {
            top: 10px;
            left: 15px;
            right: 15px;
            bottom: 10px;
        }
    }

    &__scroll {
        overflow-y: auto;
        width: 100%;
        max-height: 100%;
        height: 100%;
        padding-right: 30px;
        text-align: center;

        @include mobile() {
            padding-right: 15px;
        }

        @include xs() {
            width: 100%;
            overflow-x: hidden;
        }
    }

    &__text {
        font-family: BebasNeue;
        font-size: 16px;
        line-height: 16px;
        text-align: justify;

        @include mobile() {
            font-size: 12px;
        }
    }

    &__image {
        height: 150px;
        margin-top: -100px;

        @include mobile() {
            height: 140px;
            margin-top: -80px;
        }

        @include xs() {
            margin-top: -40px;
            margin-bottom: -20px;
        }
    }

    &__close-container {
        display: flex;
        justify-content: flex-end;
        width: calc(100% + 45px);
        padding: 10px;
        margin-top: -35px;

        @include xs() {
            margin-top: -50px;
            margin-bottom: -40px;
        }
    }

    &__close-image {
        height: 30px;
        cursor: pointer;

        @include mobile() {
            height: 28px;
        }
    }

    /* width */
    ::-webkit-scrollbar {
        width: 12px !important;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: #eeb493 !important;
        border-radius: 10px !important;
        border-radius: 6px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #de7f48 !important;
        border: 1px solid #ff5e00;
        border-radius: 50%;
    }
}
</style>
