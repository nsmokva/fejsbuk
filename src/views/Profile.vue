<template>
	<div>
		<v-container class="secondary pt-0" fluid>
			<v-container class="pt-0">
				<v-row class="grey darken-4 ninaheadline" align="end">
					<v-col cols="auto">
						<v-avatar color="grey lighten-2" size="245" class="mt-12 ml-4 nina">
							<v-avatar color="white" size="240">
								<v-avatar size="230">
									<v-hover v-slot:default="{ hover }">  
										<v-img v-if="profileOwnerUser.photoName != undefined && profileOwnerUser.photoName != ''" :src="'/backend/user/images/' + profileOwnerUser.photoName" height="230" width="230">	
                      <template v-if="profileBelongsToLoggedInUser()">
												<v-expand-transition>
													<v-file-input v-if="hover" class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3" style="height: 50%;" hide-input @change="photoChanged" prepend-icon="mdi-camera"></v-file-input>
												</v-expand-transition>
											</template>
										</v-img>
                    <v-img v-else :src="require('../../public/default.jpeg')" height="230" width="230">
                      <template v-if="profileBelongsToLoggedInUser()">
												<v-expand-transition>
													<v-file-input v-if="hover" class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3" style="height: 50%;" hide-input @change="photoChanged" prepend-icon="mdi-camera"></v-file-input>
												</v-expand-transition>
											</template>
                    </v-img>
									</v-hover> 
								</v-avatar>
							</v-avatar>
						</v-avatar>
					</v-col>
					<v-col class="white--text text-h4">
						{{profileOwnerUser.firstName}} {{profileOwnerUser.lastName}}
					</v-col>
				</v-row>
				<v-row class="white" justify="end">
					<v-divider vertical></v-divider>
					<v-col cols="auto" class="pa-0">
						<v-list-item :to="{name: 'timeline'}"><v-list-item-content class="primary--text text-h6">Timeline</v-list-item-content></v-list-item>   
					</v-col>
					<v-divider vertical></v-divider>
					<v-col cols="auto" class="pa-0">
						<v-list-item :to="{name: 'allinfo'}"><v-list-item-content class="primary--text text-h6">About</v-list-item-content></v-list-item>   
					</v-col>
					<v-divider vertical></v-divider>
					<v-col cols="auto" class="pa-0">
						<v-list-item :to="{name: 'friends'}"><v-list-item-content class="primary--text text-h6">Friends</v-list-item-content></v-list-item>   
					</v-col>
					<v-divider vertical></v-divider>
				</v-row>
			</v-container>
				<router-view v-if="isProfileOwnerUserDataLoaded" :id='id' :profileOwnerUser="profileOwnerUser" :loggedInUser="loggedInUser"></router-view>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return{
      profileOwnerUser: {
        id: '',
        firstName: '',
        lastName: '',
        photoName: ''
      },
      isProfileOwnerUserDataLoaded: false
    }
  },
  props: ['loggedInUser', 'id'], // id prop is comming from the router 
  methods:{
    getProfileData(){
      if (this.$route.name !== 'login' && this.$route.name !== 'notFound'){
        axios.get('/backend/user', {
          params: {
            id: this.id
          }
        })
        .then(response => {
          this.profileOwnerUser.id = response.data._id
          this.profileOwnerUser.firstName = response.data.firstName
          this.profileOwnerUser.lastName = response.data.lastName
          this.profileOwnerUser.photoName = response.data.photoName
          this.isProfileOwnerUserDataLoaded = true
        })
        .catch(error => {
          console.log(error)
        })
      } 
    },
    photoChanged(p){
      let formData = new FormData();
      formData.append('upload', p);
      axios.post( '/backend/user/images/' + p.name,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      .then(()=>{
        axios.post('/backend/user/userdata/photoname', {
          id: sessionStorage.getItem('id'),
          photoname: p.name
        })
        .then(() => {
          this.profileOwnerUser.photoName = p.name
        })
        .catch(function (error) {
          console.log(error);
        });
      })
    },
    profileBelongsToLoggedInUser(){
      if(this.id == this.loggedInUser.id){
        return true
      }else{
        return false
      }
    }
  },
  watch: { 
    id: function() {
      this.getProfileData()
    }
  },
  created (){
    this.getProfileData()
  }
}
</script>

<style>
	.nina{
		margin-bottom: -50px;
	}
	.ninaheadline{
		height: 300px;
	}
	.v-card--reveal {
		align-items: center;
		bottom: 0;
		justify-content: center;
		opacity: .7;
		position: absolute;
		width: 100%;
	}
	.theme--light.v-icon.mdi-camera {
		color: white !important;
	}
</style>