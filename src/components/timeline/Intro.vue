<template>
	<div>
    <v-card v-if="this.introduction != '' && this.introduction != undefined || profileBelongsToLoggedInUser()" flat outlined class="mb-3">
			<v-container>
				<v-row>
					<v-col class="py-0 pr-0">
						<v-card-title class="pa-0"><v-icon class="pr-2" color="primary">mdi-earth</v-icon>Intro</v-card-title>
					</v-col>
				</v-row>
				<v-row justify="center">
					<template v-if="openTextarea">
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
											<v-btn color="secondary" class="black--text text-capitalize" depressed tile small @click="openTextarea = !openTextarea">Cancel</v-btn>
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
							<template v-if="profileBelongsToLoggedInUser()">
								<template v-if="this.introduction == '' || this.introduction == undefined">
									<p class="grey--text text-center text-caption">Add short introduction so that people would know more about you.</p>
									<p class="primary--text text-center text-caption n-pointer" @click="openTextarea = !openTextarea">Add introduction</p>
								</template>
								<template v-else> 
									<p>{{introduction}}</p>
									<p class="text-capitalize primary--text text-caption text-center n-pointer" @click = "openTextarea = true">Change Introduction</p>
								</template>
							</template>
							<template v-else>
								{{introduction}}
							</template>
						</v-col>
					</template>
				</v-row>
			</v-container>
    </v-card>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data: function(){
		return {
			introduction: '',
			openTextarea: false
		}
	},
	props: ['profileOwnerUser', 'loggedInUser'],
	methods: {
		save(){
			axios.post('/backend/user/userdata/introduction', {
				id: this.loggedInUser.id,
				introduction: this.introduction,
			})
			.then(response => {
				this.introduction = response.data.introduction
				this.openTextarea = false
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
		},
		getStatusesOfProfileOwnerUser(){
			axios.get('/backend/user', {params: {
			id: this.profileOwnerUser.id
			}})
			.then(response => {
				this.introduction = response.data.introduction
			})
			.catch(error => {
				console.log(error)
			})
		}
	},
	created(){
			this.getStatusesOfProfileOwnerUser();
	},
	watch:{
		profileOwnerUser: {
			deep: true,
			handler() {
					this.getStatusesOfProfileOwnerUser();
			}
		}
	}
}
</script>

<style scoped>
  .v-text-field input {
    font-size: 30px;
  }
  .n-pointer {
    cursor: pointer;
  }
  .n-pointer:hover{
    text-decoration: underline;
  }
</style>