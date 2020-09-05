<template>
    <div>
        <template v-if="profileBelongsToLoggedInUser()">
            <p class="grey--text text-uppercase text-subtitle-1 mb-0">Basic info</p>
            <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
            <p v-if="this.editedcity!=='' &&  this.editedcity!=undefined">Lives in <span>{{editedcity}}</span></p>
            <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add a city where you are living</span></p>
        </template>
        <template v-else>
            <template v-if="this.editedcity!=='' &&  this.editedcity!=undefined">
                <p class="grey--text text-uppercase text-subtitle-1 mb-0">Basic info</p>
                <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
        </template>
                <p v-if="this.editedcity!=='' &&  this.editedcity!=undefined">Lives in <span>{{editedcity}}</span></p>      
        </template>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            
        }
    },
    props: ['editedcity'],
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
    }
}
</script>