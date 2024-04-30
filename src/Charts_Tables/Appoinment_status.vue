<template>
  <div id="chart" class="bg-white p-3">
    <h3 style="color: #fb6f92; font-weight: 400">Appoinments Status</h3>
    <hr />
    <apexchart
      type="donut"
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
  
<script>
import VueApexCharts from "vue3-apexcharts";
import fetchData from '../fetching.js';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      Cancelled: [],
      Completed: [],
      Pending: [],
      series: [0 , 0 , 0],
      chartOptions: {
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels: ["Cancelled", "Completed", "Pending"],
        colors: ["#DC3545", "#4CAF50", "#FB8C00"],
      },
    };
  },
  beforeMount() {
    fetchData().then((data) => {
      data.forEach((item) => {
        if (item.status === "Pending") {
          this.Pending.push(item.status);
        }
        if (item.status === "Completed") {
          this.Completed.push(item.status);
        }
        if (item.status === "Cancelled") {
          this.Cancelled.push(item.status);
        }
      });

      this.series = [this.Cancelled.length, this.Completed.length, this.Pending.length]
    });
  },
};
</script>
  

  