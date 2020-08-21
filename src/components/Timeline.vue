<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="pa-0">
                    <v-textarea v-model="status" placeholder="What is on your mind?" solo flat hide-details rows="1"></v-textarea>
                </v-col>
            </v-row>
            <v-row class="white" justify="end">
                <v-col cols="auto">
                    <v-btn color="primary">Post</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row class="white">
                <v-col cols="12">
                    {{status}}
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
export default {
    
}
</script>

<style scooped>

</style>