<template>
    <div>
        <p>Home page</p>
        <v-btn :to= "{ name: 'timeline', params: { id: id }}">Go To Profile</v-btn>
        {{name}}
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            name:'',
            id: ''
        }
    },
    created(){
        console.log ('created')
        this.name = sessionStorage.getItem('name');
        this.id = sessionStorage.getItem('id');
        //var name = sessionStorage.getItem('name');
        this.$emit('grabname', this.name)
    }
}
</script>

<style scoped>

</style>