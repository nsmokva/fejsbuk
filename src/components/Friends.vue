<template>
    <div>
        <!-- to be shown on friends page -->
        <template v-if="isFriends()">
        <v-container class="secondary pt-0" fluid>
            <v-container class="pt-0 white">
                <v-row class="white" align="center">
                    <v-col cols="auto"><v-icon size="50" color="grey">mdi-account-multiple</v-icon></v-col>
                    <v-col cols="auto"><span class="text-h5 grey--text font-weight-bold">Friends</span></v-col>
                </v-row>
                <v-row>
                    <v-col v-for="user in users" :key="user.name" cols="6" class="pb-0">
                        <v-card flat outlined min-width="350">
                               <v-row>
                                   <v-col cols="auto" class="pa-0">
                                       <v-card tile outlined :to= "{ name: 'timeline', params: { id: user._id }}">
                                            <v-avatar size="100" tile>
                                                 <span class="primary--text">{{user.firstName}}</span>
                                                <!-- <v-img :src="require('../../public/Ivica.jpg')"></v-img> -->
                                            </v-avatar>
                                        </v-card>
                                   </v-col>
                                   <v-col cols="auto" class="primary--text font-weight-medium">
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
                <v-col v-for="user in users" :key="user.name" cols="4" class="pa-1">
                                       <v-card tile outlined :to= "{ name: 'timeline', params: { id: user._id }}">
                                            <v-avatar size="100" tile>
                                                 <span class="primary--text">{{user.firstName}}</span>
                                                <!-- <v-img :src="require('../../public/Ivica.jpg')"></v-img> -->
                                            </v-avatar>
                                            <span class="primary--text">{{user.firstName}} {{user.lastName}}</span>
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
export default {
    data: function(){
        return {
            users: [],
        }
    },
    props:['id'],
    created(){
        axios.get('/backend/users')
        .then(response => {
            console.log(response.data)
            var allUsers = response.data
            this.users = allUsers.filter(item => item._id != this.id);
            console.log(this.id)
            console.log(this.users)
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
}
</script>