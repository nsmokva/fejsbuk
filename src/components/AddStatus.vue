<template>
	<div>
		<v-card flat outlined class="mb-3"> 
			<v-container class="pt-0">
				<v-row>
					<v-col cols="auto" align-self="center" class="pr-0">
						<v-avatar  color="secondary" size="35">
							<v-img :src="'/backend/user/images/' + loggedInUser.photoName" height="35" width="35"></v-img>
						</v-avatar>
					</v-col>
					<v-col class="pl-0">
						<v-textarea v-model="newStatus" :placeholder="'What is on your mind ' + loggedInUser.firstName + '?'" solo flat hide-details rows="1"></v-textarea>
					</v-col>
				</v-row>
				<v-row class="white" justify="end">
					<v-col cols="auto">
						<v-btn color="primary" @click="save" :disabled="newStatus==''">Post</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
export default {
	data: function(){
			return {
					newStatus: ''
			}
	},
	props: ['loggedInUser'],
	methods: {
		save(){
			var now = moment();
			axios.post('/backend/statuses', {
				status: this.newStatus,
				ownerId: this.loggedInUser.id,
				ownerFirstName: this.loggedInUser.firstName,
				ownerLastName: this.loggedInUser.lastName,
				ownerPhotoName: this.loggedInUser.photoName,
				date: now
			})
			.then(response => {
				response.data.openCommentField = false
				this.$emit('newStatusPosted', response.data)
				this.newStatus = ''
			})
			.catch(function (error) {
				console.log(error);
			});
		},
	},
}
</script>