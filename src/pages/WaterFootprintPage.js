import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AFG_districts from '../assets/data/shapefiles/AFG_districts.json';
import { SelectedFeaturesAverageStats, calculateAverageOfArray, calculateSumOfArray, fillDensityColor, getAnnualDataFromMonthly, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import MapLegend from '../components/MapLegend';
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import FiltererdJsonFeature from './FiltererdJsonFeature';
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';
import WaterFootprintChart from '../components/charts/WaterFootprintChart';
import DistrictStats from "../assets/data/District_Stats.json"


const WaterFootprintPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('ETG');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedTime, setSelectedTime] = useState(5);
  const { filteredFeaturesItems, selectedView, selectedFeatureName } = useSelectedFeatureContext();

  const SelectedFeaturesStatsData = SelectedFeaturesAverageStats(filteredFeaturesItems)

  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];


  function DistrictOnEachfeature(feature, layer) {
    layer.on('mouseover', function (e) {
      const DataItem = DistrictStats.find(item => item.DISTRICT === feature.properties.NAME);
      const popupContent = `
          <div>
            District: ${feature.properties.NAME}<br/>
            ${selectedDataType === 'ETG' ? 'ET Green' : selectedDataType === 'ETB' ? 'ET Blue' : null}  (${intervalType === 'Yearly' ? 'mm/year' : 'mm/month'}): ${DataItem[selectedDataType][selectedTime]}
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
    if (selectedTime !== "") {
      const getDensityFromData = (name) => {
        const DataItem = DistrictStats.find(item => item.DISTRICT === name);

        return DataItem && DataItem[selectedDataType][selectedTime]
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




  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>



          <div className='card_container'>

            <div className='defination_container'>
              <h4>Water Footprint</h4>
              <p>Water footprint refers to the total volume of water used in the production process of goods or services, including both direct water use (e.g., irrigation, processing water) and indirect water use (e.g., water embedded in inputs like raw materials and energy). In this section we also present Blue and Green ET. The Green water represents the fraction of precipitation that infiltrates into the soil and is available to plants; while blue water comprising runoff, groundwater, and stream base flow.
              </p>
            </div>
          </div>

          <div className="card_container" style={{ overflow: "scroll" }}>
            <div className='defination_container'>
              <h4>Crop Specific water footprint (BCM/year)</h4>
            </div>
            <WaterFootprintChart />


          </div>


          <div className='card_container'>
            <div className='defination_container'>
              <h4>Average anuual Green and Blue ET by districts</h4>
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
                  {filteredFeaturesItems.map((districtData, index) => (
                    <tr key={index}>
                      <td>{districtData.DISTRICT}</td>
                      <td>{calculateSumOfArray(districtData.ETB).toFixed(2)}</td>
                      <td>{calculateSumOfArray(districtData.ETG).toFixed(2)}</td>
                      <td>{(calculateAverageOfArray(districtData.ETB) * 0.001 * districtData.AREA / 1000000).toFixed(2)}</td>
                      <td>{(calculateAverageOfArray(districtData.ETG) * 0.001 * districtData.AREA / 1000000).toFixed(2)}</td>
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
              minZoom={setInitialMapZoom()}
              keyboard={false}
              dragging={setDragging()}
              // attributionControl={false}
              // scrollWheelZoom={false}
              doubleClickZoom={false}
            >
              <div className='map_options_container'>

                <select className='m-1' value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}>
                  <option value="ETB">ET Blue</option>
                  <option value="ETG">ET Green</option>
                </select>

                {/* <select className='m-1' value={intervalType} onChange={(e) => setIntervalType(e.target.value)}>
  <option value="Monthly"> Monthly</option>
  <option value="Yearly"> Yearly</option>
</select> */}


                <select className='m-1' value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                  {renderTimeOptions(intervalType)}
                </select>

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

export default WaterFootprintPage