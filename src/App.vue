<template>
  <v-app>

    <!-- navbar -->
      <v-container v-if="isNotLoginorNotFoundPage" class="primary pa-0" fluid>
       <v-row>
        <v-col cols="1">
        </v-col>
        <v-col cols="auto" class="py-0" align-self="center">
          <v-icon color="white" size="40">mdi-facebook</v-icon>
        </v-col>
        <v-col cols="3" align-self="center" class="pa-0">
          <!-- <v-text-field v-model="search" class="pt-0 mt-0" background-color="white" hide-details></v-text-field> -->
          <v-autocomplete
          v-model="search"
          :items="users"
          :filter="customFilter"
          color="white"
          item-text="fullName"
          label="Search"
          auto-select-first
          clearable
          solo
          hide-details
          dense
          @change='autocompleteChanged'
      ></v-autocomplete>
    
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" align-self="center">
         <router-link :to = "{ name: 'timeline', params: { id: id }}"><span class="white--text text-h6">{{name}}</span></router-link>
        </v-col>
         <v-col cols="auto" align-self="center">
         <router-link :to = "{ name: 'home'}"><span class="white--text text-h6">Home</span></router-link>
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-menu offset-y nudge-bottom="14" left tile>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" size="35">mdi-menu-down</v-icon>
            </template>
            <v-list>
              <v-list-item @click="logout" class="py-0 px-12">
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="1">
        </v-col>
       </v-row>
      </v-container>

    <!-- content -->
    <router-view v-on:grabname="ongrabname"></router-view>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
      search: '',
      name:'',
      id:'',
      users: []
    }
  },
   computed:{
    isNotLoginorNotFoundPage(){
      if (this.$route.name === 'login' || this.$route.name === 'notFound'){
        return false
      }else{
        return true
      }
    }
  },
  created(){
    this.getAllUsers();
  },
  methods:{
    ongrabname(namesentinevent){
      this.name = namesentinevent.name
      this.id = namesentinevent.id
      console.log('ongrabname')
    },
    logout(){
       sessionStorage.clear();
       this.$router.push('/login')
    },
    getAllUsers(){
       axios.get('/backend/users')
        .then(response => {
            console.log(response.data)
            var users = response.data
            users.forEach(element => element.fullName = element.firstName + ' ' + element.lastName)
            this.users = users
           console.log('get all users, ', this.users)
        })
        .catch(error => {
            console.log(error)
        })
    },
     customFilter (item, queryText) {
        const textOne = item.firstName.toLowerCase()
        const textTwo = item.lastName.toLowerCase()
        const searchText = queryText.toLowerCase()
        return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      },
      autocompleteChanged(){
        var selectedUser = this.users.find(item => item.fullName == this.search);
        this.$router.push({ name: 'timeline', params: { id: selectedUser._id } });
        console.log('search1', this.search)
        this.search = '';
        console.log('search2', this.search)
      
      }
  }
}
</script>

<style scoped>
  
</style>
