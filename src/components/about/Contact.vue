<template>
    <div>
        <!-- <template v-if="profileBelongsToLoggedInUser()">
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            <p v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">Email: <span>{{editedemail2}}</span></p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add your email</span></p>
        </template>

        <template v-else>
            <template v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">
                <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
                <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            </template>
            <p v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">Email: <span>{{editedemail2}}</span></p>
        </template> -->
				<div v-if="hasEmail()">
					<p class="mb-2 flex-container">
						<v-icon v-if="addEmail == false" class="mr-2" color="grey">mdi-email</v-icon>
						<span v-if="addEmail == false">{{profileOwnerUserAboutData.email}}</span>
						<span v-if="profileBelongsToLoggedInUser() && addEmail == false" class="pl-4 primary--text n-pointer" @click="editEmail()">Edit</span>
						<v-row v-if="addEmail">
							<v-col cols="4" align-self = 'center'>
								<v-text-field v-model="newEmail" outlined background-color="white" dense hide-details></v-text-field>
							</v-col>
							<v-col cols="auto"> 
								<v-btn class="text-capitalize" color="primary" depressed tile @click = "saveEmail">Save</v-btn>
							</v-col>
							<v-col> 
								<v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addEmail = !addEmail">Cancel</v-btn>
							</v-col>
						</v-row>							
					</p>
				</div>
				<div v-else>
					<div v-if="profileBelongsToLoggedInUser()">
            <p class="mb-2 flex-container">
              <v-icon v-if="addEmail == false" class="mr-2" color="primary">mdi-plus-circle-outline</v-icon>
              <span v-if="addEmail == false" class="primary--text n-pointer" @click="addEmail = !addEmail">Add a contact email address</span>
              <v-row v-if="addEmail">
                <v-col cols="4" align-self = 'center'>
                  <v-text-field v-model="newEmail" placeholder="Add a contact email address" outlined background-color="white" dense hide-details></v-text-field>
                </v-col>
                <v-col cols="auto"> 
                  <v-btn class="text-capitalize align-center" color="primary" depressed tile @click = "saveEmail">Save</v-btn>
                </v-col>
                <v-col> 
                  <v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addEmail = !addEmail">Cancel</v-btn>
                </v-col>
              </v-row>
            </p>
					</div>
				</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
	data: function(){
		return{
			addEmail: false,
			newEmail: ''
		}
	},
	props: ['loggedInUser', 'profileOwnerUser', 'profileOwnerUserAboutData'],
	methods:{
	profileBelongsToLoggedInUser(){
		if(this.profileOwnerUser.id == this.loggedInUser.id){
			return true
		}else{
			return false
		}
		},
		hasEmail(){
			if(this.profileOwnerUserAboutData.email == '' || this.profileOwnerUserAboutData.email == undefined){
				return false
			}else{
				return true
			}
		},
		saveEmail(){
			axios.post('/backend/user/userdata/email', {
				id: this.loggedInUser.id,
				email: this.newEmail,      
			})
			.then(response => {
				this.$emit('profileOwnerUserAboutDataChanged', {type: 'email', value: response.data.email2}) 
				this.addEmail = false
			})
			.catch(function (error) {
				console.log(error);
			});
		},
    editEmail(){
      this.newEmail = this.profileOwnerUserAboutData.email
      this.addEmail = !this.addEmail
    },
	},
}
</script>

<style scooped>
  .flex-container {
		display: flex;
		align-items: flex-end;
	}
  .n-pointer {
    cursor: pointer;
  }
  .n-pointer:hover{
    text-decoration: underline;
  }
</style>
