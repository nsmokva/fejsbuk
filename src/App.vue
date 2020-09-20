<template>
  <v-app>

    <!-- navbar -->
      <v-container v-if="isNotLoginorNotFoundPage" class="primary pa-0" fluid>
       <v-row>
        <v-col cols="1">
        </v-col>
        <v-col cols="auto">
          <v-icon color="white" size="40">mdi-facebook</v-icon>
        </v-col>
        <v-col cols="3" align-self="center">
          <v-text-field v-model="search" class="pt-0 mt-0" background-color="white" hide-details></v-text-field>
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
export default {
  data: function(){
    return {
      search: '',
      name:'',
      id:''
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
    this.name = sessionStorage.getItem('name');
    this.id = sessionStorage.getItem('id');
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
    }
  }
}
</script>

<style scoped>
  
</style>
