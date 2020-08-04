<template>
    <div>
        <!-- header -->
        <v-container fluid class="primary">
            <v-row>
                <v-container>
                    <v-row>
                        <v-col cols="7" class="text-h1 white--text font-weight-black pt-12">
                            fakebook
                        </v-col>
                        <v-spacer></v-spacer>
                         <v-col cols="auto" class="pt-12">
                             <v-row align="end">
                                 <v-col>
                                    <p class="text-h6 white--text">Email or Phone</p>
                                    <v-text-field class="pt-0 mt-0" background-color="white" hide-details></v-text-field>
                                 </v-col>
                                 <v-col>
                                    <p class="text-h6 white--text">Password</p>
                                    <v-text-field class="pt-0 mt-0" background-color="white" hide-details type="password"></v-text-field>
                                 </v-col>
                                 <v-col cols="auto">
                                    <v-btn class="text-h6 white--text text-capitalize" color="#5872A6">Log In</v-btn>
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
                          <p>Sign Up</p> 
                          <p>It's free and always will be.</p>
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
                          <p>Birthday</p>
                          <v-row>
                            <v-col>
                              <v-select>
                                
                              </v-select>
                            </v-col>
                          </v-row>
                          
                          
                        </v-col>
                    </v-row>
                </v-container>
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