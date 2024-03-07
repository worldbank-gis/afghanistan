import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import { fillDensityColor, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import Plot from 'react-plotly.js';
import { AFG_Data_Annual, AFG_Data_Monthly } from '../assets/data/AFG_Data';
import Zonal_Stat_RET_Annual from "../assets/data/Zonal_Stat_RET_Annual.json"
import Zonal_Stat_PCP_Annual from "../assets/data/Zonal_Stat_AETI_Annual.json"
import Zonal_Stat_AridityIndex_Annual from "../assets/data/Zonal_Stat_AridityIndex_Annual.json"
import Zonal_Stat_RET_Monthly from "../assets/data/Zonal_Stat_RET_Monthly.json"
import Zonal_Stat_PCP_Monthly from "../assets/data/Zonal_Stat_AETI_Monthly.json"
import Zonal_Stat_AridityIndex_Monthly from "../assets/data/Zonal_Stat_AridityIndex_Monthly.json"
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import MapLegend from '../components/MapLegend';
import Zonal_Stat_Data from "../assets/data/Zonal_Stat_Data.json"
import tiff_raster from "../assets/raster_data/clipped_chirps-v2.0.2023.tif"
import RasterMap from '../components/RasterMap';

const PrecipitationPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('PCP');
  const [intervalType, setIntervalType] = useState('Monthly');
  const [selectedRaster, setSelectedRaster] = useState('');
  const [selectedTime, setSelectedTime] = useState('2023-12');

  const chartData = intervalType === 'Yearly' ? AFG_Data_Annual : AFG_Data_Monthly;
  let selectedDataset;

  if (selectedDataType === "PCP") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_PCP_Annual
        : Zonal_Stat_PCP_Monthly;
  } if (selectedDataType === "RET") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_RET_Annual
        : Zonal_Stat_RET_Monthly;

  } if (selectedDataType === "AridityIndex") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_AridityIndex_Annual
        : Zonal_Stat_AridityIndex_Monthly;
  }

  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];

  function DistrictOnEachfeature(feature, layer) {
    layer.on("mouseover", function (e) {
      const DataItem = selectedDataset.find(
        (item) => item.NAME === feature.properties.NAME
      );
      const popupContent = `
            <div>
              District: ${feature.properties.NAME}<br/>
              ${selectedDataType === 'PCP' ? 'Precipitation' : selectedDataType === 'AETI' ? 'Evapotranspiration' : selectedDataType === 'RET' ? 'Potential ET' : selectedDataType === 'AridityIndex' ? 'Aridity Index' : null}  ${selectedDataType === 'AridityIndex' ? '' : `(${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`}: ${DataItem[selectedTime]}
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
    if (selectedTime && selectedDataset) {
      const getDensityFromData = (name) => {
        const DataItem = selectedDataset.find((item) => item.NAME === name);
        return DataItem ? DataItem[selectedTime] : null;
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





  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>

        <div className='left_panel_equal'>


          <div className='card_container'>
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
                  x: chartData.map(entry => entry.Time),
                  y: chartData.map(entry => entry[selectedDataType]),
                  type: selectedDataType === 'RET' ? 'scatter' : 'bar',
                  mode: selectedDataType === 'RET' ? 'lines+markers' : '',
                },
              ]}
              layout={{
                xaxis: {
                  title: 'Year',
                },
                yaxis: {
                  title: `${selectedDataType === 'PCP' ? 'Precipitation' : selectedDataType === 'AETI' ? 'Evapotranspiration' : selectedDataType === 'RET' ? 'Potential ET' : selectedDataType === 'AridityIndex' ? 'Aridity Index' : null}  ${selectedDataType === 'AridityIndex' ? '' : `(${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`}`,
                },
              }}
              style={{ width: "100%", height: "calc(100% - 100px)" }}
            />





            {/* <Plot
              data={[
                {
                  x: chartData.map(entry => entry.Time),
                  y: chartData.map(entry => entry.PCP),
                  type: 'bar',
                  name: `Precipitation (${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`,
                  yaxis: 'y1',
                },
                {
                  x: chartData.map(entry => entry.Time),
                  y: chartData.map(entry => entry.AETI),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: `Potential ET (${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`,
                  marker: { color: 'red' },
                  yaxis: 'y2',
                },
              ]}
              layout={{
                xaxis: {
                  title: 'Year',
                },
                yaxis: {
                  title: `Precipitation (${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`,
                  side: 'left',
                  showgrid: false,
                },
                yaxis2: {
                  title: `Potential ET (${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`,
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
            /> */}

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
                  {AFG_Data_Annual.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Time}</td>
                      <td>{item.AETI}</td>
                      <td>{item.PCP}</td>
                      <td>{(item.PCP - item.AETI).toFixed(1)}</td>
                      <td>{item.RET}</td>
                      <td>{item.AridityIndex}</td>
                      <td>{(item.ETBlue).toFixed(1)}</td>
                      <td>{(item.ETGreen).toFixed(1)}</td>

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
              <SearchBar />

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






              <BaseMap />

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrecipitationPage