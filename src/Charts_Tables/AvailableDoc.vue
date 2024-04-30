<template>
  <div class="bg-white p-3">
    <h3 style="color: #fb6f92;" class="fw-normal">Doctors Availability</h3>
    <hr />
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Doctor</th>
          <th class="text-left">Speciality</th>
          <th class="text-left">Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.firstName }} {{ item.lastName }}</td>
          <td>{{ item.specialist }}</td>
          <td>
            <span class="p-1 text-white rounded"
              :class="{'bg-success': item.availability === 'Available','bg-warning': item.availability === 'On Leave','bg-danger': item.availability === 'Not Available',
              }" 
            >{{ item.availability }}</span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios';
import socket from '../socket';

export default {
  name: "Available-doc",
  data() {
    return {
      desserts: [],
    };
  },
  created() {
    this.socket = socket;
  },
  methods:{
    fetchDoctors : async()=>{
      try{
        const Doctors = await axios.get(`${process.env.VUE_APP_API_URL}/Doctors/signup`);
        return Doctors.data;
      }catch(error){
        console.log(error);
        return [];
      }
    }
  },
  beforeMount(){
    this.fetchDoctors().then((data)=>{
      this.desserts = data;
    });
  },
  mounted() {
    this.socket.on('doctorsUpdated', (doctors) => {
      this.desserts = doctors;
    });
  },
  beforeDestroy() {
    // Clean up resources (e.g., close Socket.IO connection)
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style>
</style>