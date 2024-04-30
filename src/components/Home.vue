<template>
    <v-container class="d-flex justify-content-around">
        <v-btn @click="admin=true">Admin</v-btn>
        <v-btn @click="admin=false">Doctor</v-btn>
    </v-container>
    <div v-if="admin">
        <LoginAdmin/>
    </div>
    <div v-else>
        <LoginDoctor/>
    </div>
  
</template>

<script>
import LoginDoctor from './LoginDoctor.vue';
import LoginAdmin from './LoginAdmin.vue';

export default {
    components:{
        LoginAdmin, LoginDoctor
    },
    data(){
        return{
            admin: true,
        }
    },
    methods:{
        toggleForm:()=>{
            admin = !admin;
        }
    }
}
</script>

<style>

</style>