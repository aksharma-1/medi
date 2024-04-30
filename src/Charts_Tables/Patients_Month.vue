<template>
    <div id="chart" class="bg-white p-3">
        <apexchart type="bar" height="350" width="100%" :options="chartOptions" :series="series"></apexchart>
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
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              style:{
                color: '#f77f00'
              }
            },
            title: {
              text: 'Patients Month by Month',
              align: 'left',
              style: {
                color: '#f77f00',
                fontSize:'25px',
                fontWeight:'100',
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
                colors: {
        ranges: [{
          from: 0,
          to: 100,
          color: '#f77f00', // Specify your desired color here
        }],
        backgroundBarColors: ['#fff'], // Specify your desired background color here
        backgroundBarOpacity: 1,
      },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#f77f00"],
              }
            },
            
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#f77f00',
                    colorTo: '#f77f00',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
          },
      };
    },
  };
  </script>
  
  <style>
  </style>
  