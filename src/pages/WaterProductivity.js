import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { MapContainer, GeoJSON } from 'react-leaflet'
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import BaseMap from '../components/BaseMap';
import AfghanistanCountry from '../assets/data/shapefiles/AFG_boundary.json';
import { MonthsArray, SelectedFeaturesAverageStats, fillDensityColor, renderTimeOptions, setDragging, setInitialMapZoom } from '../helpers/functions';
import MapLegend from '../components/MapLegend';
import Plot from 'react-plotly.js';
import { ColorLegendsData } from '../assets/data/ColorLegendsData';
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import FiltererdJsonFeature from './FiltererdJsonFeature';
import { useSelectedFeatureContext } from '../contexts/SelectedFeatureContext';

import DistrictStats from "../assets/data/District_Stats.json"


const WaterProductivity = () => {
  const [selectedDataType, setSelectedDataType] = useState('WaterProductivity');
  const [intervalType, setIntervalType] = useState('Yearly');
  const [selectedTime, setSelectedTime] = useState(5);
  const { filteredFeaturesItems, selectedView, selectedFeatureName } = useSelectedFeatureContext();
  const SelectedFeaturesStatsData = SelectedFeaturesAverageStats(filteredFeaturesItems)








  function DistrictOnEachfeature(feature, layer) {
    layer.on("mouseover", function (e) {
      const DataItem = DistrictStats.find(
        (item) => item.DISTRICT === feature.properties.NAME
      );

      const biomassProduction = (DataItem['NPP'][selectedTime] * 22.22 * 0.1 / DataItem['AETI'][selectedTime]).toFixed(2);


      const popupContent = `
            <div>
              District: ${feature.properties.NAME}<br/>
              Biomass Water Productivity: ${biomassProduction} ${intervalType === "Yearly" ? "(kg/ha/year)" : "(kg/ha/month)"
        }<br/>
            </div>
          `;
      layer.bindTooltip(popupContent, { sticky: true });
      layer.openTooltip();
    });

    layer.on("mouseout", function () {
      layer.closeTooltip();
    });
  }

  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];


  const DistrictStyle = (feature) => {
    if (selectedTime ) {
      const getDensityFromData = (name) => {
        const DataItem = DistrictStats.find((item) => item.DISTRICT === name);
        return DataItem ? DataItem['NPP'][selectedTime] * 22.22 * 0.1 / DataItem['AETI'][selectedTime] : null;
      };
      const density = getDensityFromData(feature.properties.NAME);
      return {
        // fillColor: density ? selectedDensityFunc(density):"none",
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
  return (
    <div className='dasboard_page_container'>
      <div className='main_dashboard'>
        <div className='left_panel_equal'>





          <div className="card_container">
            <div className="defination_container">
              <h4>Biomass Water Productivity</h4>
              <p>
                The annual Gross Biomass Water Productivity expresses the quantity of output (total biomass production) in relation to the total volume of water consumed in the year (actual evapotranspiration)
              </p>
            </div>
          </div>

          <div className="card_container">
            <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.NPP.map((value, index) => (value * 22.222 * 0.1) / (SelectedFeaturesStatsData.AETI[index])),
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "green" },
                },
              ]}
              layout={{
                xaxis: {
                  title: "Year",
                },
                yaxis: {
                  title: "Biomass Water Productivity"
                },

                // yaxis: {
                //   title: `${selectedDataType === "NPP"
                //     ? "Biomass Water Productivity"
                //     // : selectedDataType === "AridityIndex"
                //     //   ? "Aridity Index"
                //     : null
                //     } ${selectedDataType === "AridityIndex"
                //       ? ""
                //       : selectedDataType === "NPP"
                //         ? `(${intervalType === "Yearly"
                //           ? "kg/ha/year"
                //           : "kg/ha/month"
                //         })`
                //         : `(${intervalType === "Yearly" ? "mm/year" : "mm/month"
                //         })`
                //     }`,
                // },
              }}
              style={{ width: "100%", height: "calc(100% - 100px)" }}
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
              <div className='map_options_container'>


                <select className='m-1' value={selectedDataType} onChange={handleSelectedDataChange}>
                  <option value="WaterProductivity">Biomass Water Productivity</option>
                  {/* <option value="RET">Potential ET</option> */}

                </select>
                <select
                  className="m-1"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {renderTimeOptions(intervalType)}
                </select>



              </div>



              {selectedDataType === "WaterProductivity" && selectedTime !== '' && intervalType ? (
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
                    fillColor: "black",
                    weight: 2,
                    color: "black",
                    fillOpacity: "0.001",
                    interactive: false,
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

export default WaterProductivity