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
  fillDensityColor,
  renderTimeOptions,
  setDragging,
  setInitialMapZoom,
} from "../helpers/functions";
import Plot from "react-plotly.js";
import AFG_districts from "../assets/data/shapefiles/AFG_districts.json";
import { AFG_Data_Annual, AFG_Data_Monthly } from "../assets/data/AFG_Data";
import Zonal_Stat_NPP_Annual from "../assets/data/Zonal_Stat_NPP_Annual.json";
import Zonal_Stat_NPP_Monthly from "../assets/data/Zonal_Stat_NPP_Monthly.json";
import MapLegend from "../components/MapLegend";
import { ColorLegendsData } from "../assets/data/ColorLegendsData";
import Zonal_Stat_AETI_Annual from "../assets/data/Zonal_Stat_AETI_Annual.json"
import Zonal_Stat_AETI_Monthly from "../assets/data/Zonal_Stat_AETI_Monthly.json"


const BiomassPage = () => {
  const [intervalType, setIntervalType] = useState("Monthly");
  const [selectedTime, setSelectedTime] = useState("2023-12");
  const [selectedDataType, setSelectedDataType] = useState("NPP");


  const YearOfSelectedTime = selectedTime && selectedTime.split('-')[0];

  const chartData =
    intervalType === "Yearly" ? AFG_Data_Annual : AFG_Data_Monthly;

  let selectedDataset;

  if (selectedDataType === "NPP") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_NPP_Annual
        : Zonal_Stat_NPP_Monthly;
  }if (selectedDataType === "AETI") {
    selectedDataset =
      intervalType === "Yearly"
        ? Zonal_Stat_AETI_Annual
        : Zonal_Stat_AETI_Monthly;
  }

  const ColorLegendsDataItem = ColorLegendsData[`${intervalType}_${selectedDataType}`];


  function DistrictOnEachfeature(feature, layer) {
    layer.on("mouseover", function (e) {
      const DataItem = selectedDataset.find(
        (item) => item.NAME === feature.properties.NAME
      );
      const biomassProduction = (DataItem[selectedTime] * 22.22).toFixed(2);
      console.log(DataItem[selectedTime]);

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
    if (selectedTime && selectedDataset) {
      const getDensityFromData = (name) => {
        const DataItem = selectedDataset.find((item) => item.NAME === name);
        return DataItem ? DataItem[selectedTime] * 22.22 : null;
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



  const AvgBiomassSortedData = Zonal_Stat_NPP_Annual.sort((a, b) => b[YearOfSelectedTime] - a[YearOfSelectedTime]);

  return (
    <div className="dasboard_page_container">
      <div className="main_dashboard">
        <div className="left_panel_equal">
          <div className="card_container">
            <select
              className="m-1"
              value={selectedDataType}
              onChange={handleSelectedDataChange}
            >
              <option value="NPP">Biomass Production</option>
              <option value="AETI">Evapotranspiration</option>
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
                  x: chartData.map((entry) => entry.Time),
                  y: chartData.map((entry) => entry[selectedDataType] * 22.22),

                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "red" },
                },
              ]}
              layout={{
                xaxis: {
                  title: "Year",
                },
                yaxis: {
                  title: `${selectedDataType === "PCP"
                    ? "Precipitation"
                    : selectedDataType === "AETI"
                      ? "Evapotranspiration"
                      : selectedDataType === "RET"
                        ? "Potential ET"
                        : selectedDataType === "NPP"
                          ? "Biomass Production"
                          : selectedDataType === "AridityIndex"
                            ? "Aridity Index"
                            : null
                    } ${selectedDataType === "AridityIndex"
                      ? ""
                      : selectedDataType === "NPP"
                        ? `(${intervalType === "Yearly"
                          ? "kg/ha/year"
                          : "kg/ha/month"
                        })`
                        : `(${intervalType === "Yearly" ? "mm/year" : "mm/month"
                        })`
                    }`,
                },
              }}
              style={{ width: "100%", height: "calc(100% - 100px)" }}
            />
          </div>

          <div className="card_container">
            <div className='defination_container'>
              <h4>Water Productivity</h4>
            </div>
            <Plot
              data={[
                {
                  x: chartData.map((entry) => entry.Time),
                  y: chartData.map((entry) => (entry['NPP'] * 22.22 * 0.0001) / (entry['AETI'] * 0.001)),

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
              style={{ width: "100%", height: "calc(100% - 100px)" }}
            />
          </div>

          <div className="card_container">
            <div className='defination_container'>
              {/* <h4>Water Productivity</h4> */}
            </div>
            <Plot
              data={[
                {
                  y: AvgBiomassSortedData.map((entry) => entry.NAME),
                  x: AvgBiomassSortedData.map((entry) => entry[YearOfSelectedTime]*22.22),

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
                  title: `Average Biomass Mean Annual (kg/ha/year) for Year ${YearOfSelectedTime}`
                },
                margin: {
                  l: 150, // Adjust the top margin as needed
              },
              }}
              style={{ width: "100%", height: "1800px" }}
            />
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
              <SearchBar />





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

              <BaseMap />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiomassPage;
