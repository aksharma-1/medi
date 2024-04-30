<template>
  <v-container fluid class="">
    <v-row>
      <v-col col-12 lg="4">
        <v-card class="vcards p-2" style="color: #fb6f92">
          <div class="d-flex align-items-center">
            <div>
              <v-card-title>
                <v-icon size="80">mdi-account-circle-outline</v-icon>
              </v-card-title>
            </div>

            <div>
              <v-card-item class="m-0">Patients</v-card-item>
              <v-card-title class="fs-2 m-0">{{
                TotalPatients.length
              }}</v-card-title>
              <v-card-subtitle
                ><v-icon>mdi-chevron-up </v-icon>+20% Increased</v-card-subtitle
              >
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col col-12 lg="4">
        <v-card class="vcards p-2" style="color: #3c6e71">
          <div class="d-flex align-items-center">
            <div>
              <v-card-title>
                <v-icon size="80">mdi-poll</v-icon>
              </v-card-title>
            </div>

            <div>
              <v-card-item class="m-0">Appointments</v-card-item>
              <router-link to="/admin/appointment-list" style="text-decoration: none; color: #3c6e71;">
                <v-card-title class="fs-2 m-0">{{
                  TotalAppoinments
                }}</v-card-title>
              </router-link>
              <v-card-subtitle
                ><v-icon>mdi-chevron-down </v-icon>-15%
                Decreased</v-card-subtitle
              >
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col col-12 lg="4">
        <v-card class="vcards p-2" style="color: #f77f00">
          <div class="d-flex align-items-center">
            <div>
              <v-card-title>
                <v-icon size="80">mdi-currency-rupee </v-icon>
              </v-card-title>
            </div>

            <div>
              <v-card-item class="m-0">Total Revenue</v-card-item>
              <v-card-title class="fs-2 m-0">{{ TotalRevenue }}</v-card-title>
              <v-card-subtitle
                ><v-icon>mdi-chevron-up </v-icon>+10% Increased</v-card-subtitle
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <div class="container-fluid mt-2 mb-2">
    <div class="row">
      <div class="col-12 col-lg-6 mt-1 mb-1"><Appoinments /></div>
      <div class="col-12 col-lg-6 mt-1 mb-1"><Patient /></div>
    </div>
  </div>

  <div class="container-fluid ms-3 mt-5 mb-5">
    <div class="row me-3">
      <AppoinmentTable />
    </div>
  </div>

  <div class="container-fluid mt-4 mb-2">
    <div class="row">
      <div class="col-12 col-lg-6 mt-1 mb-1"><Status /></div>
      <div class="col-12 col-lg-6 mt-1 mb-1"><ActiveDoc /></div>
    </div>
  </div>
</template>
  
<script>
import Appoinments from "../Charts_Tables/Appoinments_Month.vue";
import Patient from "../Charts_Tables/Patients_Month.vue";
import Status from "../Charts_Tables/Appoinment_status.vue";
import ActiveDoc from "../Charts_Tables/AvailableDoc.vue";
import AppoinmentTable from "../Charts_Tables/AppoinmentTable.vue";
import fetchData from "../fetching.js";
import { useRouter } from "vue-router";

export default {
  name: "Dashboard-",
  components: {
    Appoinments,
    Patient,
    Status,
    ActiveDoc,
    AppoinmentTable,
  },
  data() {
    return {
      TotalPatients: [],
      TotalAppoinments: null,
      TotalRevenue: 0,
      router: useRouter(),
    };
  },
  methods: {
    viewAppoinments() {
      this.router.push("/admin/appointment-list");
      console.log("appointments");
    },
  },
  beforeMount() {
    fetchData().then((data) => {
      this.TotalAppoinments = data.length;

      data.forEach((item) => {
        if (item.status === "Completed") {
          this.TotalRevenue = this.TotalRevenue + item.payment;
          this.TotalPatients.push(item);
        }
      });
    });
  },
};
</script>
  
<style  scoped>
</style>
