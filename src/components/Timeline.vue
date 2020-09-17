<template>
    <div>
        <v-container class="pt-0">
            <v-row class="pa-0"> 

                <!-- things on the right --> 
                <v-col cols="4" class="pa-0">
                    <v-row>
                        <v-col>
                            <intro :id="this.id"></intro>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <friends :id='id'></friends>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- things on the left -->
                <v-col cols="8" class="pr-0">
                    <v-card flat outlined v-if="profileBelongsToLoggedInUser()"> 
                    <v-container class="pt-0">
                        <v-row>
                            <v-col>
                                <v-textarea v-model="newStatus" placeholder="What is on your mind?" solo flat hide-details rows="1"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row class="white" justify="end">
                            <v-col cols="auto">
                                <v-btn color="primary" @click="save">Post</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card>


                    <v-container v-for="status in statuses" :key="status._id">
                        <v-card flat outlined>
                            <v-row class="white">
                                <v-col cols="12">
                                    <v-row justify="space-between">
                                        <v-col cols="auto">
                                           <p class="primary--text font-weight-medium mb-0">{{status.ownerFirstName}} {{status.ownerLastName}}</p>
                                           <span class="font-weight-light text-caption">{{formatDate(status.date)}}</span>
                                        </v-col>
                                        <v-col v-if="profileBelongsToLoggedInUser()" cols="auto">
                                           



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
                                        <v-col v-if="status.likes.length != 0" cols="auto">
                                            <v-dialog width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-col v-bind="attrs" v-on="on" >
                                                        <v-icon color="primary" size="15">mdi-thumb-up-outline</v-icon>
                                                        <span class="grey--text text-caption"> {{status.likes.length}} people like this</span>
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
                                            <span class="grey--text text-caption"> {{status.comments.length}} comments</span>
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
                                                <span class="primary--text text-caption">{{logedInUserName}}</span>
                                                <!-- <v-img :src="require('../../public/Ivica.jpg')"></v-img> -->
                                            </v-avatar>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="comment" placeholder="Comment... and click enter to post it" outlined background-color="secondary" dense hide-details @keyup.enter="postComment(status._id)"></v-text-field>
                                        </v-col>
                                    </v-row>




                                    <v-row v-for="comment in status.comments" :key="comment._id">
                                        <v-col cols="auto" class="pl-1 pb-0">
                                            <v-avatar  color="secondary" size="35">
                                                <span class="primary--text text-caption">{{comment.ownerFirstName}}</span>
                                                <!-- <v-img :src="require('../../public/Ivica.jpg')"></v-img> -->
                                            </v-avatar>
                                        </v-col>
                                        <v-col cols="auto" class="pa-0">
                                          
                                          <v-row>
                                            <v-col cols="12" align-self="center" class="pb-0">
                                              <v-chip color="secondary">
                                                <span class="primary--text font-weight-medium">{{comment.ownerFirstName}} {{comment.ownerLastName}} </span>
                                                <span class="black--text pl-2"> {{comment.comment}}</span>
                                              </v-chip>
                                            </v-col>
                                            <v-col class="pt-0 pb-1">
                                              <span class="grey--text text-caption pr-4 pl-2">{{formatDate(comment.date)}}</span>
                                              <span v-if="commentBelongsToLoggedInUser(comment.ownerId)" class="grey--text text-caption" @click="eraseComment(status._id, comment._id)">Erase</span>
                                            </v-col>
                                        
                                            
                                          </v-row>

                                      

                                            
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-container>
                </v-col>

            </v-row>
        </v-container> 
    </div>

</template>

<script>
import Intro from './timeline/Intro.vue'
import Friends from './Friends.vue'
import axios from 'axios'
import moment from 'moment';
export default {
    data: function(){
        return{
            newStatus: '',
            statuses: [],
            logedInUserName: '',
            comment: ''
        }
    },
    props: ['id', 'firstName', 'lastName'],
    components:{
        Intro,
        Friends
    },
    methods:{
         profileBelongsToLoggedInUser(){
            var profileOwnerId = this.id
            var loggedInUserId = sessionStorage.getItem("id")
            this.logedInUserName = sessionStorage.getItem("name")
            if(profileOwnerId == loggedInUserId){
                return true
            }else{
                return false
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
        save(){
            var now = moment();
            console.log('logging moment: ', now, 'typeof:', typeof(now))
            console.log('post axios', this.firstName, this.lastName)
            axios.post('/backend/statuses', {
                ownerId: sessionStorage.getItem('id'),
                status: this.newStatus, 
                ownerFirstName: this.firstName,
                ownerLastName: this.lastName,
                date: now   
            })
            .then(response => {
                console.log('response of posting new status', response.data.status);
                response.data.openCommentField = false
                this.statuses.unshift(response.data)
                this.newStatus = ''
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        erase(statusId){
            console.log('status id: ', statusId)
            axios.delete('/backend/statuses/:id', {
                params: {
                    id: statusId
                }
            })
            .then(response => {
                console.log('response: ', response.data)
                var statusesAfterOneHasBeenDeleted = this.statuses.filter(status => status._id !== statusId);
                this.statuses = statusesAfterOneHasBeenDeleted

            })
        },
        eraseComment(statusId, commentId){
            console.log('status id: ', statusId)
            axios.post('/backend/comments/delete', {
                    id: statusId,
                    commentId: commentId
            })
            .then(response => {
                console.log('response: ', response.data)
                const currentStatus = this.statuses.find(status => status._id === statusId);
                currentStatus.comments = response.data.comments

            })
        },
        like(id){
            var name = sessionStorage.getItem('name');
            var lastName = sessionStorage.getItem('lastName')
            var like = name + ' ' + lastName
            console.log('id is ', id)
            axios.post('/backend/statuses/likes', {
                id: id,
                like: like
            })
             .then(response => {
                console.log('response is:', response)
                const currentStatus = this.statuses.find(status => status._id === id);
                console.log('before -- curentStatus: ', currentStatus)
                currentStatus.likes = response.data.likes
                console.log('after -- curentStatus: ', currentStatus)
            })

            .catch(function (error) {
                console.log(error);
            });
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
                comment: this.comment

            })
             .then(response => {
                console.log('response is:', response)
               const currentStatus = this.statuses.find(status => status._id === id);
                currentStatus.comments = response.data.comments
                this.comment = ''
              
                
            })

            .catch(function (error) {
                console.log(error);
            });
            
        },
        formatDate(date){
            return moment(date).format("MMMM Do YYYY")
        }
    },
   created(){
     console.log('id from created ', this.id)
        axios.get('/backend/statuses', {params: {
            ownerId: this.id
        }})
        .then(response => {
            console.log('logging statuses')
            response.data.forEach(status => {
                status.openCommentField = false
            });
            //change the order from newer to older
           this.statuses = response.data.reverse()
           console.log('edited status array: ', this.statuses)
        })
        .catch(error => {
            console.log(error)
        })
    },
    watch:{
    $route (to){
         axios.get('/backend/statuses', {params: {
            ownerId: to.params.id
        }})
        .then(response => {
            console.log('logging statuses')
            this.statuses = response.data
            console.log('statuses from timeline', this.statuses)
        })
        .catch(error => {
            console.log(error)
        })
    }
} 
    
}
</script>

<style scooped>

</style>