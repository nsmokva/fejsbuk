<template>
    <div>
        <v-container class="secondary pt-0" fluid>
            <v-container class="pt-0">
                <v-row class="grey darken-4 ninaheadline" align="end">
                <v-col cols="auto">
                    <v-avatar color="grey lighten-2" size="245" class="mt-12 ml-4 nina">
                        <v-avatar color="white" size="240">
                            <v-avatar size="230">
                                <v-img :src="require('../../public/Ivica.jpg')"></v-img>
                            </v-avatar>
                        </v-avatar>
                    </v-avatar>
                </v-col>
                <v-col class="white--text text-h4">
                    {{name.firstName}} {{name.lastName}}
                </v-col>
                </v-row>
                <v-row class="white" justify="end">
                     <v-divider vertical></v-divider>
                     <v-col cols="auto" class="pa-0">
                       <v-list-item :to="{name: 'timeline'}"><v-list-item-content class="primary--text text-h6">Timeline</v-list-item-content></v-list-item>   
                    </v-col>
                    <v-divider vertical></v-divider>
                   <v-col cols="auto" class="pa-0">
                       <v-list-item :to="{name: 'allinfo'}"><v-list-item-content class="primary--text text-h6">About</v-list-item-content></v-list-item>   
                    </v-col>
                    <v-divider vertical></v-divider>
                   <v-col cols="auto" class="pa-0">
                       <v-list-item :to="{name: 'friends'}"><v-list-item-content class="primary--text text-h6">Friends</v-list-item-content></v-list-item>   
                    </v-col>
                     <v-divider vertical></v-divider>
                </v-row>
            </v-container>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return{
            name: {
                firstName: '',
                lastName: ''
            }
        }
    },
    created (){
        axios.get('/backend/user', {params: {
            id: sessionStorage.getItem('id')
        }})
        .then(response => {
            console.log(response)
            this.name.firstName = response.data.firstName
            this.name.lastName = response.data.lastName
        })
        .catch(error => {
            console.log(error)
        })

    }
    
}
</script>

<style scoped>
    .nina{
        margin-bottom: -50px;
    }
    .ninaheadline{
        height: 300px;
    }
</style>