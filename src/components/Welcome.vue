<template>
  <div>
    <v-dialog v-model="showDialog" max-width="800">
      <v-card>
        <v-card-title class="headline primary--text">
          Hello, {{loggedInUser.firstName}}!
        </v-card-title>
        <v-card-text>
          Wellcome to Fakebook! That's right - like Facebok but not quite. One of bigger differencies is <span class="text-uppercase">no adding friends</span> at this app, every Fakebook user is already your friend! 
          Thank you for registering and lots of fun!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" text @click="closeWelcomeDialog()">
            Start exploring
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['loggedInUser'],
  data: function () {
    return {
      showDialog: true
    }
  },
  methods:{
    closeWelcomeDialog(){
      this.showDialog = false
      this.$confetti.remove();
    }
  },
  created: function() {
    this.$confetti.start()
  }

}
</script>