<template>
    <div>
        <v-container class="pt-0">
            <v-row class="pa-0"> 

                <!-- things on the right --> 
                <v-col cols="4" class="pa-0">
                    <v-row>
                        <v-col>
                            <intro :id="this.id"></intro>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <friends :id='id'></friends>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- things on the left -->
                <v-col cols="8" class="pr-0">
                    <v-card flat outlined v-if="profileBelongsToLoggedInUser()"> 
                    <v-container class="pt-0">
                        <v-row>
                            <v-col>
                                <v-textarea v-model="newStatus" placeholder="What is on your mind?" solo flat hide-details rows="1"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row class="white" justify="end">
                            <v-col cols="auto">
                                <v-btn color="primary" @click="save">Post</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card>
                    <v-container v-for="status in statuses" :key="status._id">
                        <v-card flat outlined>
                            <v-row class="white">
                                <v-col cols="12">
                                    {{status.status}}
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-container>
                </v-col>

            </v-row>
        </v-container> 
    </div>

</template>

<script>
import Intro from './timeline/Intro.vue'
import Friends from './Friends.vue'
import axios from 'axios'
export default {
    data: function(){
        return{
            newStatus: '',
            statuses: []
        }
    },
    props: ['id'],
    components:{
        Intro,
        Friends
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
        save(){
          axios.post('/backend/statuses', {
            ownerId: sessionStorage.getItem('id'),
            status: this.newStatus,       
        })
        .then(response => {
            console.log(response);
            //find a way to rerender a Timeline component here
        })
        .catch(function (error) {
            console.log(error);
        });
        },
    },
   created(){
        axios.get('/backend/statuses', {params: {
            ownerId: this.id
        }})
        .then(response => {
            console.log('logging statuses')
            this.statuses = response.data
            console.log('statuses from timeline', this.statuses)
        })
        .catch(error => {
            console.log(error)
        })
    },
    watch:{
    $route (to){
         axios.get('/backend/statuses', {params: {
            ownerId: to.params.id
        }})
        .then(response => {
            console.log('logging statuses')
            this.statuses = response.data
            console.log('statuses from timeline', this.statuses)
        })
        .catch(error => {
            console.log(error)
        })
    }
} 
    
}
</script>

<style scooped>

</style>