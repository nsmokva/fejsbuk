<template>
	<v-container class="pt-0">
		<v-row class="white" align="center">
			<v-col cols="auto"><v-icon size="35" color="grey">mdi-account</v-icon></v-col>
			<v-col cols="auto" class="pl-0"><span class="text-h6 grey--text text--darken-2 font-weight-bold">Information</span></v-col>
		</v-row>
		<v-divider></v-divider>
		<v-row class="white">
			<v-col cols="4" class="pl-0">
				<v-list-item :to="{name: 'allinfo'}" active-class="ninaactive"><v-list-item-content><p class="pt-0 pb-0 mb-0 font-weight-light text-h6 grey--text">All info</p></v-list-item-content></v-list-item>
				<v-list-item :to="{name:'basicinfo'}" active-class="ninaactive"><v-list-item-content><p class="pt-0 pb-0 mb-0 font-weight-light text-h6 grey--text">Basic info</p></v-list-item-content></v-list-item>
				<v-list-item :to="{name: 'contact'}" active-class="ninaactive"><v-list-item-content><p class="pt-0 pb-0 mb-0 font-weight-light text-h6 grey--text">Contact</p></v-list-item-content></v-list-item>
				<v-list-item :to="{name: 'job'}"  active-class="ninaactive"><v-list-item-content><p class="pt-0 pb-0 mb-0 font-weight-light text-h6 grey--text">Education and Job</p></v-list-item-content></v-list-item>
			</v-col>
			<v-col cols="8" class="pt-6">
				<router-view :profileOwnerUserAboutData="profileOwnerUserAboutData" :loggedInUser="loggedInUser" :profileOwnerUser="profileOwnerUser" @profileOwnerUserAboutDataChanged="onProfileOwnerUserAboutDataChanged" ></router-view>
				<!-- <v-row class="white" justify="end" v-if="profileBelongsToLoggedInUser()">
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
				</v-row> -->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from 'axios'
export default {
	data: function(){
		return {
			dialog: false,
			profileOwnerUserAboutData:{ 
				birthday: '',
				city: '',
				email:'',
				job: '',
				education:''
			}
		}
	},
	props:['loggedInUser', 'profileOwnerUser'],
	methods:{
		getProfileOwnerAboutData(){
			axios.get('/backend/user', {params: {
				id: this.profileOwnerUser.id
			}})
			.then(response => {
				this.profileOwnerUserAboutData.birthday = response.data.birthday
				this.profileOwnerUserAboutData.city = response.data.city
				this.profileOwnerUserAboutData.email = response.data.email2
				this.profileOwnerUserAboutData.job = response.data.job
				this.profileOwnerUserAboutData.education = response.data.education
			})
			.catch(error => {
				console.log(error)
			})
		},
		onProfileOwnerUserAboutDataChanged(newUserData){
			if(newUserData.type == 'city'){
				this.profileOwnerUserAboutData.city = newUserData.value
			}else if(newUserData.type == "email"){
				this.profileOwnerUserAboutData.email = newUserData.value
			}else if(newUserData.type == "job"){
				this.profileOwnerUserAboutData.job = newUserData.value
			}else if(newUserData.type == "education"){
				this.profileOwnerUserAboutData.education = newUserData.value
			}
		},
		
		save(){
			axios.post('/backend/user/userdata', {
				id: sessionStorage.getItem('id'),
				city: this.editcity,
				email2: this.editemail2,
				job: this.editjob,
				education: this.editeducation       
		})
		.then(response => {
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
			profileBelongsToLoggedInUser(){
				if(this.profileOwnerUser.id == this.loggedInUser.id){
						return true
				}else{
						return false
				}
		}   
	},
	created(){
		this.getProfileOwnerAboutData()
	}
}
</script>

<style>
.v-list-item--link:before {
    background-color: white;
}
.ninaactive{
    color: black 1important;
    border-left: 5px solid #4667ac;
}
.v-list-item__content{
    padding: 0;
}
.ninaactive .v-list-item__content p{
    color: black !important;
    font-weight: 400 !important;
}

</style>