import React from 'react'
import Chart from "react-apexcharts";

const LandCoverPiChart = ({SelectedFeaturesStatsData}) => {
  return (
    <Chart
      options={{
        labels: [
          'Tree cover', 'Shrubland', 'Grassland', 'Cropland', 'Built-up',
          'Bare/sparse vegetation', 'Snow and ice', 'Permanent water bodies',
          'Herbaceous wetland', 'Mangroves', 'Moss and lichen'
        ],
        chart: {
            // width: 380,
            type: 'pie',
          },
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        colors: [
          '#006400', '#FFBB23', '#FFFF4C', '#F096FF', '#FA0100', '#B4B4B4',
          '#F0F0F0', '#0064C8', '#0096A0', '#04CF75', '#FAE69F'
        ],
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return `${val} ha`;
          }
        },
        tooltip: {
            enabled: true,
            y: {
              formatter: function (val, opts) {
                return `${val} ha`;
              }
            }
        }
      }}
      series={[SelectedFeaturesStatsData.Trees,
        SelectedFeaturesStatsData.Shrubland,
        SelectedFeaturesStatsData.Grassland,
        SelectedFeaturesStatsData.Cropland,
        SelectedFeaturesStatsData.Builtup,
        SelectedFeaturesStatsData.Bare_Sparse_vegetation,
        SelectedFeaturesStatsData.Snow_and_ice,
        SelectedFeaturesStatsData.Permanent_water_bodies,
        SelectedFeaturesStatsData.Herbaceous_wetland,
        SelectedFeaturesStatsData.Moss_and_lichen,]}
      type="pie"
      width="100%"
    //   height="100%"
    />
  )
}

export default LandCoverPiChart