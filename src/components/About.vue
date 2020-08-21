<template>
   <div>
       <v-container>
            <v-row class="white" align="center">
                <v-col cols="auto"><v-icon size="50">mdi-account</v-icon></v-col>
                <v-col cols="auto"><span class="text-h5 grey--text font-weight-bold">Information</span></v-col>
            </v-row>
            <v-row class="white">
                <v-col cols="4">
                    <v-list-item :to="{name: 'allinfo'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">All info</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name:'basicinfo'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Basic info</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name: 'contact'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Contact</p></v-list-item-content></v-list-item>
                    <v-list-item :to="{name: 'job'}"><v-list-item-content><p class="pt-3 pb-3 text-h6 grey--text">Education and Job</p></v-list-item-content></v-list-item>
                </v-col>
                <v-col cols="8">
                  <router-view></router-view>
                </v-col>
            </v-row>
        </v-container>
   </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>