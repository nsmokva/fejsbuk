<template>
	<div>
		<add-status v-if="showAddStatus" :loggedInUser="loggedInUser" @newStatusPosted="onNewStatusPosted"></add-status>
		<v-card flat outlined v-for="status in statuses" :key="status._id" class="mb-3">
			<v-container >
				<v-row>
					<v-col cols="auto">
						<v-avatar  color="secondary" size="35">
							<v-img :src="'/backend/user/images/' + status.ownerPhotoName" height="35" width="35"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="auto">
						<router-link :to = "{ name: 'timeline', params: { id: status.ownerId }}"><p class="primary--text font-weight-medium mb-0">{{status.ownerFirstName}} {{status.ownerLastName}}</p></router-link>
						<span class="font-weight-light text-caption">{{formatDate(status.date)}}</span>
					</v-col>
					<v-spacer></v-spacer>
					<!-- if status bellongs to user that is loged in, let the user edit or delete status -->
					<v-col v-if="statusBelongsToLoggedInUser(status)" cols="auto">
						<v-menu offset-y nudge-bottom="8" left tile>
							<template v-slot:activator="{ on, attrs }">
								<v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
							</template>
							<v-list>
								<v-list-item @click="deleteStatus(status._id)" class="py-0 px-12">
									<v-list-item-title>Delete</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
				<v-row>
					<v-col class="n-font-size">
						{{status.status}}
					</v-col>
				</v-row>
				<v-row class="n-height">
					<!-- show likes and comments -->
					<v-col v-if="status.likes.length != 0" cols="4" class="pt-0 pb-2 pl-0">
						<v-dialog width="500">
							<template v-slot:activator="{ on, attrs }">
								<v-col v-bind="attrs" v-on="on" class="py-0">
									<v-icon class="pr-2" color="grey" size="15">mdi-thumb-up-outline</v-icon>
									<span class="grey--text text-caption">{{likeOrLikes(status.likes)}} this</span>
								</v-col>
							</template>
							<v-card class="pa-6">
								<v-icon color="primary" size="15">mdi-thumb-up-outline</v-icon>
								<span class="grey--text text-caption"> {{status.likes.length}}</span>
								<v-divider></v-divider>
								<p v-for="like in status.likes" :key="like.id" class="grey--text text-subtitle-1 mb-0 mt-4">{{like.fullName}}</p>
							</v-card>
						</v-dialog>
					</v-col>
					<v-col v-if="status.comments.length != 0" cols="auto" align-self="center" class="pt-0 pb-2 pl-2">
						<span class="grey--text text-caption"> {{status.comments.length}} {{commentOrComments(status.comments.length)}}</span>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row class="px-4 py-1">
					<v-col cols="6" @click="likeStatus(status._id)" class="n-pointer-color pa-1">
						<template v-if="loggedInUserLikedAStatus(status.likes)">
							<v-icon color="grey" class="pr-2">mdi-thumb-up-outline</v-icon>
							<span class="grey--text font-weight-medium"> Like</span>
						</template>
						<template v-else>
							<v-icon color="primary" class="pr-2">mdi-thumb-up-outline</v-icon>
							<span class="primary--text font-weight-medium"> Like</span>
						</template>
					</v-col>
					<v-col cols="6" @click="status.openCommentField = !status.openCommentField" class="n-pointer-color pa-1">
						<v-icon color="grey" class="pr-2">mdi-comment-outline</v-icon>
						<span class="grey--text font-weight-medium"> Comment</span>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row v-if="status.openCommentField" align="center">
					<v-col cols="auto">
						<v-avatar  color="secondary" size="35">
							<v-img :src="'/backend/user/images/' + loggedInUser.photoName" height="35" width="35"></v-img>
						</v-avatar>
					</v-col>
					<v-col>
						<v-text-field v-model="newComment" placeholder="Comment... and click enter to post it" outlined background-color="secondary" dense hide-details @keyup.enter="postComment(status._id)"></v-text-field>
					</v-col>
				</v-row>
				<v-row v-for="comment in status.comments" :key="comment._id">
					<v-col cols="auto" class="pb-0">
						<router-link :to = "{ name: 'timeline', params: { id: comment.ownerId }}">
							<v-avatar  color="secondary" size="35">
								<v-img :src="'/backend/user/images/' + comment.photoName" height="35" width="35"></v-img>
							</v-avatar>
						</router-link>
					</v-col>
					<v-col cols="auto" class="pa-0">
						<v-row>
							<v-col cols="12" align-self="center" class="pb-0">
								<v-chip color="secondary">
								<router-link :to = "{ name: 'timeline', params: { id: comment.ownerId }}"><span class="primary--text font-weight-medium">{{comment.ownerFirstName}} {{comment.ownerLastName}} </span></router-link>
								<span class="black--text pl-2"> {{comment.comment}}</span>
								</v-chip>
							</v-col>
							<v-col class="pt-0 pb-1">
								<span class="grey--text text-caption pr-4 pl-2">{{formatDate(comment.date)}}</span>
								<span v-if="commentBelongsToLoggedInUser(comment.ownerId)" class="grey--text text-caption n-pointer" @click="deleteComment(status._id, comment._id)">Delete</span>
							</v-col>
						</v-row>    
					</v-col>
				</v-row>
			</v-container>
		</v-card>
  </div>
</template>    

<script>
import axios from 'axios'
import moment from 'moment';
import AddStatus from '../components/AddStatus.vue'
export default {
  data: function(){
		return{
			statuses: [],
			newComment: ''
		}
	},
	props:['loggedInUser', 'profileOwnerUser', 'showAddStatus', 'id'], // id is prop comming from router +
	components:{
		AddStatus
	},
	methods: {
		getAllStatuses(){
			axios.get('/backend/statuses/all')
			.then(response => {
				response.data.forEach(status => {
					status.openCommentField = false
				});
				//change the order from newer to older
				this.statuses = response.data.reverse()
			})
			.catch(error => {
				console.log('error is', error)
			})
		},
		getStatusesOfProfileOwnerUser(){
			axios.get('/backend/statuses', {params: 
				{
					ownerId: this.profileOwnerUser.id
				}
			})
			.then(response => {
				response.data.forEach(status => {
					status.openCommentField = false
				});
				//change the order from newer to older
				this.statuses = response.data.reverse()
			})
			.catch(error => {
				console.log('error is', error)
			})
		},
		onNewStatusPosted(status){
			this.statuses.unshift(status)
		},
		formatDate(date){
			var unixDate = moment(date).format("x")
			var unixNow = moment().format("x")
			var yearDate = moment(date).format("YYYY")
			var yearNow = moment().format("YYYY")
			var timeDifference = unixNow - unixDate 
			if(timeDifference < (7*24*60*60*1000)){                                 //if item was posted in less than 7 days 
					return moment(date).fromNow()
			}
			else if (yearDate == yearNow){                                          // if item was posted in current year           
					return moment(date).format("MMMM Do")
			}else {                                                                 // if item was posted in any year preceding current year
					return moment(date).format("MMMM Do YYYY")
			}                                           
		},
		statusBelongsToLoggedInUser(status){
			if(status.ownerId == this.loggedInUser.id){
					return true
			}else{
					return false
			}
		},
		deleteStatus(statusId){
			axios.delete('/backend/statuses/', {
				params: {
						id: statusId
				}
			})
			.then(() => {
				var statusesAfterOneHasBeenDeleted = this.statuses.filter(status => status._id !== statusId);
				this.statuses = statusesAfterOneHasBeenDeleted
			})
    },
		likeOrLikes(likes){
			if(likes.length == 1){
					return likes[0].fullName + ' likes'
			}else{
					return likes.length + ' people like'
			}
		},
		commentOrComments(numberOfComments){
			if(numberOfComments == 1){
				return 'comment'
			}else{
				return 'comments'
			}
		},
		loggedInUserLikedAStatus(arrayOfLikes){
			const loggedInUserLike = arrayOfLikes.findIndex(element => element.likeOwnerId === this.loggedInUser.id);
				if (loggedInUserLike == -1){
					return true
			} else{
					return false
			}
		},
		postComment(statusId){
      if(this.newComment != ''){
        axios.post('/backend/statuses/comments', {
          statusId: statusId,
          ownerName: this.loggedInUser.firstName,
          ownerLastName: this.loggedInUser.lastName,
          ownerId: this.loggedInUser.id,
          date:  moment(),
          photoName: this.loggedInUser.photoName,
          comment: this.newComment
        })
        .then(response => {
          const currentStatus = this.statuses.find(status => status._id === statusId);
          currentStatus.comments = response.data.comments
          this.newComment = ''                
        })
        .catch(function (error) {
          console.log(error);
        });	
      }	
		},   
		commentBelongsToLoggedInUser(commentOwnerId){
			if(commentOwnerId == this.loggedInUser.id){
				return true
			}else{
				return false
			}
		},
		deleteComment(statusId, commentId){
			axios.post('/backend/comments/delete', {
				id: statusId,
				commentId: commentId
			})
			.then(response => {
				const currentStatus = this.statuses.find(status => status._id === statusId);
				currentStatus.comments = response.data.comments
			})
		},
		likeStatus(statusId){
			var like = {
				fullName: this.loggedInUser.firstName + ' ' + this.loggedInUser.lastName,
				likeOwnerId: this.loggedInUser.id
			}
			axios.post('/backend/statuses/likes', {
				id: statusId,
				like: like
			})
			.then(response => {
				const currentStatus = this.statuses.find(status => status._id === statusId);
				currentStatus.likes = response.data.likes
			})
			.catch(function (error) {
				console.log(error);
			});
		},
  },
	created(){
		if(this.id == undefined){
			this.getAllStatuses()
		}else{
			this.getStatusesOfProfileOwnerUser()
		}
	},
	watch:{
		profileOwnerUser: {
			deep: true,
			handler() {
			this.getStatusesOfProfileOwnerUser()
			}
		}
	}
}
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
  .n-pointer-color {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
  }
  .n-pointer-color:hover {
    text-decoration: none;
    background-color: #edf0f5;
  }
  .n-pointer {
    cursor: pointer;
  }
  .n-pointer:hover {
    text-decoration: none;
  }
  .n-height {
    height: 32px;
  }
  .n-font-size{
    font-size: 1.5rem;
  }
</style>