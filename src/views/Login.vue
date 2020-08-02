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
                        <v-col cols="7">
                            <v-row>
                                <v-col class="text-h3">
                                    Connect with friends and world around you on Facebook.
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-icon size="100">mdi-newspaper-variant</v-icon> See photos and updates.
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    Share what's new.
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    Find more.
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="5">
                            <p>Sign up</p>            
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