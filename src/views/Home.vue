<template>
    <div>
        <p>Home page</p>
        <v-btn :to= "{ name: 'profile', params: { id: this.$route.params.id }}">Go To Profile</v-btn>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>