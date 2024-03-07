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
import { AFG_Data_Annual, AFG_Data_Monthly } from '../assets/data/AFG_Data';
import Plot from 'react-plotly.js';
import Zonal_Stat_RET_Annual from "../assets/data/Zonal_Stat_RET_Annual.json"
import Zonal_Stat_AETI_Annual from "../assets/data/Zonal_Stat_AETI_Annual.json"
import Zonal_Stat_RET_Monthly from "../assets/data/Zonal_Stat_RET_Monthly.json"
import Zonal_Stat_AETI_Monthly from "../assets/data/Zonal_Stat_AETI_Monthly.json"
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import MapLegend from '../components/MapLegend';
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import DistrictAreaData from "../assets/data/DistrictAreaData.json"


const EvapotranspirationPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('AETI');
  const [intervalType, setIntervalType] = useState('Monthly');
  const [selectedTime, setSelectedTime] = useState('2023-12');
  const YearOfSelectedTime = selectedTime && selectedTime.split('-')[0];
  const chartData = intervalType === 'Yearly' ? AFG_Data_Annual : AFG_Data_Monthly;

  let selectedDataset;
  if (selectedDataType === "AETI") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_AETI_Annual
        : Zonal_Stat_AETI_Monthly;
  } if (selectedDataType === "RET") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_RET_Annual
        : Zonal_Stat_RET_Monthly;

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
    if (selectedTime && selectedDataset && selectedDataType) {
      const getDensityFromData = (name) => {
        const DataItem = selectedDataset.find((item) => item.NAME === name);
        return DataItem ? DataItem[selectedTime] : null;
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



  const merged_AETI_Area_Data = Zonal_Stat_AETI_Annual.map(entry => {
    const districtArea = DistrictAreaData.find(district => district.DISTRICT_NAME === entry.NAME);
    return {
      ...entry,
      AREA: districtArea ? districtArea.AREA : 0
    };
  });

  // Sort the merged data based on the calculated value
  const sortedTotalConsumption = merged_AETI_Area_Data.sort((a, b) => {
    const aValue = a[YearOfSelectedTime] * 0.001 * a.AREA / 1000000000;
    const bValue = b[YearOfSelectedTime] * 0.001 * b.AREA / 1000000000;
    return bValue - aValue;
  });

  const sortedUnitConsumption = merged_AETI_Area_Data.sort((a, b) => {
    const aValue = a[YearOfSelectedTime] * 0.001 * a.AREA / 1000000000;
    const bValue = b[YearOfSelectedTime] * 0.001 * b.AREA / 10000;
    return bValue - aValue;
  });




  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>
          <div className='card_container'>


            <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
              <option value="AETI">Evapotranspiration</option>
              <option value="RET">Potential ET</option>

            </select>

            <select className='m-1' value={intervalType} onChange={handleIntervalTypeChange}>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>


            <select className='m-1' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              {renderTimeOptions(intervalType)}
            </select>


          </div>

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
                  x: chartData.map(entry => entry.Time),
                  y: chartData.map(entry => entry[selectedDataType]),
                  fill: selectedDataType === 'AETI' ? 'tozeroy' : '',
                  type: selectedDataType === 'scatter',
                  mode: selectedDataType === 'lines+markers',

                  // type: selectedDataType === 'AETI' ? 'scatter' : 'scatter',
                  // mode: selectedDataType === 'AETI' ? '' : 'lines+markers',
                  // marker: { color: 'red' },
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
                    <th>Total Evapotranspiration</th>
                    <th>ET Blue (BCM/year)</th>
                    <th>ET Green (BCM/year)</th>
                    <th>Precipitation (PCP) (BCM/year)</th>
                    <th>PCP - ET (BCM/year)</th>
                    <th>Portion of PCP locally consumed (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {AFG_Data_Annual.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Time}</td>
                      <td>{item.AETI}</td>
                      <td>{(item.ETBlue).toFixed(1)}</td>
                      <td>{(item.ETGreen).toFixed(1)}</td>
                      <td>{item.PCP}</td>
                      <td>{(item.PCP - item.AETI).toFixed(1)}</td>
                      <td>{(item.AETI *100/ item.PCP).toFixed(1)}</td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          <div className="card_container">
            <div className='defination_container'>
              <h4>Total Consumption (BCM)</h4>
            </div>
            <Plot
              data={[
                {
                  // y: Zonal_Stat_AETI_Annual.map((entry) => entry.NAME),
                  // x: Zonal_Stat_AETI_Annual.map((entry, index) => (entry[YearOfSelectedTime] * 0.001 * DistrictAreaData[index].AREA) / 1000000000),
                  y: sortedTotalConsumption.map((entry) => entry.NAME),
                  x: sortedTotalConsumption.map((entry) => (entry[YearOfSelectedTime] * 0.001 * entry.AREA) / 1000000000),
                  type: "bar",
                  orientation: 'h',
                },
              ]}
              layout={{
                yaxis: {
                  title: "District Name",
                  autorange: "reversed",
                },
                xaxis: {
                  title: `Total Consumption (BCM) of year ${YearOfSelectedTime}`
                },
                margin: {
                  l: 150, // Adjust the top margin as needed
                },
              }}
              style={{ width: "100%", height: "1800px" }}
            />
          </div>

          <div className="card_container">
            <div className='defination_container'>
              <h4>Unit Consumption (m<sup>3</sup>/ha)</h4>
            </div>
            <Plot
              data={[
                {
                  y: sortedUnitConsumption.map((entry) => entry.NAME),
                  x: sortedUnitConsumption.map((entry) => (entry[YearOfSelectedTime] * 0.001 * entry.AREA) * 10000),
                  type: "bar",
                  orientation: 'h',
                },
              ]}
              layout={{
                yaxis: {
                  title: "District Name",
                  autorange: "reversed",
                },
                xaxis: {
                  title: `Unit Consumption (m3/ha) of year ${YearOfSelectedTime}`
                },
                margin: {
                  l: 150, // Adjust the top margin as needed
                },
              }}
              style={{ width: "100%", height: "1800px" }}
            />
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



              <BaseMap />

            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvapotranspirationPage