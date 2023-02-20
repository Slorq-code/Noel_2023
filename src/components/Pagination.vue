<template>
    <div>


        <button
        @click="getMinusPage(), refresh()"
        >Anterior</button>

        <button 
        v-for="number of this.TotalpageNumbers"
        :key="number"
        @click="getPage(number), refresh()"
        >{{ number }}</button>

        <button
        @click="getPlusPage(), refresh()"
        >Siguiente</button>



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
div {
    margin-top: 10px;
}
button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid hsla(160, 100%, 37%, 0.2);
    color: var( --color-text );
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    transition: all .5s;
}
button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all .5s;
}
button:disabled {
    cursor: not-allowed;
}
.active {
    background-color: hsla(160, 100%, 37%, 0.2);
}
</style>