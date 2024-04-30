<template>
  <v-container class="text-center">
    <div class="bg-success-subtle p-4">
      <h2>
        Welcome Dr. {{ doctorInfo.firstName + " " + doctorInfo.lastName }}
      </h2>
      <h2>to Medico Hospitalization.</h2>
    </div>

    <v-btn class="bg-danger-subtle mt-5 m-4" @click="handleLogout"
      >Logout</v-btn
    >
    <v-btn class="bg-warning-subtle mt-5 m-4" @click="handleLeave"
      >On Leave</v-btn
    >
  </v-container>

  <div class="container-fluid bg-light">
    <div class="row">
      <div class="p-3">
        <h3 style="color: #fb6f92" class="fw-normal">Today's Appointments</h3>
        <hr />
        <v-table>
          <thead>
            <tr>
              <th class="text-left">S.No.</th>
              <th class="text-left">Patient Name</th>
              <th class="text-left">Date</th>
              <th class="text-left">Time</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in desserts"
              :key="item.firstName"
              :class="{ 'bg-light': index % 2 === 0 }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.firstName }} {{ item.lastName }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.time }}</td>
              <td class="text-white">
                <span
                  class="p-1 rounded"
                  :class="{
                    'bg-success': item.status === 'Completed',
                    'bg-warning': item.status === 'Pending',
                    'bg-danger': item.status === 'Cancelled',
                  }"
                  >{{ item.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import AppoinmentTable from "@/Charts_Tables/AppoinmentTable.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import socket from "../socket";
export default {
  name: "Doctor-page",
  components: {
    AppoinmentTable,
  },
  data() {
    return {
      router: useRouter(),
      doctorInfo: {},
      desserts: [],
    };
  },
  created() {
    this.socket = socket;
  },
  methods: {
    async handleLogout() {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API_URL}/Doctors/signup/${this.doctorInfo._id}`,
          {
            availability: "Not Available",
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      localStorage.removeItem("doctorToken");
      localStorage.removeItem("doctorInfo");
      this.router.push("/");
    },
    async handleLeave() {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API_URL}/Doctors/signup/${this.doctorInfo._id}`,
          {
            availability: "On Leave",
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      localStorage.removeItem("doctorToken");
      localStorage.removeItem("doctorInfo");
      this.router.push("/");
    },
    async fetchAppointments(){
        const doctorName = `Dr. ${this.doctorInfo.firstName} ${this.doctorInfo.lastName}`;
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/Appoinments/today`);
            this.desserts = response.data.filter((item)=>item.doctor === doctorName);
        } catch (error) {
            console.log(error)
        }
    }
  },
  beforeMount() {
      const doctorToken = localStorage.getItem("doctorToken");
      const storeData = localStorage.getItem("doctorInfo");
      this.doctorInfo = JSON.parse(storeData);

      this.fetchAppointments();
    if (!doctorToken) {
      this.router.push("/");
    }
  },
  mounted() {
    this.socket.on("todayAppointments", (appoinments) => {
      this.desserts = appoinments.filter((item)=> item.doctor === `Dr. ${this.doctorInfo.firstName} ${this.doctorInfo.lastName}`);
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style>
</style>