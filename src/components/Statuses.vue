
<template>
<div>
    <add-status v-if="showAddStatus" :loggedInUser="loggedInUser" @statusAdded="statusReceived"></add-status>
    <v-card flat outlined v-for="status in statuses" :key="status._id" class="mb-3">
        <v-container >
            <v-row>
                 <v-col cols="auto">
                    <v-avatar  color="secondary" size="35">
                        <v-img :src="'/backend/user/images/' + loggedInUser.photoname" height="35" width="35"></v-img>
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
                        <v-list-item class="py-0 px-12">
                            <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="erase(status._id)" class="py-0 px-12">
                            <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    {{status.status}}
                </v-col>
            </v-row>
            <v-row >
                <!-- show likes and comments -->
                <v-col v-if="status.likes.length != 0" cols="auto">
                    <v-dialog width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-col v-bind="attrs" v-on="on" >
                                <v-icon color="primary" size="15">mdi-thumb-up-outline</v-icon>
                                <span class="grey--text text-caption"> {{status.likes.length}} {{likeOrLikes(status.likes.length)}} this</span>
                            </v-col>
                        </template>
                        <v-card class="pa-6">
                            <v-icon color="primary" size="15">mdi-thumb-up-outline</v-icon>
                            <span class="grey--text text-caption"> {{status.likes.length}}</span>
                            <v-divider></v-divider>
                            <p v-for="like in status.likes" :key="like" class="grey--text text-subtitle-1 mb-0 mt-4">{{like}}</p>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-col v-if="status.comments.length != 0" cols="auto" align-self="center">
                    <span class="grey--text text-caption"> {{status.comments.length}} {{commentOrComments(status.comments.length)}}</span>
                </v-col>
            </v-row>

            



            <v-divider></v-divider>
            <v-row justify="space-around">
                <v-col cols="auto" @click="like(status._id)">
                    <v-icon color="grey">mdi-thumb-up-outline</v-icon>
                    <span class="grey--text font-weight-medium"> Like</span>
                </v-col>
                <v-col cols="auto" @click="status.openCommentField = !status.openCommentField">
                    <v-icon color="grey">mdi-comment-outline</v-icon>
                    <span class="grey--text font-weight-medium"> Comment</span>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row v-if="status.openCommentField" align="center">
                <v-col cols="auto">
                    <v-avatar  color="secondary" size="35">
                        <v-img :src="'/backend/user/images/' + loggedInUser.photoname" height="35" width="35"></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <v-text-field v-model="comment" placeholder="Comment... and click enter to post it" outlined background-color="secondary" dense hide-details @keyup.enter="postComment(status._id)"></v-text-field>
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
                        <span v-if="commentBelongsToLoggedInUser(comment.ownerId)" class="grey--text text-caption" @click="eraseComment(status._id, comment._id)">Delete</span>
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
            comment: ''
        }
    },
    props:['id', 'photoname', 'loggedInUser', 'showAddStatus'],
    components:{
        AddStatus
    },
    methods: {
        statusReceived(statusFromEvent){
            this.statuses.unshift(statusFromEvent)
        },
        formatDate(date){
            //return moment(date).fromNow()
            // return moment(date).format("MMMM Do YYYY")
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
            var statusOwnerId = status.ownerId
            var loggedInUserId = sessionStorage.getItem("id")
            if(statusOwnerId == loggedInUserId){
                return true
            }else{
                return false
            }
        },
         likeOrLikes(number){
            if(number == 1){
                return 'person likes'
            }else{
                return 'people like'
            }
        },
        postComment(id){
            var name = sessionStorage.getItem('name');
            var lastName = sessionStorage.getItem('lastName')
            var ownerId = sessionStorage.getItem('id');
            axios.post('/backend/statuses/comments', {
                statusId: id,
                ownerName: name,
                ownerLastName: lastName,
                ownerId: ownerId,
                date:  moment(),
                photoName: this.loggedInUser.photoname,
                comment: this.comment

            })
             .then(response => {
               const currentStatus = this.statuses.find(status => status._id === id);
                currentStatus.comments = response.data.comments
                this.comment = ''
                console.log('cccccccccccccccccccccccccccccccccccc', response.data.comments)
              
                
            })

            .catch(function (error) {
                console.log(error);
            });
            
        },
        commentOrComments(number){
            if(number == 1){
                return 'comment'
            }else{
                return 'comments'
            }
        },
        commentBelongsToLoggedInUser(commentOwnerId){
            var loggedInUserId = sessionStorage.getItem("id")
            if(commentOwnerId == loggedInUserId){
                return true
            }else{
                return false
            }
        },
        like(id){
            var name = sessionStorage.getItem('name');
            var lastName = sessionStorage.getItem('lastName')
            var like = name + ' ' + lastName
            axios.post('/backend/statuses/likes', {
                id: id,
                like: like
            })
             .then(response => {
                const currentStatus = this.statuses.find(status => status._id === id);
                currentStatus.likes = response.data.likes
            })

            .catch(function (error) {
                console.log(error);
            });
        },
        eraseComment(statusId, commentId){
            axios.post('/backend/comments/delete', {
                    id: statusId,
                    commentId: commentId
            })
            .then(response => {
                const currentStatus = this.statuses.find(status => status._id === statusId);
                currentStatus.comments = response.data.comments

            })
        },
        getAllStatuses(){
            axios.get('/backend/statuses/all')
            .then(response => {
                response.data.forEach(status => {
                    status.openCommentField = false
                });
                //change the order from newer to older
                this.statuses = response.data.reverse()
                this.$emit('emitListOfStatuses', {listOfStatuses: this.statuses})
            })
            .catch(error => {
                console.log('error is', error)
            })
        },
        getStatusesOfLoggedInUser(){
            axios.get('/backend/statuses', {params: {
            ownerId: this.id
            }})
            .then(response => {
                response.data.forEach(status => {
                    status.openCommentField = false
                });
                //change the order from newer to older
                this.statuses = response.data.reverse()
                this.$emit('emitListOfStatuses', {listOfStatuses: this.statuses})
                console.log('Logging statuses ', this.statuses)
            })
            .catch(error => {
                console.log('error is', error)
            })
        },
        erase(statusId){
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
    },
    created(){
        if(this.id == undefined){
            this.getAllStatuses()
        }else{
            this.getStatusesOfLoggedInUser()
        }
    },
    watch:{
    id (newId){
         axios.get('/backend/statuses', {params: {
            ownerId: newId
        }})
        .then(response => {
            response.data.forEach(status => {
                status.openCommentField = false
            });
            //change the order from newer to older
           this.statuses = response.data.reverse()
        })
        .catch(error => {
            console.log(error)
        })
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
</style>