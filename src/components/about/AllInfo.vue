<template>
    <div>
        <template v-if="profileBelongsToLoggedInUser()">
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Basic info</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            <p class="mb-2 flex-container"><v-icon color="grey" class="mr-2">mdi-cake-variant</v-icon><span class="bday">{{bdayEdited}}</span></p>
            <p v-if="this.editedcity!=='' &&  this.editedcity!=undefined">Lives in <span >{{editedcity}}</span></p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add a city where you are living</span></p>
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            <p v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">Email: <span>{{editedemail2}}</span></p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add your email</span></p>
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Job and Education</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            <p v-if="this.editedjob!=='' &&  this.editedjob!=undefined">Working at: {{editedjob}}</p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add a workplace</span></p>
            <p v-if="this.editededucation!=='' &&  this.editededucation!=undefined">School: <span>{{editededucation}}</span></p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon><span class="primary--text"> Add info about your education</span></p>
        </template>
        <template v-else>
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Basic info</p>
            <p class="mb-2 flex-container"><v-icon color="grey" class="mr-2">mdi-cake-variant</v-icon><span class="bday">{{bdayEdited}}</span></p>
            <template v-if="this.editedcity!=='' &&  this.editedcity!=undefined">
                <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            </template>
                <p v-if="this.editedcity!=='' &&  this.editedcity!=undefined">Lives in <span>{{editedcity}}</span></p>
            
        <template v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
        </template>
            <p v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">Email: <span>{{editedemail2}}</span></p>
            
            <template v-if="this.editedjob!=='' &&  this.editedjob!=undefined || this.editededucation!=='' &&  this.editededucation!=undefined">
                <p class="grey--text text-uppercase text-subtitle-1 mb-0">Job and Education</p>
                <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            </template>
            <p v-if="this.editedjob!=='' &&  this.editedjob!=undefined">Working at: {{editedjob}}</p>
            <p v-if="this.editededucation!=='' &&  this.editededucation!=undefined">School: <span>{{editededucation}}</span></p>
            
        </template>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            
        }
    },
    props: ['editedcity', 'editedemail2', 'editedjob', 'editededucation', 'id', 'bday'],
    methods:{
         profileBelongsToLoggedInUser(){
            var profileOwnerId = this.id
            var loggedInUserId = sessionStorage.getItem("id")
            if(profileOwnerId == loggedInUserId){
                return true
            }else{
                return false
            }
        }   
    },
    computed:{
        bdayEdited(){
            var day = this.bday.slice(4, 6)
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
            var bdayEdited = this.bday.replace(day, dayEdited);
            return bdayEdited
        }
    }
}
</script>

<style scooped>
    .bday {
        line-height: 16px;
        vertical-align: bottom;
    }
</style>
