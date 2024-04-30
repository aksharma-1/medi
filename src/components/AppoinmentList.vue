<template>
  <div class="d-flex align-items-center justify-content-evenly mt-3 mb-5">
      <div class="w-50">

        <VueDatePicker
          :format="formatDate"
          v-model="date"
          :enable-time-picker="false"
          auto-apply
          :disabled-week-days="[0]"
          :min-date="new Date('2024-01-05')"
          placeholder="Select Date"
        />
      </div>
        
   
    <v-btn class="bg-success-subtle" @click="handleShow">Show Appointments</v-btn>
  </div>
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
              >{{ item.status }}</span
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import fetchData from "../fetching.js";

const date = ref();

// formating date
const formatDate = (date) => {
  if (date instanceof Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return "";
};


const desserts = ref([]);

const handleShow = async () => {
  const selectedDate = formatDate(date.value);

  if(selectedDate){
    try{
      const data = await fetchData();

      desserts.value = data.filter((item) => item.date === selectedDate);
    } catch(error){
      console.log(error);
    }

  }else{
    alert("Please select date");
  }
};
</script>

<style>
</style>