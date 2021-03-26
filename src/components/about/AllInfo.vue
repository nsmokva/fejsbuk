<template>
	<div>
    
		<basic-info :profileOwnerUserAboutData="profileOwnerUserAboutData" :loggedInUser="loggedInUser" :profileOwnerUser="profileOwnerUser" @profileOwnerUserAboutDataChanged='onProfileOwnerUserAboutDataChanged'></basic-info>
		<contact :profileOwnerUserAboutData="profileOwnerUserAboutData" :loggedInUser="loggedInUser" :profileOwnerUser="profileOwnerUser" @profileOwnerUserAboutDataChanged='onProfileOwnerUserAboutDataChanged'></contact>
		<job-and-edu :profileOwnerUserAboutData="profileOwnerUserAboutData" :loggedInUser="loggedInUser" :profileOwnerUser="profileOwnerUser" @profileOwnerUserAboutDataChanged='onProfileOwnerUserAboutDataChanged'></job-and-edu>
	</div>
</template>

<script>
import BasicInfo from "./BasicInfo.vue"
import Contact from "./Contact.vue"
import JobAndEdu from "./JobAndEdu.vue"
export default {
  components: { 
    BasicInfo,
    Contact,
    JobAndEdu
  },
  props: ['loggedInUser', 'profileOwnerUser', 'profileOwnerUserAboutData'],
  methods: {
    onProfileOwnerUserAboutDataChanged(newUserData){
      this.$emit('profileOwnerUserAboutDataChanged', newUserData)
    }
  }
}
</script>

<style scooped>
  
</style>



