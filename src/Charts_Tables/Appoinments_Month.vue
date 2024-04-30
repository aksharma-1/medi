<template>
    <div id="chart" class="bg-white p-3">
      <apexchart type="line" height="350" width="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        series: [{
          name: "Desktops",
          data: [25, 14, 55, 5, 50, 40, 100, 91, 148],
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            colors:['#fb6f92']
          },
          title: {
            text: 'Appointments Month by Month',
            align: 'left',
            style:{
                color: '#fb6f92',
                fontSize:'25px',
                fontWeight:'100'
            }
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          }
        },
      };
    },
  };
  </script>
  

  