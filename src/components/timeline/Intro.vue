<template>
    <v-card flat outlined>
        <v-container>
        <v-row>
            <v-col class="py-0 pr-0">
                <v-card-title class="pa-0"><v-icon class="pr-2" color="primary">mdi-earth</v-icon>Intro</v-card-title>
            </v-col>
        </v-row>
        <v-row justify="center">

            <template v-if="opentextarea">
                <v-col>
                    <v-card flat outlined>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="introduction" placeholder="Write something about yourself" solo flat hide-details rows="1"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row justify="end" class="secondary ma-0">
                            
                             <v-col cols="auto">
                                <v-card flat outlined color="grey lighten-1" tile>
                                    <v-btn color="secondary" class="black--text text-capitalize" depressed tile small @click="opentextarea = !opentextarea">Cancel</v-btn>
                                </v-card>
                            </v-col>
                            <v-col cols="auto">
                                <v-card flat outlined color="primary" tile>
                                    <v-btn class="text-capitalize" color="primary" depressed tile small @click = "save">Save</v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </template>


            <template v-else>
            <v-col cols="auto">
                <template v-if="this.introduction == '' || this.introduction == undefined">
                <p class="grey--text text-center text-caption">Add short introduction so that people would know more about you.</p>
                <p class="primary--text text-center text-caption" @click="opentextarea = !opentextarea">Add introduction</p>
                </template>
                <template v-else> 
                    <p>{{introduction}}</p>
                    <p v-if="profileBelongsToLoggedInUser()" class="text-capitalize primary--text text-caption text-center" @click = "opentextarea = true">Change Introduction</p>
                </template>
            </v-col>
            </template>


        </v-row>
        </v-container>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return {
            introduction: '',
            opentextarea: false
        }
    },
    props: ['id'],
    methods: {
        save(){
          axios.post('/backend/user/userdata/introduction', {
            id: this.id,
            introduction: this.introduction,
            })
            .then(response => {
                console.log(response);
                console.log(response.data.introduction)
                this.introduction = response.data.introduction
                this.opentextarea = false
                console.log(this.introduction)
            })
            .catch(function (error) {
                console.log(error);
            });
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
            this.introduction = response.data.introduction
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>
  .v-text-field input {
    font-size: 30px;
  }
</style>