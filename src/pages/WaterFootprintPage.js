import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AFG_districts from '../assets/data/shapefiles/AFG_districts.json';
import { fillDensityColor, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import Zonal_Stat_ETB from "../assets/data/Zonal_Stat_ETB_Annual.json"
import Zonal_stat_ETG from "../assets/data/Zonal_stat_ETG_Annual.json"
import MapLegend from '../components/MapLegend';
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import DistrictAreaData from "../assets/data/DistrictAreaData.json"
import cropSpecificWaterFootprints from "../assets/data/cropSpecificWaterFootprints.json"
import Plot from 'react-plotly.js';


const WaterFootprintPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('ET_Green');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedTime, setSelectedTime] = useState('2023');

  const YearOfSelectedTime = selectedTime && selectedTime.split('-')[0];

  let selectedDataset;
  if (selectedDataType === 'ET_Blue') {
    selectedDataset = Zonal_Stat_ETB;
  } else if (selectedDataType === 'ET_Green') {
    selectedDataset = Zonal_stat_ETG;
  }
  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];


  function DistrictOnEachfeature(feature, layer) {
    layer.on('mouseover', function (e) {
      const DataItem = selectedDataset.find(item => item.NAME === feature.properties.NAME);
      const popupContent = `
          <div>
            District: ${feature.properties.NAME}<br/>
            ${selectedDataType === 'ET_Green' ? 'ET Green' : selectedDataType === 'ET_Blue' ? 'ET Blue' : null}  ${selectedDataType === 'AridityIndex' ? '' : `(${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'})`}: ${DataItem[selectedTime].toFixed(2)}
          </div>
        `;
      layer.bindTooltip(popupContent, { sticky: true });
      layer.openTooltip();
    });

    layer.on('mouseout', function () {
      layer.closeTooltip();
    });
  }


  const DistrictStyle = (feature => {
    if (selectedTime && selectedDataset) {
      const getDensityFromData = (name) => {
        const DataItem = selectedDataset.find(item => item.NAME === name.toString());
        return DataItem ? DataItem[selectedTime] : null;
      };

      const density = getDensityFromData(feature.properties.NAME);
      return ({
        fillColor: ColorLegendsDataItem ? fillDensityColor(ColorLegendsDataItem, density) : "none",
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 1
      });

    }

  });

  const renderTableRows = () => {
    return Zonal_Stat_ETB.map((districtData, index) => {
      const blueValue = districtData[YearOfSelectedTime];
      const greenValue = Zonal_stat_ETG[index][YearOfSelectedTime];
      const Area = DistrictAreaData[index]['AREA']
      if (blueValue !== undefined && greenValue !== undefined) {
        return (
          <tr key={index}>
            <td>{districtData.NAME}</td>
            <td>{blueValue.toFixed(2)}</td>
            <td>{greenValue.toFixed(2)}</td>
            <td>{(blueValue*0.001*Area/1000000).toFixed(2)}</td>
            <td>{(greenValue*0.001*Area/1000000).toFixed(2)}</td>
          </tr>
        );
      } else {
        return null;
      }
    });
  };


  // Get the first three entries
const topCropEntries = cropSpecificWaterFootprints.slice(0,10);

// Get the sum of the remaining entries
const restCropEntriesSum = cropSpecificWaterFootprints.slice(10).reduce((acc, curr) => acc + curr.WFP, 0);

// Combine the first three entries and the sum into a new array
const newCropData = [
  ...topCropEntries,
  {
    "CropName": "Other Crops",
    "WFP": restCropEntriesSum
  }
];








  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>


          <div className='card_container'>

            <select className='m-1' value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}>
              <option value="ET_Blue">ET Blue</option>
              <option value="ET_Green">ET Green</option>
            </select>

            <select className='m-1' value={intervalType} onChange={(e) => setIntervalType(e.target.value)}>
              {/* <option value="Monthly"> Monthly</option> */}
              <option value="Yearly"> Yearly</option>
            </select>


            <select className='m-1' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
              {renderTimeOptions(intervalType)}
            </select>

          </div>
          <div className='card_container'>

            <div className='defination_container'>
              <h4>Water Footprint</h4>
              <p>Water footprint refers to the total volume of water used in the production process of goods or services, including both direct water use (e.g., irrigation, processing water) and indirect water use (e.g., water embedded in inputs like raw materials and energy). In this section we also present Blue and Green ET. The Green water represents the fraction of precipitation that infiltrates into the soil and is available to plants; while blue water comprising runoff, groundwater, and stream base flow.
              </p>
            </div>
          </div>

          <div className="card_container" style={{overflow:"scroll"}}>
            <div className='defination_container'>
              <h4>Crop Specific water footprint (BCM/year)</h4>
            </div>

            <Plot
              data={[
                {
                  y: newCropData.map((entry) => entry.CropName),
                  x: newCropData.map((entry) => (entry.WFP ) / 1000000000),
                  type: "bar",
                  orientation: 'h',
                },
              ]}
              layout={{
                yaxis: {
                  title: "Crop Type",
                  autorange: "reversed",
                },
                xaxis: {
                  title: `Crop Specific water footprint (BCM/year)`
                },
                margin: {
                  l: 220, 
                },
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>


          <div className='card_container'>
            <div className='defination_container'>
              <h4>Average anuual Green and Blue ET by districts for year {YearOfSelectedTime}</h4>
            </div>
            <div className='item_table_container'>
              <table className='item_table'>
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Average ET Blue (mm/year)</th>
                    <th>Average ET Green (mm/year)</th>
                    <th>Average ET Blue Volume (MCM/year)</th>
                    <th>Average ET Green Volume (MCM/year)</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows()}
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

export default WaterFootprintPage