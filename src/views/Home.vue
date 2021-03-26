<template>
	<div>
		<v-container class="secondary pt-0" fluid>
			<v-container>
				<statuses :loggedInUser="loggedInUser" :showAddStatus="true"></statuses>
				<welcome v-if="isNewUser" :loggedInUser="loggedInUser" ></welcome>
			</v-container> 
		</v-container>   
	</div>
</template>

<script>
import Statuses from '../components/Statuses.vue'
import Welcome from '../components/Welcome.vue'
export default {
	props: ['loggedInUser', 'isNewUser'],
	components:{
		Statuses,
		Welcome
	},
}
</script>
