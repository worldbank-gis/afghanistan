import React from 'react'
import Plot from 'react-plotly.js'

const PlotlyLandCoverPiChart = ({SelectedFeaturesStatsData}) => {
  return (
    <Plot
    data={[
      {
        labels: ['Tree cover', 'Shrubland', 'Grassland', 'Cropland', 'Built-up', 'Bare/sparse vegetation', 'Snow and ice', 'Permanent water bodies', 'Herbaceous wetland', 'Mangroves', 'Moss and lichen'],
        values: [SelectedFeaturesStatsData.Trees, SelectedFeaturesStatsData.Shrubland,SelectedFeaturesStatsData.Grassland,SelectedFeaturesStatsData.Cropland,SelectedFeaturesStatsData.Builtup,SelectedFeaturesStatsData.Bare_Sparse_vegetation,SelectedFeaturesStatsData.Snow_and_ice,SelectedFeaturesStatsData.Permanent_water_bodies,SelectedFeaturesStatsData.Herbaceous_wetland,SelectedFeaturesStatsData.Moss_and_lichen,],

        type: 'pie',
        marker: {
          colors: ['#006400', '#FFBB23', '#FFFF4C', '#F096FF', '#FA0100', '#B4B4B4', '#F0F0F0', '#0064C8', '#0096A0', '#04CF75', '#FAE69F',],
        },
        hoverinfo: 'label+percent+text',
        textinfo: 'label+text',
        text: [
          `${SelectedFeaturesStatsData.Trees} ha`,
          `${SelectedFeaturesStatsData.Shrubland} ha`,
          `${SelectedFeaturesStatsData.Grassland} ha`,
          `${SelectedFeaturesStatsData.Cropland} ha`,
          `${SelectedFeaturesStatsData.Builtup} ha`,
          `${SelectedFeaturesStatsData.Bare_Sparse_vegetation} ha`,
          `${SelectedFeaturesStatsData.Snow_and_ice} ha`,
          `${SelectedFeaturesStatsData.Permanent_water_bodies} ha`,
          `${SelectedFeaturesStatsData.Herbaceous_wetland} ha`,
          `${SelectedFeaturesStatsData.Moss_and_lichen} ha`,
        ],
        
      },
    ]}
    layout={{
      margin: {
        l: 100, 
        t: 100, 
        b: 100, 
        r: 100, 
      },
    }}

    style={{ width: "100%", height: "100%" }}
  />
  )
}

export default PlotlyLandCoverPiChart