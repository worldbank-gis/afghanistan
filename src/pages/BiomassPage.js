import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { MapContainer, GeoJSON } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import BaseMap from "../components/BaseMap";
import AfghanistanCountry from "../assets/data/shapefiles/AFG_boundary.json";
import {
  MonthsArray,
  SelectedFeaturesAverageStats,
  calculateAverageOfArray,
  fillDensityColor,
  getAnnualDataFromMonthly,
  renderTimeOptions,
  setDragging,
  setInitialMapZoom,
} from "../helpers/functions";
import Plot from "react-plotly.js";
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import MapLegend from "../components/MapLegend";
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import FiltererdJsonFeature from "./FiltererdJsonFeature";
import { useSelectedFeatureContext } from "../contexts/SelectedFeatureContext";
import BiomassProductionChart from "../components/charts/BiomassProductionChart";
import DistrictStats from "../assets/data/District_Stats.json"


const BiomassPage = () => {
  const [intervalType, setIntervalType] = useState("Yearly");
  const [selectedTime, setSelectedTime] = useState(5);
  const [selectedDataType, setSelectedDataType] = useState("NPP");

  const { filteredFeaturesItems, selectedView, selectedFeatureName } = useSelectedFeatureContext();
  const SelectedFeaturesStatsData = SelectedFeaturesAverageStats(filteredFeaturesItems)






  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];


  function DistrictOnEachfeature(feature, layer) {
    layer.on("mouseover", function (e) {
      const DataItem = DistrictStats.find(
        (item) => item.DISTRICT === feature.properties.NAME
      );
      const biomassProduction = intervalType ==='Monthly' ? (DataItem[selectedDataType][selectedTime]*22.222).toFixed(2) :(getAnnualDataFromMonthly(DataItem[selectedDataType])[selectedTime]*22.222).toFixed(2)

      const popupContent = `
            <div>
              District: ${feature.properties.NAME}<br/>
              Biomass Production: ${biomassProduction} ${intervalType === "Yearly" ? "(kg/ha/year)" : "(kg/ha/month)"
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

  const DistrictStyle = (feature) => {
    if (selectedTime !=="") {
      const getDensityFromData = (name) => {
        const DataItem = DistrictStats.find((item) => item.DISTRICT === name);
        return DataItem && intervalType ==='Monthly' ? DataItem[selectedDataType][selectedTime]:getAnnualDataFromMonthly(DataItem[selectedDataType])[selectedTime]
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

  console.log(SelectedFeaturesStatsData.AETI)


  return (
    <div className="dasboard_page_container">
      <div className="main_dashboard">
        <div className="left_panel_equal">
          

          <div className="card_container">
            <div className="defination_container">
              <h4>Biomass production</h4>
              <p>
                Biomass estimation in agriculture is crucial for predicting
                yields, monitoring crop health, optimizing harvest timing and
                allocating resources efficiently. Biomass refers to organic
                matter derived from living or recently living organisms. Biomass
                production in agriculture refers to the harvesting of organic
                matter from plants, including crops, grasses, and trees, which
                can be used for various purposes such as food, feed, fiber and
                biofuels.
              </p>
            </div>
          </div>

          <div className="card_container">

          <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.AETI,
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: "Evapotranspiration (mm/month)",
                  marker: { color: 'green' },
                  yaxis: 'y1',
                },
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.NPP.map(value => value * 22.222),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: "Biomass Production (kg/ha/month)",
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
                  title: "Biomass Production (kg/ha/month)",
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

          <div className="card_container">
            <div className='defination_container'>
              <h4>Water Productivity</h4>
            </div>
            <Plot
              data={[
                {
                  x: MonthsArray,
                  y: SelectedFeaturesStatsData.NPP.map((value, index) => (value * 22.222 * 0.0001) / (SelectedFeaturesStatsData.AETI[index] * 0.001)),
                  type: "bar",
                },
              ]}
              layout={{
                xaxis: {
                  title: "Year",
                },
                yaxis: {
                  title: 'Average Water Productivity (kg/m3)'
                },
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="card_container" style={{ maxHeight: "800px", overflow: "scroll" }}>
            <div className='defination_container'>
              <h4>Average Biomass Mean Annual</h4>
            </div>
            <BiomassProductionChart filteredFeaturesItems={filteredFeaturesItems}/>
          </div>
        </div>

        <div className="right_panel_equal">
          <div className="card_container" style={{ height: "100%" }}>
            <MapContainer
              fullscreenControl={true}
              center={[34, 67]}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                border: "none",
                margin: "auto",
              }}
              zoom={setInitialMapZoom()}
              maxBounds={[
                [23, 49],
                [41, 82],
              ]}
              // maxZoom={8}
              minZoom={setInitialMapZoom()}
              keyboard={false}
              dragging={setDragging()}
              // attributionControl={false}
              // scrollWheelZoom={false}
              doubleClickZoom={false}
            >
             <div className="map_options_container">
            <select
              className="m-1"
              value={selectedDataType}
              onChange={handleSelectedDataChange}
            >
              <option value="NPP">Biomass Production</option>
              {/* <option value="AETI">Evapotranspiration</option> */}
            </select>

            <select
              className="m-1"
              value={intervalType}
              onChange={handleIntervalTypeChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <select
              className="m-1"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {renderTimeOptions(intervalType)}
            </select>

          </div>


              <BaseMap />


              {selectedDataType === "NPP" && selectedTime !== '' && intervalType ? (
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
              <FiltererdJsonFeature  />

             
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomassPage;
