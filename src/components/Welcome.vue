<template>
    <div>
         <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline primary--text">
         Welcome, {{firstName}}!
        </v-card-title>

        <v-card-text>
         Thank you for registering and lots of fun exploring Fakebook!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="primary"
            text
            @click="closeDialog()"
          >
            Start the fun
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
           
        }
    },
    props: ['dialog', 'firstName'],
    methods:{
      closeDialog(){
        this.$emit('closeDialog', {dialog: false})
        this.$confetti.remove();
      }
    }
}
</script>