<template>
    <div>
        <p class="pt-3" @click="toggleCity"><v-icon>mdi-plus</v-icon><span>Add city where you live</span></p>
        <v-row>
                <v-col class="pa-0">
                    <v-textarea v-if="addCity" v-model="city" placeholder="What is on your mind?" solo flat hide-details rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row class="white" justify="end">
                <v-col cols="auto">
                    <v-btn @click="add" color="primary">Add</v-btn>
                </v-col>
            </v-row>

        <p>22.1.1990.</p>
        <p>Gradevinski fakultet Zagreb</p>
        <p>Odjel za prostorno uredjenje</p>
        <p>Ozenjen</p>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            dateOfBirth: '',
            email: '',
            city: '',
            addCity: false
        }
    },
    methods:{
        toggleCity(){
            this.addCity = !this.addCity
        },
        add(){
           
        }
    }
}
</script>