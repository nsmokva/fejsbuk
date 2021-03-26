<template>
	<div>
		<v-container class="pt-0 px-0">
			<v-row no-gutters> 
				<!-- things on the right --> 
				<v-col cols="4" class="pr-3">
					<intro :loggedInUser="loggedInUser" :profileOwnerUser='profileOwnerUser'></intro>
					<friends :id='id'></friends>
				</v-col>
				<!-- things on the left -->
				<v-col cols="8" class="pr-0">
					<statuses :id="id" :loggedInUser="loggedInUser" :profileOwnerUser='profileOwnerUser' :showAddStatus="profileBelongsToLoggedInUser()"></statuses>
				</v-col>
			</v-row>
		</v-container> 
	</div>
</template>

<script>
import Intro from './timeline/Intro.vue'
import Friends from './Friends.vue'
import Statuses from './Statuses.vue'
export default {
	data: function(){
		return{
			statuses: []
		}
	},
	props: ['loggedInUser', 'profileOwnerUser', 'id'], // id is comming from router, it is the same as proifileOwnerUser.id, but that has to be sent one form router as statuses component is deciding whether to getAllStatuses or getStatusesOfLoggedInUseris (whether is in home or in timeline) based on whether or not there is an id in the url or not
	components:{
		Intro,
		Friends,
		Statuses
	},
	methods:{
		profileBelongsToLoggedInUser(){
			if(this.profileOwnerUser.id == this.loggedInUser.id){
				return true
			}else{
				return false
			}
		}, 
	},  
}
</script>

<style>
	.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
		background-color: #88a0d1 !important;
		color: white !important;
	}
</style>