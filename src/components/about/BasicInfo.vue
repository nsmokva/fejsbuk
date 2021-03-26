<template>
	<div>
		<div v-if="hasBirthday()"> <!-- in current setup of code birthday is mandatory to register and can not be edited so no need fore this. Still, will be left here for case something changes in setup -->
			<p class="mb-2 flex-container">
				<v-icon color="grey" class="mr-2">mdi-cake-variant</v-icon>
				<span class="mt-1">{{birthdayEdited}}</span>
			</p>
		</div>
		<!-- <div v-else>
			<div v-if="profileBelongsToLoggedInUser()">
				<v-icon color="primary">mdi-plus</v-icon>
				<span class="primary--text">Add a bday</span>
			</div>
		</div> -->
		<div v-if="hasCity()">
			<p class="mb-2 flex-container">
				<v-icon v-if="addCity == false" class="mr-2" color="grey">mdi-home</v-icon>
				<span v-if="addCity == false">{{profileOwnerUserAboutData.city}}</span>
				<span v-if="profileBelongsToLoggedInUser() && addCity == false" class="pl-4 primary--text n-pointer" @click="editCity()">Edit</span>
				<v-row v-if="addCity">
					<v-col cols="4" align-self = 'center'>
						<v-text-field v-model="newCity" outlined background-color="white" dense hide-details></v-text-field>
					</v-col>
					<v-col cols="auto"> 
						<v-btn class="text-capitalize" color="primary" depressed tile @click = "saveCity">Save</v-btn>
					</v-col>
					<v-col> 
						<v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addCity = !addCity">Cancel</v-btn>
					</v-col>
				</v-row>							
			</p>
		</div>
		<div v-else>
			<div v-if="profileBelongsToLoggedInUser()">
        <p class="mb-2 flex-container">
          <v-icon v-if="addCity == false" class="mr-2" color="primary">mdi-plus-circle-outline</v-icon>
          <span v-if="addCity == false" class="primary--text n-pointer" @click="addCity = !addCity">Add a city</span> 
          <v-row v-if="addCity">
            <v-col cols="4" align-self = 'center'>
              <v-text-field v-model="newCity" placeholder="Add a city" outlined background-color="white" dense hide-details></v-text-field>
            </v-col>
            <v-col cols="auto"> 
              <v-btn class="text-capitalize align-center" color="primary" depressed tile @click = "saveCity">Save</v-btn>
            </v-col>
            <v-col> 
              <v-btn class="text-capitalize black--text" color="secondary" depressed tile @click = "addCity = !addCity">Cancel</v-btn>
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
			newCity: '',
			addCity: false
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
		hasBirthday(){
			if(this.profileOwnerUserAboutData.birthday == '' || this.profileOwnerUserAboutData.birthday == undefined){
				return false
			}else{
				return true
			}
		},
		hasCity(){
			if(this.profileOwnerUserAboutData.city == '' || this.profileOwnerUserAboutData.city == undefined){
				return false
			}else{
				return true
			}
		},
		saveCity(){
			axios.post('/backend/user/userdata/city', {
				id: this.loggedInUser.id,
				city: this.newCity,      
			})
			.then(response => {
				this.$emit('profileOwnerUserAboutDataChanged', {type: 'city', value: response.data.city}) 
				this.addCity = false
			})
			.catch(function (error) {
				console.log(error);
			});
		},
    editCity(){
      this.newCity = this.profileOwnerUserAboutData.city
      this.addCity = !this.addCity
    },
	},
	computed:{
		birthdayEdited(){
			var day = this.profileOwnerUserAboutData.birthday.slice(4, 6)
			var suffix = ''
			if(day == '1' || day == '21' || day == '31'){
				suffix = 'st'
			}else if(day == day == '2' || day == '22'){
				suffix = "nd"
			}else if(day == day == '3' || day == '23'){
				suffix = 'rd'
			}else{
				suffix = 'th'
			}
			var dayEdited = day + suffix
			var birthdayEdited = this.profileOwnerUserAboutData.birthday.replace(day, dayEdited);
			return birthdayEdited
		}
	}
}
</script>

<style scoped>
	.flex-container {
		display: flex;
		align-items: center;
	}
  .n-pointer {
    cursor: pointer;
  }
  .n-pointer:hover{
    text-decoration: underline;
  }
</style>
