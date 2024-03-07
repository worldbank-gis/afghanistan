import React, { useState } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import { MonthsArray, SelectedFeaturesAverageStats, YearsArray, fillDensityColor, getAnnualDataFromMonthly, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import Plot from 'react-plotly.js';
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import MapLegend from '../components/MapLegend';
import tiff_raster from "../assets/raster_data/clipped_chirps-v2.0.2023.tif"
import RasterMap from '../components/RasterMap';
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';
import FiltererdJsonFeature from './FiltererdJsonFeature';
import DistrictStats from "../assets/data/District_Stats.json"

const PrecipitationPage = () => {
  const { filteredFeaturesItems, selectedView, selectedFeatureName } = useSelectedFeatureContext();
  const SelectedFeaturesStatsData = SelectedFeaturesAverageStats(filteredFeaturesItems)


  const [selectedDataType, setSelectedDataType] = useState('PCP');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedRaster, setSelectedRaster] = useState('');
  const [selectedTime, setSelectedTime] = useState(5);



  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];

  function DistrictOnEachfeature(feature, layer) {
    layer.on("mouseover", function (e) {
      const DataItem = DistrictStats.find(
        (item) => item.DISTRICT === feature.properties.NAME
      );
      const popupContent = `
            <div>
              District: ${feature.properties.NAME}<br/>
              ${selectedDataType === 'PCP' ? 'Precipitation' : selectedDataType === 'AETI' ? 'Evapotranspiration' : selectedDataType === 'RET' ? 'Potential ET' : selectedDataType === 'AridityIndex' ? 'Aridity Index' : null}  ${selectedDataType === 'AridityIndex' ? '' : `(${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`}: ${intervalType ==='Monthly' ? DataItem[selectedDataType][selectedTime]:getAnnualDataFromMonthly(DataItem[selectedDataType])[selectedTime]}
        <br/>
            </div>
          `;
      layer.bindTooltip(popupContent, { sticky: true });
      layer.openTooltip();
    });

    layer.on("mouseout", function () {
      layer.closeTooltip();
    });
  }

  const DistrictStyle = (feature) => {
    if (selectedTime !=="") {
      const getDensityFromData = (name) => {
        const DataItem = DistrictStats.find((item) => item.DISTRICT === name);
        return DataItem && intervalType ==='Monthly' ? DataItem[selectedDataType][selectedTime]:getAnnualDataFromMonthly(DataItem[selectedDataType])[selectedTime]
      };
      const density = getDensityFromData(feature.properties.NAME);
      return {
        fillColor: ColorLegendsDataItem ? fillDensityColor(ColorLegendsDataItem, density) : "none",
        // fillColor: selectedTime !== '' ? Annual_Density(density) : "none",
        weight: 1,
        opacity: 1,
        color: "black",
        dashArray: "2",
        fillOpacity: 1,
      };
    }
  };

  const handleSelectedDataChange = (e) => {
    setSelectedDataType(e.target.value);
  };

  const handleIntervalTypeChange = (e) => {
    setIntervalType(e.target.value);
    setSelectedTime('')
  };

  const handleRasterSelectionChange = (e) => {
    setSelectedRaster(e.target.value);
  };


  const TableAnnualData = {
    Year: YearsArray,
    Yearly_AETI: getAnnualDataFromMonthly(SelectedFeaturesStatsData.AETI),
    Yearly_PCP: getAnnualDataFromMonthly(SelectedFeaturesStatsData.PCP),
    Yearly_RET: getAnnualDataFromMonthly(SelectedFeaturesStatsData.RET),
    Yearly_ETB: SelectedFeaturesStatsData.ETB,
    Yearly_ETG: SelectedFeaturesStatsData.ETG,
  }





  // const ChartColors = aridityIndex.map(value => {
  //   if (value >= 1) {
  //     return "#F8DE22";
  //   } else if (value >= 0.6) {
  //     return "#F94C10";
  //   } else if (value >= 0.3) {
  //     return "#C70039";
  //   } else {
  //     return "#900C3F";
  //   }
  // });




  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>

        <div className='left_panel_equal'>


      
          <div className='card_container'>
            <div className='defination_container'>
              <h4>Precipitation</h4>
              <p>
                Precipitation is key water source in the hydrological cycle. It refers to all forms of condensation of atmospheric water vapor that falls from clouds. The main forms of precipitation include drizzling, rain, sleet, snow, ice pellets, graupel and hail. In the river basins, where there is no other inflow (e.g. through surface or subsurface flow), the total precipitation accounts for the entire total gross inflow, in the water accounting terms, in any given time
              </p>
            </div>
          </div>






          <div className='card_container'>

            <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.PCP,
                  type: 'bar',
                  name: "Precipitation (mm/year)",
                  yaxis: 'y1',
                },
                {
                  x: MonthsArray,
                  // y: SelectedFeaturesStatsData.RET,
                  y: SelectedFeaturesStatsData.RET.map(value => value /10),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: "Potential ET (mm/year)",
                  marker: { color: 'red' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                xaxis: {
                  title: 'Year',
                },
                yaxis: {
                  title: "Precipitation (mm/year)",
                  side: 'left',
                  showgrid: false,
                },
                yaxis2: {
                  title: "Potential ET (mm/year)",
                  side: 'right',
                  overlaying: 'y',
                  showgrid: false,
                },
                legend: {
                  orientation: 'h',
                  x: 0,
                  y: 1.2,
                },
              }}
              style={{ width: "100%", height: "100%" }}
            />

          </div>

          <div className='card_container'>
            {/* <div className='defination_container'>
              <h4>Aridity Index</h4>
            </div> */}

            <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.AridityIndex,
                  type: 'bar',
                  // marker: {
                  //   color: ChartColors,
                  // },
                },
              ]}
              layout={{
                xaxis: {
                  title: 'Year',
                },
                yaxis: {
                  title: "Aridity Index"
                },
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className='card_container'>
            <div className='defination_container'>
              {/* <h4>Land Cover class area by district (ha)</h4> */}
            </div>
            <div className='item_table_container'>
              <table className='item_table'>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Evapotranspiration (mm/year)</th>
                    <th>Precipitation (mm/year)</th>
                    <th>PCP - ET (mm/year)</th>
                    <th>Potential ET (mm/year)</th>
                    <th>Aridity Index</th>
                    <th>ET Blue (mm/year)</th>
                    <th>ET Green (mm/year)</th>
                  </tr>
                </thead>
                <tbody>
                  {TableAnnualData.Year.map((year, index) => (
                    <tr key={index}>
                      <td>{year}</td>
                      <td>{TableAnnualData.Yearly_AETI[index]}</td>
                      <td>{TableAnnualData.Yearly_PCP[index]}</td>
                      <td className={TableAnnualData.Yearly_PCP[index] - TableAnnualData.Yearly_AETI[index] < 0 ? 'red-text' : ''}>
                        {(TableAnnualData.Yearly_PCP[index] - TableAnnualData.Yearly_AETI[index]).toFixed(1)}
                      </td>
                      <td>{(TableAnnualData.Yearly_RET[index]/10).toFixed(2)}</td>
                      <td>{(TableAnnualData.Yearly_PCP[index] / (TableAnnualData.Yearly_RET[index]/10)).toFixed(2)}</td>
                      <td>{TableAnnualData.Yearly_ETB[index].toFixed(1)}</td>
                      <td>{TableAnnualData.Yearly_ETG[index].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>


        </div>

        <div className='right_panel_equal' >
          <div className='card_container' style={{ height: "100%" }}>
            <MapContainer
              fullscreenControl={true}
              center={[34, 67]}
              style={{ width: '100%', height: "100%", backgroundColor: 'white', border: 'none', margin: 'auto' }}
              zoom={setInitialMapZoom()}
              maxBounds={[[23, 49], [41, 82]]}
              // maxZoom={8}
              minZoom={setInitialMapZoom()}
              keyboard={false}
              dragging={setDragging()}
              // attributionControl={false}
              // scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <div className='map_options_container'>
            <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
              <option value="PCP">Precipitation</option>
              <option value="RET">Potential ET</option>
              <option value="AridityIndex">Average Aridity Index</option>
            </select>

            <select className='m-1' value={intervalType} onChange={handleIntervalTypeChange}>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>


            <select className='m-1' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              {renderTimeOptions(intervalType)}
            </select>

            <select className='m-1' value={selectedRaster} onChange={handleRasterSelectionChange}>
              <option value="">Select Raster Map</option>
              <option value="pcp_annual_2023">Annual PCP 2023</option>
              {/* <option value="Yearly">Yearly</option> */}
            </select>


          </div>

              {selectedRaster === 'pcp_annual_2023' ? (
                <>
                  <RasterMap
                    colorPalatte="viridis"
                    maxValue={1000}
                    minValue={1}
                    url={tiff_raster}
                    popopContent="PCP Value"
                  />
                  <MapLegend ColorLegendsDataItem={
                    {
                      Title: "Annual Precipitation 2023",
                      Unit: "(mm)",
                      Value: [1, 200, 400, 700, 1000],
                      Colors: ["#fde725", "#5ec962", "#21918c", "#3b528b", "#440154"],
                      MaxValue: "1002",
                      MinValue: "36",
                    }
                  } />
                </>

              ) : (
                <>
                  {selectedDataType && selectedTime !== '' && intervalType ? (
                    <>
                      {ColorLegendsDataItem && (
                        <MapLegend ColorLegendsDataItem={ColorLegendsDataItem} />
                      )}
                      <GeoJSON
                        key={selectedDataType + selectedTime + intervalType}
                        style={DistrictStyle}
                        data={AFG_districts.features}
                        onEachFeature={DistrictOnEachfeature}
                      />

                    </>

                  ) : (
                    <GeoJSON
                      style={{
                        fillColor: 'black',
                        weight: 2,
                        color: 'black',
                        fillOpacity: "0.001",
                        interactive: false
                      }}
                      data={AfghanistanCountry.features}
                    />
                  )}
                </>

              )}

              <FiltererdJsonFeature />




              <BaseMap />

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrecipitationPage