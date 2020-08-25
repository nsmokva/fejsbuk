<template>
    <div>
        <v-container class="pt-0">
            <v-row class="pa-0">  
                <v-col cols="4" class="pa-0">
                    <v-row>
                        <v-col>
                            <intro/>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="8" class="pr-0">
                    <v-card flat outlined> 
                    <v-container class="pt-0">
                        <v-row>
                            <v-col>
                                <v-textarea v-model="status" placeholder="What is on your mind?" solo flat hide-details rows="1"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row class="white" justify="end">
                            <v-col cols="auto">
                                <v-btn color="primary">Post</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card>
                    <v-container>
                        <v-card flat outlined>
                            <v-row class="white">
                                <v-col cols="12">
                                    {{status}}
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
export default {
    data: function(){
        return{
            status: '',
        }
    },
    components:{
        Intro
    },
}
</script>

<style scooped>

</style>