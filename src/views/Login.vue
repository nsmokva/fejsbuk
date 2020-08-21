<template>
    <div>
        <!-- header -->
        <v-container fluid class="primary">
            <v-row>
                <v-container>
                    <v-row>
                        <v-col cols="auto" class="text-h1 white--text font-weight-black pt-12">
                            fakebook
                        </v-col>
                        <v-spacer></v-spacer>
                         <v-col cols="auto" class="pt-12">
                             <v-row align="end">
                                 <v-col>
                                    <p class="text-h6 white--text">Email or Phone</p>
                                    <v-text-field v-model="email" class="pt-0 mt-0" background-color="white" hide-details></v-text-field>
                                 </v-col>
                                 <v-col>
                                    <p class="text-h6 white--text">Password</p>
                                    <v-text-field v-model="password" class="pt-0 mt-0" background-color="white" hide-details type="password"></v-text-field>
                                 </v-col>
                                 <v-col cols="auto">
                                    <v-btn class="text-h6 white--text text-capitalize" color="#5872A6" @click="login">Log In</v-btn>
                                 </v-col>
                             </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </v-container>

        <!-- main content -->
        <v-container fluid class="secondary">
            <v-row>
                <v-container>
                    <v-row>
                      <!-- about -->
                        <v-col cols="7">
                            <v-row>
                                <v-col class="text-h4 font-weight-medium pb-10 pt-10">
                                    Connect with friends and world around you on Facebook.
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-icon size="70">mdi-newspaper-variant</v-icon> 
                                    <span class="font-weight-bold pl-12">See photos and updates </span>
                                    <span>from friends in News Feed.</span> 
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-icon size="70">mdi-monitor-share</v-icon>
                                    <span class="font-weight-bold pl-12">Share what's new </span>
                                    <span>in your life on your Timeline.</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-icon size="70">mdi-share-variant-outline</v-icon>
                                  <span class="font-weight-bold pl-12">Find more </span>
                                    <span>of what you are looking for with Graph Search.</span>           
                                </v-col>
                            </v-row>
                        </v-col>
                        <!-- sign up -->
                        <v-col cols="5">
                          <p class="text-h3">Sign Up</p> 
                          <p class="text-h5">It's free and always will be.</p>
                          <v-row>
                            <v-col cols="6" class="pt-2 pb-2 pr-2">
                              <v-text-field placeholder="First Name" outlined background-color="white" dense hide-details></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pt-2 pb-2 pl-2">
                              <v-text-field placeholder="Last Name" outlined background-color="white" dense hide-details></v-text-field>
                            </v-col>
                          </v-row>
                           <v-row>
                            <v-col class="pt-2 pb-2">
                              <v-text-field placeholder="Email or mobile number" outlined background-color="white" dense hide-details></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-2 pb-2">
                              <v-text-field placeholder="Re-enter email or mobile number" outlined background-color="white" dense hide-details></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-2 pb-2">
                              <v-text-field placeholder="New password" outlined background-color="white" dense hide-details></v-text-field>
                            </v-col>
                          </v-row>
                          <p class="text-h5 mb-0 pt-4">Birthday</p>
                          <v-row>
                            <v-col cols="2" class="pr-0 pt-1">
                              <v-select v-model="monthOfBirth" :items="months" dense outlined solo flat hide-details>
                              </v-select>
                            </v-col>
                             <v-col cols="2" class="pl-0 pr-0 pt-1">
                              <v-select v-model="dayOfBirth" :items="days" dense outlined solo flat hide-details>
                              </v-select>
                            </v-col>
                             <v-col cols="2" class="pl-0 pt-1">
                              <v-select  v-model="yearOfBirth" :items="years" dense outlined solo flat hide-details menu-props="offset-y">
                              </v-select>
                            </v-col>
                          </v-row>
                          <v-radio-group v-model="gender" row>
                            <v-radio label="Female" value="female"></v-radio>
                            <v-radio label="Male" value="male"></v-radio>
                          </v-radio-group>
                          <v-btn class="text-h5 text-capitalize mt-2 font-weight-medium" color="accent" large>Create Account</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </v-container>

        <!-- footer -->
        <v-container>
          <v-row>
            <v-col class="text-body-2 pt-12 mt-12 font-weight-light grey--text">
              nsmokva © 2020
            </v-col>
          </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: function(){
      return{
        email: '',
        password: '',
        monthOfBirth: "Jan",
        dayOfBirth: 1,
        yearOfBirth: 2000,
        gender: '',
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    computed:{
      years () {
        const year = new Date().getFullYear()
        return Array.from({length: year - 1900}, (value, index) => 1901 + index)
      },
      days () {
        const day = 32
        return Array.from({length: day - 1}, (value, index) => 1 + index)
      }
    },
    methods:{
      login(){
        // at login send http request containing email and password  to backend
        // use nina 1234 to go through
        var user = {
          email: this.email,
          password: this.password
        }
        axios.get('/backend/login', {
          params: user
        })
        .then(response => {
          console.log(response)
          sessionStorage.setItem('id', response.data._id);
          this.$router.push({ name: 'home', params: { id: response.data._id } })
          // if user is authenticated 
          // save email and password to local storage 
          //push him to home page

        })
        .catch(error => {
          console.log(error)
        })
      }
    }
}
</script>

<style scoped>

</style>