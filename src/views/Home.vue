<template>
    <div>
        <!-- <p>Home page</p>
        <v-btn :to= "{ name: 'timeline', params: { id: id }}">Go To Profile</v-btn>
        {{name}} -->

        <v-container class="secondary pt-0" fluid>
            <v-container>
                <v-row>
                    <v-col>
                        {{statuses}}

                    </v-col>
                </v-row>
            </v-container>
            

        </v-container>



        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: function(){
        return{
            name:'',
            id: '',
            statuses: []
        }
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
            console.log('statuses', this.statuses)
            })
            .catch(error => {
                console.log('error is', error)
            })
            }
    },
    created(){
        this.name = sessionStorage.getItem('name');
        this.id = sessionStorage.getItem('id');
        this.$emit('grabname', {name: this.name, id: this.id})
        this.getAllStatuses()

    }
}
</script>

<style scoped>

</style>