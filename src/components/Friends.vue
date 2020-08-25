<template>
    <div>
        <v-container class="secondary pt-0" fluid>
            <v-container class="pt-0 white">
                <v-row class="white" align="center">
                    <v-col cols="auto"><v-icon size="50">mdi-account-multiple</v-icon></v-col>
                    <v-col cols="auto"><span class="text-h5 grey--text font-weight-bold">Friends</span></v-col>
                </v-row>
                <v-row>
                    <v-col v-for="user in users" :key="user.name" cols="6" class="pb-0">
                        <v-card flat outlined min-width="350">
                               <v-row>
                                   <v-col cols="auto" class="pa-0">
                                       <v-card tile outlined>
                                            <v-avatar size="100" tile>
                                                <v-img :src="require('../../public/Ivica.jpg')"></v-img>
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
    created(){
        axios.get('/backend/users')
        .then(response => {
            console.log(response.data)
            this.users = response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
}
</script>