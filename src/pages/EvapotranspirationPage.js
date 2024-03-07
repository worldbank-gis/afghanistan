import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import { MonthsArray, SelectedFeaturesAverageStats, YearsArray, calculateAverageOfArray, calculateSumOfArray, fillDensityColor, getAnnualDataFromMonthly, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import Plot from 'react-plotly.js';
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import MapLegend from '../components/MapLegend';
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';
import FiltererdJsonFeature from './FiltererdJsonFeature';
import HorizontalBarChart from '../components/charts/TotalConsumptionChart';
import UnitConsumptionChart from '../components/charts/UnitConsumptionChart';
import TotalConsumptionChart from '../components/react-plotly-charts/PlotlyTotalConsumptionChart';
import DistrictStats from "../assets/data/District_Stats.json"


const EvapotranspirationPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('AETI');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedTime, setSelectedTime] = useState(5);
  const { filteredFeaturesItems, selectedView, selectedFeatureName } = useSelectedFeatureContext();
  const SelectedFeaturesStatsData = SelectedFeaturesAverageStats(filteredFeaturesItems)


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
    if (selectedTime  && selectedDataType) {
      const getDensityFromData = (name) => {
        const DataItem = DistrictStats.find((item) => item.DISTRICT === name);
        return DataItem && intervalType ==='Monthly' ? DataItem[selectedDataType][selectedTime]:getAnnualDataFromMonthly(DataItem[selectedDataType])[selectedTime]
      };
      const density = getDensityFromData(feature.properties.NAME);

      return {
        // fillColor: selectedDensityFunc(density),
        fillColor: ColorLegendsDataItem ? fillDensityColor(ColorLegendsDataItem, density) : "none",
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


  const sortedTotalConsumptionItems = filteredFeaturesItems.sort((a, b) => {
    const aX = (calculateAverageOfArray(getAnnualDataFromMonthly(a.AETI)) * 0.001 * a.AREA) / 1000000000;
    const bX = (calculateAverageOfArray(getAnnualDataFromMonthly(b.AETI)) * 0.001 * b.AREA) / 1000000000;
    return bX - aX;
  });





  const TableAnnualData = {
    Year: YearsArray,
    Yearly_AETI: getAnnualDataFromMonthly(SelectedFeaturesStatsData.AETI),
    Yearly_PCP: getAnnualDataFromMonthly(SelectedFeaturesStatsData.PCP),
    Yearly_RET: getAnnualDataFromMonthly(SelectedFeaturesStatsData.RET),
    Yearly_ETB: SelectedFeaturesStatsData.ETB,
    Yearly_ETG: SelectedFeaturesStatsData.ETG,
  }




  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>


          <div className='card_container'>
            <div className='defination_container'>
              <h4>Evapotranspiration (ET)</h4>
              <p>
                Evapotranspiration is a key component of the hydrological cycle. It refers to the water that is lost to the atmosphere through the vaporization process. Water that becomes evapotranspired is no longer available for further use, hence it is commonly referred to as consumed water in the water accounting terminology.
              </p>
            </div>
            {/* <div className='defination_container'>
              <h4>Potential ET (PET)</h4>
              <p>
              Potential evapotranspiration, or PET, represents the combined loss of water through:  1) the plant’s process of transpiration via its vascular system, and 2) evaporation of water from the earth’s surface.  Both are influenced by temperature, humidity, sunlight, and wind.  PET values indicate the amount of water that has been lost, and thus needs to be replaced, through irrigation and/or rainfall.
            </p>
            </div> */}
          </div>

          <div className='card_container'>

            <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.AETI,
                  fill: 'tozeroy',
                  type: 'scatter',
                  name: "Evapotranspiration (mm/month)",
                  yaxis: 'y1',
                },
                {
                  x: MonthsArray,
                  // y: SelectedFeaturesStatsData.RET,
                  y: SelectedFeaturesStatsData.RET.map(value => value / 10),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: "Potential ET (mm/month)",
                  marker: { color: 'red' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                xaxis: {
                  title: 'Year',
                },
                yaxis: {
                  title: "Evapotranspiration (mm/month)",
                  side: 'left',
                  showgrid: false,
                },
                yaxis2: {
                  title: "Potential ET (mm/month)",
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

              style={{ width: "100%", height: "100%)" }}
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
                    <th>Total Evapotranspiration (BCM/year)</th>
                    <th>ET Blue (BCM/year)</th>
                    <th>ET Green (BCM/year)</th>
                    <th>Precipitation (PCP) (BCM/year)</th>
                    <th>PCP - ET (BCM/year)</th>
                    <th>Portion of PCP locally consumed (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {TableAnnualData.Year.map((year, index) => (
                    <tr key={index}>
                      <td>{year}</td>
                      <td>{(TableAnnualData.Yearly_AETI[index] * 0.001 * SelectedFeaturesStatsData.AREA / 1000000000).toFixed(1)}</td>
                      <td>{(TableAnnualData.Yearly_ETB[index] * 0.001 * SelectedFeaturesStatsData.AREA / 1000000000).toFixed(1)}</td>
                      <td>{(TableAnnualData.Yearly_ETG[index] * 0.001 * SelectedFeaturesStatsData.AREA / 1000000000).toFixed(1)}</td>
                      <td>{(TableAnnualData.Yearly_PCP[index] * 0.001 * SelectedFeaturesStatsData.AREA / 1000000000).toFixed(1)}</td>
                      <td className={TableAnnualData.Yearly_PCP[index] - TableAnnualData.Yearly_AETI[index] < 0 ? 'red-text' : ''}>
                        {((TableAnnualData.Yearly_PCP[index] - TableAnnualData.Yearly_AETI[index]) * 0.001 * SelectedFeaturesStatsData.AREA / 1000000000).toFixed(2)}
                      </td>

                      <td>{(TableAnnualData.Yearly_AETI[index] * 100 / TableAnnualData.Yearly_PCP[index]).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card_container" style={{ maxHeight: "800px", overflow: "scroll" }}>

            <div className='defination_container'>
              <h4>Total Consumption (BCM)</h4>
            </div>

            <HorizontalBarChart filteredFeaturesItems={filteredFeaturesItems} />
          </div>

          <div className="card_container" style={{ maxHeight: "800px", overflow: "scroll" }}>

            <div className='defination_container'>
            <h4>Unit Consumption (m<sup>3</sup>/ha)</h4>
            </div>

            <UnitConsumptionChart filteredFeaturesItems={filteredFeaturesItems} />
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

                <div>
                  <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
                    <option value="AETI">Evapotranspiration</option>
                    <option value="RET">Potential ET</option>

                  </select>
                </div>
                <div>
                  <select className='m-1' value={intervalType} onChange={handleIntervalTypeChange}>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <select className='m-1' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    {renderTimeOptions(intervalType)}
                  </select>
                </div>


              </div>





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
                // onEachFeature={DistrictOnEachfeature}
                />
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

export default EvapotranspirationPage