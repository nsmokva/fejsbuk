<template>
    <div>
       <p class="grey--text text-uppercase text-subtitle-1 mb-0">Basic info</p>
       <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
       <p v-if="this.city!==''">Live in <span>{{city}}</span></p>
       <p @click.stop="dialog = true" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add a city where you are living</span></p>
       <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
       <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
       <p v-if="this.email2!==''">Email: <span>{{email2}}</span></p>
       <p @click.stop="dialog = true" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add your email</span></p>
       <p class="grey--text text-uppercase text-subtitle-1 mb-0">Job and Education</p>
       <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
       <p v-if="this.job!==''">Working at: {{job}}</p>
       <p @click.stop="dialog = true" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add a workplace</span></p>
       <p v-if="this.education!==''">School: <span>{{education}}</span></p>
       <p @click.stop="dialog = true" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add info about your education</span></p>
       <v-row class="white" justify="end">
            <v-col cols="auto">
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" color="primary">Edit your info</v-btn>
                    </template>
                    <v-card class="pa-6">
                        <p class="grey--text text-subtitle-1 mb-0 mt-4">City</p>
                        <v-text-field v-model="editcity" :value="city"></v-text-field>
                        <p class="grey--text text-subtitle-1 mb-0">Email</p>
                        <v-text-field v-model="editemail2"></v-text-field>
                        <p class="grey--text text-subtitle-1 mb-0">Job</p>
                        <v-text-field v-model="editjob"></v-text-field>
                        <p class="grey--text text-subtitle-1 mb-0">Education</p>
                        <v-text-field v-model="editeducation"></v-text-field>
                        <v-container>
                        <v-row class="white" justify="end">
                            <v-col cols="auto">
                                <v-btn @click="save" color="primary" class="pb-0 mb-0">Save changes</v-btn>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return{
            dialog: false,
            editcity: '',
            editemail2:'',
            editjob: '',
            editeducation:'',
            city: '',
            email2:'',
            job: '',
            education:''
        }
    },
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
            this.city = response.data.city
            this.email2 = response.data.email2
            this.job = response.data.job
            this.education = response.data.education
            this.editcity = response.data.city
            this.editemail2 = response.data.email2
            this.editjob = response.data.job
            this.editeducation = response.data.education
            this.dialog = false
        })
        .catch(function (error) {
            console.log(error);
        });
        }   
    },
    created(){
        axios.get('/backend/user', {params: {
            id: sessionStorage.getItem('id')
        }})
        .then(response => {
            console.log(response)
            this.city = response.data.city
            this.email2 = response.data.email2
            this.job = response.data.job
            this.education = response.data.education
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

<style scooped>
   
</style>
