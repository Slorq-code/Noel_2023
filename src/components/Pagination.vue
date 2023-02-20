<template>
    <div class="paginationBox" >

        <div class="buttonContainer" >
            <button
            @click="getMinusPage(), refresh()"
            >Anterior</button>
        </div>
            
            <div v-if="number>5">

                <button 
                class="buttonContainer"
                v-for="number of this.TotalpageNumbers"
                :key="number"
                @click="getPage(number), refresh()"
                >{{ number }}</button>

            </div>

        <div class="buttonContainer" >
            <button
            @click="getPlusPage(), refresh()"
            >Siguiente</button>
        </div>



    </div>
</template>

<script>
export default {
    name: "Pagination",
    methods: {
        getPage(page) {
            this.$store.dispatch("setPage", {page})
        },
        getPlusPage() {
            this.$store.dispatch("setPlusPage")
        },
        getMinusPage() {
            this.$store.dispatch("setMinusPage")
        },
        refresh() {
            this.$store.dispatch("setClients")
            console.log(this.$store.state.clients)
        }
    },
    mounted() {},
    computed: {
        TotalpageNumbers() {
            return [...new Array(this.$store.state.totalPage)].map((v, i) => i + 1)
        }
    }
}
</script>

<style scoped>
.paginationBox {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
}
.buttonContainer {
    background-color: #309f3a;
    border-radius: 25px;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    transition: all .5s;
    font-size: 13px;
    height: 30px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    box-shadow: 0px 0px 15px #0000004d;
}
.paginationBox button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all .5s;
}
.paginationBox button:disabled {
    cursor: not-allowed;
}
.active {
    background-color: hsla(160, 100%, 37%, 0.2);
}
</style>