<template>
    <div>
        <!-- to be shown on friends page -->
        <template v-if="isFriends()">
        <v-container class="secondary pt-0" fluid>
            <v-container class="pt-0 white">
                <v-row class="white" align="center">
                    <v-col cols="auto"><v-icon size="35" color="grey">mdi-account-multiple</v-icon></v-col>
                    <v-col cols="auto" class="pl-0"><span class="text-h6 grey--text text--darken-2 font-weight-bold pl-0">Friends</span></v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pl-3">
                    <v-col v-for="user in users" :key="user.name" cols="6" class="pb-0">
                        <v-card flat outlined min-width="350">
                               <v-row>
                                   <v-col cols="auto" class="pa-0">
                                       <v-card tile outlined :to= "{ name: 'timeline', params: { id: user._id }}">
                                            <v-img v-if="user.photoName != undefined && user.photoName != ''" :src="'/backend/user/images/' + user.photoName" height="100" width="100"></v-img>
                                            <v-img v-else :src="require('../../public/default.jpeg')" height="100" width="100"></v-img>
                                        </v-card>
                                   </v-col>
                                   <v-col cols="auto" class="primary--text font-weight-medium text-body-2" align-self="center">
                                       {{user.firstName}} {{user.lastName}}
                                   </v-col>
                               </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        </template>

        <!-- to be shown on timeline page -->
        <template v-else>
        <v-container class="white pa-0">
            <v-card tile outlined>
            <v-row class="ma-0 pa-1">
                <v-col v-for="user in nineUsers" :key="user.name" cols="4" class="pa-1">
                                       <v-card tile elevation="0" :to= "{ name: 'timeline', params: { id: user._id }}">
                                            <v-img v-if="user.photoName != undefined && user.ohotoName != ''" :src="'/backend/user/images/' + user.photoName" width="auto" aspect-ratio='1'></v-img>
                                            <v-img v-else :src="require('../../public/default.jpeg')" width="auto" aspect-ratio='1'></v-img>
                                            <span class="primary--text text-caption">{{user.firstName}} {{user.lastName}}</span>
                                        </v-card>
    
                    </v-col>
            
            </v-row>
            </v-card>
        </v-container>
        </template>





    </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'
export default {
    data: function(){
        return {
            users: [],
            nineUsers: []
        }
    },
    props:['id'],
    created(){
        axios.get('/backend/users')
        .then(response => {
            var allUsers = response.data
            this.users = allUsers.filter(item => item._id != this.id);
            var shuffledUsers = _.shuffle(this.users)
            if(shuffledUsers.length <= 9){
                this.nineUsers = shuffledUsers
            }else{
                this.nineUsers = shuffledUsers.slice(0,9)
                }
        })
        .catch(error => {
            console.log(error)
        })
    },
    methods: {
        isFriends(){
            if (this.$route.name == 'friends') {
                return true
            } else {
                return false
            }
        }
    },
    watch:{
    $route (to){
        axios.get('/backend/users')
        .then(response => {
            var allUsers = response.data
            this.users = allUsers.filter(item => item._id != to.params.id); 
        })
        .catch(error => {
            console.log(error)
        })
    }
} 
}
</script>
<style>
   
</style>