<template>
    <div>
        <v-container class="secondary pt-0" fluid>
            <v-container>
                <statuses :id="id" :loggedInUser="loggedInUser" :showAddStatus="true"></statuses>
                <welcome :dialog="dialog" :firstName="loggedInUser.firstName" @closeDialog="onCloseDialog"></welcome>
            </v-container> 
        </v-container>   
    </div>
</template>

<script>
import Statuses from '../components/Statuses.vue'
import Welcome from '../components/Welcome.vue'
export default {
    data: function(){
        return{
            loggedInUserName:'',
            id: ''
        }
    },
    props: ['loggedInUser', "dialog", "firstName"],
    components:{
        Statuses,
        Welcome
    },
    methods: {
        onCloseDialog(value){
            this.$emit('closeDialogAtHome', value)
        }
    },
    created(){
        this.loggedInUserName = sessionStorage.getItem('name');
        this.id = sessionStorage.getItem('id');
        this.$emit('grabname', {loggedInUserName: this.loggedInUserName, id: this.id})
    }
}
</script>

<style scoped>

</style>