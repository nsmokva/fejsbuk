<template>
    <div>
        <v-container class="secondary pt-0" fluid>
            <v-container>
                <statuses :id="id" :loggedInUser="loggedInUser" :showAddStatus="true"></statuses>
            </v-container> 
        </v-container>   
    </div>
</template>

<script>
import Statuses from '../components/Statuses.vue'
export default {
    data: function(){
        return{
            loggedInUserName:'',
            id: ''
        }
    },
    props: ['loggedInUser'],
    components:{
        Statuses
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