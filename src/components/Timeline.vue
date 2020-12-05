<template>
    <div>
        <v-container class="pt-0 px-0">
            <v-row no-gutters> 
                <!-- things on the right --> 
                <v-col cols="4" class="pr-3">
                    <intro :id="this.id"></intro>
                    <friends :id='id'></friends>
                </v-col>
                <!-- things on the left -->
                <v-col cols="8" class="pr-0">
                    <statuses :id="id" :loggedInUser='loggedInUser' :showAddStatus="profileBelongsToLoggedInUser()"></statuses>
                </v-col>
            </v-row>
        </v-container> 
    </div>
</template>

<script>
import Intro from './timeline/Intro.vue'
import Friends from './Friends.vue'
import Statuses from './Statuses.vue'
export default {
    data: function(){
        return{
           statuses: []
            
        }
    },
    props: ['id', 'profileOwnerUser', 'loggedInUser'],
    components:{
        Intro,
        Friends,
        Statuses
    },
    methods:{
        profileBelongsToLoggedInUser(){
            var profileOwnerId = this.id
            var loggedInUserId = sessionStorage.getItem("id")
            if(profileOwnerId == loggedInUserId){
                return true
            }else{
                return false
            }
        }, 
    },

    
}
</script>

<style>
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
    background-color: #88a0d1 !important;
    color: white !important;
}

</style>