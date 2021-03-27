<template>
    <div>
        
					<div v-if="hasJob()">
					<p class="mb-2 flex-container">
						<v-icon v-if="addJob == false" class="mr-2" color="grey">mdi-network</v-icon>
						<span v-if="addJob == false">{{profileOwnerUserAboutData.job}}</span>
						<span v-if="profileBelongsToLoggedInUser() && addJob == false" class="pl-4 primary--text n-pointer" @click="editJob">Edit</span>
						<v-row v-if="addJob">
							<v-col cols="4" align-self = 'center'>
								<v-text-field v-model="newJob" outlined background-color="white" dense hide-details></v-text-field>
							</v-col>
							<v-col cols="auto"> 
								<v-btn class="text-capitalize" color="primary" depressed tile @click = "saveJob">Save</v-btn>
							</v-col>
							<v-col> 
								<v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addJob = !addJob">Cancel</v-btn>
							</v-col>
						</v-row>							
					</p>
				</div>
				<div v-else>
					<div v-if="profileBelongsToLoggedInUser()">
            <p class="mb-2 flex-container">
						<v-icon v-if="addJob == false" class="mr-2" color="primary">mdi-plus-circle-outline</v-icon>
						<span v-if="addJob == false" class="primary--text n-pointer" @click="addJob = !addJob">Add info about current employment</span>
						<v-row v-if="addJob">
							<v-col cols="4" align-self = 'center'>
								<v-text-field v-model="newJob" placeholder="Add info about current employment" outlined background-color="white" dense hide-details></v-text-field>
							</v-col>
							<v-col cols="auto"> 
								<v-btn class="text-capitalize align-center" color="primary" depressed tile @click = "saveJob">Save</v-btn>
							</v-col>
              <v-col> 
								<v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addJob = !addJob">Cancel</v-btn>
							</v-col>
						</v-row>
            </p>
					</div>
				</div>
				<div v-if="hasEducation()">
					<p class="mb-2 flex-container">
						<v-icon v-if="addEducation == false" class="mr-2" color="grey">mdi-school</v-icon>
						<span v-if="addEducation == false">{{profileOwnerUserAboutData.education}}</span>
						<span v-if="profileBelongsToLoggedInUser() && addEducation == false" class="pl-4 primary--text n-pointer" @click="editEducation">Edit</span>
						<v-row v-if="addEducation">
							<v-col cols="4" align-self = 'center'>
								<v-text-field v-model="newEducation" outlined background-color="white" dense hide-details></v-text-field>
							</v-col>
							<v-col cols="auto"> 
								<v-btn class="text-capitalize" color="primary" depressed tile @click = "saveEducation">Save</v-btn>
							</v-col>
							<v-col> 
								<v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addEducation = !addEducation">Cancel</v-btn>
							</v-col>
						</v-row>							
					</p>
				</div>
				<div v-else>
					<div v-if="profileBelongsToLoggedInUser()">
            <p class="mb-2 flex-container">
              <v-icon v-if="addEducation == false" class="mr-2" color="primary">mdi-plus-circle-outline</v-icon>
              <span v-if="addEducation == false" class="primary--text n-pointer" @click="addEducation = !addEducation">Add info about education</span>
              <v-row v-if="addEducation">
                <v-col cols="4" align-self = 'center'>
                  <v-text-field v-model="newEducation" placeholder="Add info about education" outlined background-color="white" dense hide-details></v-text-field>
                </v-col>
                <v-col cols="auto"> 
                  <v-btn class="text-capitalize align-center" color="primary" depressed tile @click = "saveEducation">Save</v-btn>
                </v-col>
                <v-col> 
                  <v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addEducation = !addEducation">Cancel</v-btn>
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
			addJob: false,
			newJob: '', 
			addEducation: false,
			newEducation: '', 
		}
	},
	props: ['loggedInUser', 'profileOwnerUser', 'profileOwnerUserAboutData'],
	methods:{
    profileBelongsToLoggedInUser(){
      return this.profileOwnerUser.id == this.loggedInUser.id
		},
		hasJob(){
			return !(this.profileOwnerUserAboutData.job == '' || this.profileOwnerUserAboutData.job == undefined)
		},
		saveJob(){
			axios.post('/backend/user/userdata/job', {
				id: this.loggedInUser.id,
				job: this.newJob,      
			})
			.then(response => {
				this.$emit('profileOwnerUserAboutDataChanged', {type: 'job', value: response.data.job}) 
				this.addJob = false
			})
			.catch(function (error) {
				console.log(error);
			});
		},
    editJob(){
      this.newJob = this.profileOwnerUserAboutData.job
      this.addJob = !this.addJob
    },
		hasEducation(){
			return !(this.profileOwnerUserAboutData.education == '' || this.profileOwnerUserAboutData.education == undefined)
		},
		saveEducation(){
			axios.post('/backend/user/userdata/education', {
				id: this.loggedInUser.id,
				education: this.newEducation,      
			})
			.then(response => {
				this.$emit('profileOwnerUserAboutDataChanged', {type: 'education', value: response.data.education}) 
				this.addEducation = false
			})
			.catch(function (error) {
				console.log(error);
			});
		},
    editEducation(){
      this.newEducation = this.profileOwnerUserAboutData.education
      this.addEducation = !this.addEducation
    }
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
