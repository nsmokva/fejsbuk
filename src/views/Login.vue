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
                  <v-text-field v-model="logInData.email" class="pt-0 mt-0" filled dense background-color="white" hide-details></v-text-field>
                </v-col>
                <v-col>
                  <p class="text-h6 white--text">Password</p>
                  <v-text-field v-model="logInData.password" class="pt-0 mt-0" filled dense background-color="white" hide-details :type="passwordTypeLogin" :append-icon="iconLogin" @click:append="togglePasswordVisibility" @keyup.enter="login"></v-text-field>
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
              <v-form ref="form">
                <v-row>
                  <v-col cols="6" class="pt-0 pb-0 pr-2">
                    <v-text-field v-model="registerData.firstName" placeholder="First Name" outlined background-color="white" dense :rules="nameRules"></v-text-field>
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-0 pl-2">
                    <v-text-field v-model="registerData.lastName" placeholder="Last Name" outlined background-color="white" dense :rules="nameRules"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0">
                    <v-text-field v-model="registerData.email" placeholder="Email" outlined background-color="white" dense :rules="emailRules" validate-on-blur></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0">
                    <v-text-field v-model="registerData.password" placeholder="Password" outlined background-color="white" dense :rules="pwordRules" validate-on-blur type="password"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pt-0 pb-0">
                    <v-text-field v-model="registerData.passwordReEntered" placeholder=" Re-enter password" outlined background-color="white" dense :rules="pwordReEnteredRules" validate-on-blur type="password"></v-text-field>
                  </v-col>
                </v-row>
                <p class="text-h6 mb-0 pt-0 font-weight-light">Birthday</p>
                <v-row>
                  <v-col cols="4" class="pr-0 pt-1 pb-0">
                    <v-select v-model="registerData.monthOfBirth" :items="months" dense outlined solo flat menu-props="offset-y" :rules="bdayRules" label="Month">
                    </v-select>
                  </v-col>
                  <v-col cols="4" class="pl-0 pr-0 pt-1 pb-0">
                    <v-select v-model="registerData.dayOfBirth" :items="days" dense outlined solo flat menu-props="offset-y" :rules="bdayRules" label="Day">
                    </v-select>
                  </v-col>
                  <v-col cols="4" class="pl-0 pt-1 pb-0">
                    <v-select  v-model="registerData.yearOfBirth" :items="years" dense outlined solo flat menu-props="offset-y" :rules="bdayRules" label="Year">
                    </v-select>
                  </v-col>
                </v-row>
                <v-radio-group v-model="registerData.gender" row class="pt-0 mt-0">
                  <v-radio label="Female" value="female"></v-radio>
                  <v-radio label="Male" value="male"></v-radio>
                </v-radio-group>
                <v-btn class="text-h5 text-capitalize mt-2 font-weight-medium" color="accent" large @click="register">Create Account</v-btn>
              </v-form>
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
      logInData: {
        email: '',
        password: ''
      },
      registerData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordReEntered: '',
        monthOfBirth: "",
        dayOfBirth: null,
        yearOfBirth: null,
        gender: ''
      },
      passwordTypeLogin: 'password',
      iconLogin: 'mdi-eye',
      
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      nameRules: [v => v.length >= 1 || 'This field is mandatory'],
      emailRules: [v => {
        if(v.length == 0){
          return 'This field is mandatory'
        }else if (v.length >= 1 && v.search("@") == -1){
              return 'Your email adress should be similar to user@mail.com'
        }else{
          return true
        }
      }],
      pwordRules: [ v => {
        if(v.length == 0){
          return 'This field is mandatory'
        }else if(v.length < 4){
          return 'Password has to have at least 4 digits'
        }else{
          return true          }
      }],
      pwordReEnteredRules: [v => {
        if(v == this.registerData.password){
          return true
        }else if (v.length == 0){
          return "Re-enter the password"
        }else{
          return "Passwords not matching"
        }
      }],
      bdayRules: [v => {
        if (v == '' || v == null){
          return 'This field is mandatory'
        }else{
          return true
        }
      }]
    }
  },
  computed:{
    registerDataComputed () {
      return {
        firstName: this.registerData.firstName,
        lastName: this.registerData.lastName,
        email: this.registerData.email,
        password: this.registerData.password,
        birthday: this.registerData.monthOfBirth + ' ' + this.registerData.dayOfBirth + ' ' + this.registerData.yearOfBirth,
        gender: this.registerData.gender
      }
    },
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1920}, (value, index) => 1921 + index)
    },
    days () {
      const day = 32
      return Array.from({length: day - 1}, (value, index) => 1 + index)
    }
  },
  methods:{
    login(){
      axios.get('/backend/login', {
        params: this.logInData
      })
      .then(response => {
        sessionStorage.setItem('id', response.data._id);
        this.$emit('loggedInUserChanged', {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          photoName: response.data.photoName,
          id: response.data._id
        })
        this.$router.push({ name: 'home', params: { id: response.data._id } })
      })
      .catch(error => {
        console.log(error)
      })
    },
    register(){
      if(this.$refs.form.validate()){
        console.log('registed d c ----------------  ', this.registerDataComputed)
        axios.post('/backend/users', this.registerDataComputed)
        .then(response => {
          sessionStorage.setItem('id', response.data._id);
          this.$emit('loggedInUserChanged', {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            id: response.data._id
          })
          this.$router.push({ name: 'home', params: { isNewUser: true } })
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    togglePasswordVisibility(){
      if(this.passwordTypeLogin == "password"){
        this.passwordTypeLogin = "text"
        this.iconLogin = 'mdi-eye-off'
      }else{
        this.passwordTypeLogin = "password"
        this.iconLogin = 'mdi-eye'
      }
    }
  }
}
</script>

<style scoped>
  input:-internal-autofill-selected{
    background-color: white !important;
  }
</style>