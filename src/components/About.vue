<template>
   <div>
       <v-container>
            <v-row class="white" align="center">
                <v-col cols="auto"><v-icon size="50" color="grey">mdi-account</v-icon></v-col>
                <v-col cols="auto"><span class="text-h5 grey--text font-weight-bold">Information</span></v-col>
            </v-row>
            <v-row class="white">
                <v-col cols="4">
                    <v-list-item :to="{name: 'allinfo'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">All info</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name:'basicinfo'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Basic info</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name: 'contact'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Contact</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name: 'job'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Education and Job</p></v-list-item-content></v-list-item>
                </v-col>
                <v-col cols="8">
                  <router-view :editedcity="editcity" :editedemail2="editemail2" :editedjob="editjob" :editededucation="editeducation" v-on:opendialog="opendialog"></router-view>
                   <v-row class="white" justify="end" v-if="profileBelongsToLoggedInUser()">
                        <v-col cols="auto">
                            <v-dialog v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" color="primary">Edit your info</v-btn>
                                </template>
                                <v-card class="pa-6">
                                    <p class="grey--text text-subtitle-1 mb-0 mt-4">City</p>
                                    <v-text-field v-model="editcity"></v-text-field>
                                    <p class="grey--text text-subtitle-1 mb-0">Email</p>
                                    <v-text-field v-model="editemail2"></v-text-field>
                                    <p class="grey--text text-subtitle-1 mb-0">Job</p>
                                    <v-text-field v-model="editjob"></v-text-field>
                                    <p class="grey--text text-subtitle-1 mb-0">Education</p>
                                    <v-text-field v-model="editeducation"></v-text-field>
                                    <v-container>
                                    <v-row class="white" justify="end">
                                        <v-col @click="save" cols="auto">
                                            <v-btn color="primary" class="pb-0 mb-0">Save changes</v-btn>
                                        </v-col>
                                    </v-row>
                                    </v-container>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
   </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return {
            dialog: false,
            editcity: '',
            editemail2:'',
            editjob: '',
            editeducation:'',
        }
    },
    props:['id'],
     methods:{
        save(){
          axios.post('/backend/user/userdata', {
            id: sessionStorage.getItem('id'),
            city: this.editcity,
            email2: this.editemail2,
            job: this.editjob,
            education: this.editeducation       
        })
        .then(response => {
            console.log(response);
            console.log(response.data.city)
            this.editcity = response.data.city
            this.editemail2 = response.data.email2
            this.editjob = response.data.job
            this.editeducation = response.data.education
            this.dialog = false
        })
        .catch(function (error) {
            console.log(error);
        });
        },
        opendialog(){
            this.dialog = true
        },
         profileBelongsToLoggedInUser(){
            var profileOwnerId = this.id
            var loggedInUserId = sessionStorage.getItem("id")
            if(profileOwnerId == loggedInUserId){
                return true
            }else{
                return false
            }
        }   
    },
     created(){
        axios.get('/backend/user', {params: {
            id: this.id
        }})
        .then(response => {
            console.log(response)
            this.editcity = response.data.city
            this.editemail2 = response.data.email2
            this.editjob = response.data.job
            this.editeducation = response.data.education
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>

</style>