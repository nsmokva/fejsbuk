<template>
    <div>
       <p class="grey--text text-uppercase text-subtitle-1 mb-0">Contact</p>
       <div id="divider" style="background-color:#edf0f5; height: 3px; width:100%;"></div>
       <p v-if="this.editedemail2!=='' &&  this.editedemail2!=undefined">Email: <span>{{editedemail2}}</span></p>
       <p @click.stop="$emit('opendialog')" v-else><v-icon color="primary">mdi-plus</v-icon> <span class="primary--text"> Add your email</span></p>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            
        }
    },
    props: ['editedemail2'],
}
</script>

<style scooped>
   
</style>
