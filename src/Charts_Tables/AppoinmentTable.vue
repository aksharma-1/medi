<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="400">
      <v-card>
        <v-card-title class="text-h5">
          Please provide confirmation!
          <button class="ms-5" @click="dialog = false">
            <v-icon size="24">mdi-close</v-icon>
          </button>
        </v-card-title>
        <v-card-text
          >Are you sure to change the status of
          {{ selectedAppointment.patientName }} from pending to
          complete</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="handleCancel">
            Cancel appoinment
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="handleComplete">
            Completed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <div class="bg-white p-3">
    <h3 style="color: #fb6f92" class="fw-normal">Appointments</h3>
    <hr />
    <v-table>
      <thead>
        <tr>
          <th class="text-left">S.No.</th>
          <th class="text-left">Patient Name</th>
          <th class="text-left">Doctor</th>
          <th class="text-left">Check-Up</th>
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
          <td>{{ item.doctor }}</td>
          <td>{{ item.checkUp }}</td>
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
              @click="openDialog(item, index)"
              >{{ item.status }}</span
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
  
<script>
import axios from "axios";
import fetchData from "../fetching.js";

export default {
  name: "Appoinment-table",
  data() {
    return {
      dialog: false,
      selectedAppointment: {},
      patientIndex: "",
      desserts: [],
    };
  },
  methods: {
    openDialog(appointment, index) {
      if (appointment.status === "Pending") {
        this.selectedAppointment = appointment;
        this.patientIndex = index;
        this.dialog = true;
      }
    },
    formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    // update the status to completed
    handleComplete() {
      this.dialog = false;
      axios
        .put(
          `${process.env.VUE_APP_API_URL}/Appoinments/${
            this.desserts[this.patientIndex]._id
          }`,
          {
            status: "Completed",
          }
        )
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });

      this.desserts[this.patientIndex].status = "Completed";
    },
    // update the status to cancelled
    handleCancel() {
      this.dialog = false;
      axios
        .put(
          `${process.env.VUE_APP_API_URL}/Appoinments/${
            this.desserts[this.patientIndex]._id
          }`,
          {
            status: "Cancelled",
          }
        )
        .then((respone) => {
          console.log(respone);
        })
        .catch((error) => {
          console.log(error);
        });
      this.desserts[this.patientIndex].status = "Cancelled";
    },
    // fetching appointments from the database
  },
  beforeMount() {
    fetchData().then((data) => {
      const today = new Date();
      data.map((item) => {
        if (item.date === this.formatDate(today) || item.status === 'Pending'){
          this.desserts.push(item)
        }
      });
    });
  },
};
</script>
  
  <style>
</style>